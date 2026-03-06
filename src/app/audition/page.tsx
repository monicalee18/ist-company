"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const auditionInfo = {
  categories: [
    {
      title: "Vocal",
      titleKo: "보컬",
      description: "노래 실력을 보여주세요. 장르 불문, 본인의 매력을 어필할 수 있는 곡을 선택해주세요.",
    },
    {
      title: "Dance",
      titleKo: "댄스",
      description: "자유 안무 또는 기존 곡의 커버 댄스를 준비해주세요. 개성 있는 퍼포먼스를 보여주세요.",
    },
    {
      title: "Rap",
      titleKo: "랩",
      description: "자작 랩 또는 기존 곡의 커버를 준비해주세요. 플로우와 가사 전달력을 중점적으로 봅니다.",
    },
    {
      title: "Acting",
      titleKo: "연기",
      description: "1분 내외의 자유 연기 또는 지정 대본 연기를 준비해주세요.",
    },
  ],
  requirements: [
    "만 10세 ~ 만 23세 (성별 무관)",
    "국적 불문",
    "기획사 미소속자 또는 계약 만료자",
    "주 3회 이상 연습 참여 가능자",
  ],
  process: [
    { step: "01", title: "온라인 접수", description: "지원서 및 프로필 제출" },
    { step: "02", title: "1차 심사", description: "서류 및 영상 심사" },
    { step: "03", title: "2차 심사", description: "대면 오디션" },
    { step: "04", title: "최종 합격", description: "연습생 계약 체결" },
  ],
  faq: [
    {
      question: "합격 연락은 언제 오나요?",
      answer: "합격자에 한하여 2~3주 내로 개별 공지됩니다.",
    },
    {
      question: "팀 지원이 가능한가요?",
      answer: "팀 지원은 받지 않습니다. 팀으로 지원하시면 심사 과정에서 탈락 처리됨으로 개별 지원해주시기 바랍니다.",
    },
    {
      question: "기존 오디션에 지원했었는데 재지원이 가능한가요?",
      answer: "네, 가능합니다. 국내 지원자와 동일한 방식으로 자료 첨부하여 홈페이지 혹은 우편으로 지원해주시면 됩니다.",
    },
  ],
};

const countryCodes = [
  { code: "+82", country: "대한민국" },
  { code: "+1", country: "미국/캐나다" },
  { code: "+81", country: "일본" },
  { code: "+86", country: "중국" },
  { code: "+44", country: "영국" },
  { code: "+49", country: "독일" },
  { code: "+33", country: "프랑스" },
  { code: "+61", country: "호주" },
  { code: "+65", country: "싱가포르" },
  { code: "+66", country: "태국" },
  { code: "+84", country: "베트남" },
];

const years = Array.from({ length: 30 }, (_, i) => 2015 - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

interface AuditionFormData {
  name: string;
  nationality: string;
  gender: string;
  category: string;
  height: string;
  weight: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  occupation: string;
  countryCode: string;
  phone: string;
  email: string;
  sns: string;
  address: string;
  skills: string;
  privacyAgreed: boolean;
}

function AuditionApplyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<AuditionFormData>({
    name: "",
    nationality: "",
    gender: "",
    category: "",
    height: "",
    weight: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    occupation: "",
    countryCode: "+82",
    phone: "",
    email: "",
    sns: "",
    address: "",
    skills: "",
    privacyAgreed: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageError, setImageError] = useState("");
  const [videoError, setVideoError] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImageError("");
    const validTypes = ["image/jpeg", "image/gif", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    const maxFiles = 3;

    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (images.length + newFiles.length >= maxFiles) {
        setImageError(`최대 ${maxFiles}개까지 업로드 가능합니다.`);
        break;
      }
      if (!validTypes.includes(files[i].type)) {
        setImageError("JPG, GIF, PNG 파일만 업로드 가능합니다.");
        continue;
      }
      if (files[i].size > maxSize) {
        setImageError("파일당 최대 2MB까지 업로드 가능합니다.");
        continue;
      }
      newFiles.push(files[i]);
    }
    setImages([...images, ...newFiles]);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoError("");
    const validTypes = ["video/mp4", "video/quicktime", "video/x-ms-wmv"];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!validTypes.includes(file.type)) {
      setVideoError("MP4, MOV, WMV 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > maxSize) {
      setVideoError("최대 20MB까지 업로드 가능합니다.");
      return;
    }
    setVideo(file);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    alert("오디션 지원이 완료되었습니다.");
    onClose();
  };

  const inputClass = "w-full bg-transparent border-b border-black/20 text-black focus:border-black focus:outline-none transition-colors placeholder:text-black/30";
  const labelClass = "block text-black/50 text-sm mb-1";
  const selectClass = "w-full bg-transparent border-b border-black/20 text-black focus:border-black focus:outline-none transition-colors appearance-none cursor-pointer";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-50 flex items-center justify-center border border-black/20 hover:border-black transition-colors"
            style={{ width: "24px", height: "24px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Form Content */}
          <div className="min-h-screen" style={{ padding: "80px 24px 60px" }}>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-light text-black mb-2">오디션 지원</h1>
              <p className="text-black/50 text-sm mb-12">* 표시는 필수 입력 항목입니다.</p>

              <form onSubmit={handleSubmit}>
                {/* Row 1: 이름, 국적 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div>
                    <label className={labelClass}>이름 *</label>
                    <input
                      type="text"
                      required
                      placeholder="이름을 입력해주세요"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>국적 *</label>
                    <input
                      type="text"
                      required
                      placeholder="국적을 입력해주세요"
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>

                {/* Row 2: 성별, 지원분야 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div>
                    <label className={labelClass}>성별 *</label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">선택해주세요</option>
                      <option value="female">여</option>
                      <option value="male">남</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>지원분야 *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">선택해주세요</option>
                      <option value="vocal">보컬</option>
                      <option value="rap">랩</option>
                      <option value="dance">댄스</option>
                      <option value="acting">연기</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: 신장, 체중 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div>
                    <label className={labelClass}>신장 (cm) *</label>
                    <input
                      type="number"
                      required
                      placeholder="신장을 입력해주세요"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>체중 (kg) *</label>
                    <input
                      type="number"
                      required
                      placeholder="체중을 입력해주세요"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>

                {/* Row 4: 생년월일 */}
                <div className="mb-10">
                  <label className={labelClass}>생년월일 *</label>
                  <div className="grid grid-cols-3 gap-4">
                    <select
                      required
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">년</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      required
                      value={formData.birthMonth}
                      onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">월</option>
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      required
                      value={formData.birthDay}
                      onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">일</option>
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5: 학교/직업 */}
                <div className="mb-10">
                  <label className={labelClass}>학교/직업</label>
                  <input
                    type="text"
                    placeholder="학교 또는 직업을 입력해주세요"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 6: 연락처 */}
                <div className="mb-10">
                  <label className={labelClass}>연락처 *</label>
                  <div className="grid grid-cols-4 gap-4">
                    <select
                      required
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>{item.code} {item.country}</option>
                      ))}
                    </select>
                    <div className="col-span-3">
                      <input
                        type="tel"
                        required
                        placeholder="연락처를 입력해주세요 (- 제외)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                        style={{ height: "40px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 7: 이메일 */}
                <div className="mb-10">
                  <label className={labelClass}>이메일 *</label>
                  <input
                    type="email"
                    required
                    placeholder="이메일을 입력해주세요"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 8: SNS 링크 */}
                <div className="mb-10">
                  <label className={labelClass}>SNS 링크</label>
                  <input
                    type="url"
                    placeholder="SNS 프로필 링크를 입력해주세요"
                    value={formData.sns}
                    onChange={(e) => setFormData({ ...formData, sns: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 9: 주소 */}
                <div className="mb-10">
                  <label className={labelClass}>주소 *</label>
                  <input
                    type="text"
                    required
                    placeholder="주소를 입력해주세요"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 10: 특기/경력사항 */}
                <div className="mb-10">
                  <label className={labelClass}>특기/경력사항</label>
                  <textarea
                    placeholder="특기나 경력사항을 입력해주세요"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={{ height: "100px" }}
                  />
                </div>

                {/* Row 11: 이미지 첨부 */}
                <div className="mb-10">
                  <label className={labelClass}>이미지 첨부 (최대 3개, JPG/GIF/PNG, 각 2MB 이하)</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="w-20 h-20 border border-black/20 flex items-center justify-center overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="w-20 h-20 border border-dashed border-black/30 flex items-center justify-center text-black/30 hover:border-black/50 hover:text-black/50 transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.gif,.png"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                </div>

                {/* Row 12: 동영상 첨부 */}
                <div className="mb-10">
                  <label className={labelClass}>동영상 첨부 (최대 1개, MP4/MOV/WMV, 20MB 이하)</label>
                  <div className="mt-2">
                    {video ? (
                      <div className="flex items-center gap-3 p-3 border border-black/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-black flex-1 truncate">{video.name}</span>
                        <button
                          type="button"
                          onClick={() => setVideo(null)}
                          className="text-black/50 hover:text-black"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        className="w-full p-4 border border-dashed border-black/30 text-black/50 hover:border-black/50 hover:text-black/70 transition-colors text-sm"
                      >
                        클릭하여 동영상 파일 선택
                      </button>
                    )}
                  </div>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept=".mp4,.mov,.wmv"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  {videoError && <p className="text-red-500 text-sm mt-1">{videoError}</p>}
                </div>

                {/* Row 13: 개인정보 수집 안내 */}
                <div className="mb-10">
                  <label className={labelClass}>개인정보 수집 및 이용에 대한 안내</label>
                  <div className="mt-2 p-4 border border-black/10 bg-black/5 text-sm text-black/70 leading-relaxed max-h-48 overflow-y-auto">
                    <p className="mb-3">
                      IST Entertainment(이하 &apos;회사&apos;)는 지원자의 개인정보를 중요시하며,
                      &quot;정보통신망 이용촉진 및 정보보호&quot;에 관한 법률을 준수하고 있습니다.
                    </p>
                    <p className="mb-3">
                      회사는 개인정보취급방침을 통하여 지원자께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
                      개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                    </p>
                    <p className="mb-3">
                      회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
                    </p>
                    <p className="font-medium mb-2">[수집하는 개인정보 항목]</p>
                    <p>
                      회사는 원활한 지원자 상담서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br/>
                      수집항목 : 이름, 성별, 생년월일, 휴대폰번호, 이메일
                    </p>
                  </div>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacyAgreed}
                      onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                      className="w-4 h-4 accent-[#ff1f5d]"
                    />
                    <span className="text-sm text-black">개인정보 수집 및 이용에 동의합니다. *</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-white text-sm transition-all duration-200 disabled:opacity-50"
                    style={{
                      height: "40px",
                      paddingLeft: "32px",
                      paddingRight: "32px",
                      backgroundColor: "#ff1f5d",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        e.currentTarget.style.opacity = "0.8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {submitting ? "제출 중..." : "오디션 지원하기"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AuditionPage() {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set());
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const gridClass = "grid grid-cols-12 gap-[24px] content-padding";

  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className={gridClass} style={{ paddingTop: "120px" }}>
        <div className="col-span-12 md:col-span-8">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white"
            style={{ lineHeight: 1.1, marginBottom: "20px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Audition
          </motion.h1>
          <motion.p
            className="text-white/60 font-light max-w-xl"
            style={{ fontSize: "18px", lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            IST Entertainment는 열정과 재능을 갖춘 미래의 스타를 찾고 있습니다.
            당신의 꿈을 향한 첫 걸음을 함께 시작하세요.
          </motion.p>
        </div>
      </section>

      {/* Gap */}
      <div className="h-[80px] md:h-[140px]" />

      {/* Categories Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                Categories
              </h2>
            </div>
            {/* Category Grid */}
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {auditionInfo.categories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-light text-white" style={{ marginBottom: "4px" }}>
                      {category.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                Requirements
              </h2>
            </div>
            {/* Requirements List */}
            <div className="col-span-12 md:col-span-6 md:col-start-4">
              <ul className="space-y-4">
                {auditionInfo.requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-white/70 text-base"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <span className="text-white/40">-</span>
                    <span>{req}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                Process
              </h2>
            </div>
            {/* Process Steps */}
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
                {auditionInfo.process.map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  >
                    <span className="text-5xl md:text-6xl font-light text-white/10 block mb-1">
                      {item.step}
                    </span>
                    <h3 className="text-white text-lg font-light mb-1">{item.title}</h3>
                    <p className="text-white/40 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                FAQ
              </h2>
            </div>
            {/* FAQ List */}
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="flex flex-col gap-6">
                {auditionInfo.faq.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-white text-base">{item.question}</span>
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-white/50 flex-shrink-0 ml-4"
                        animate={{ rotate: openFAQs.has(index) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {openFAQs.has(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/50 text-sm leading-relaxed mt-2" style={{ paddingRight: "40px" }}>
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
              <motion.h2
                className="text-white font-light"
                style={{ fontSize: "24px", marginBottom: "10px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                지금 바로 지원하세요
              </motion.h2>
              <motion.p
                className="text-white/50"
                style={{ fontSize: "16px", marginBottom: "30px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                온라인으로 간편하게 오디션에 지원할 수 있습니다.
                <br />
                프로필과 영상을 준비해주세요.
              </motion.p>
              <motion.button
                onClick={() => setIsApplyModalOpen(true)}
                className="text-white text-sm transition-all duration-200"
                style={{
                  height: "24px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  backgroundColor: "#ff1f5d",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                오디션 지원하기
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-[40px]" />

      {/* Apply Modal */}
      <AuditionApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
