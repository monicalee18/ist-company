"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function FadeIn({ children, className, delay = 0, style, y = 25 }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type TranslateFn = <T extends React.ReactNode>(ko: T, en: T) => T;

function getAuditionInfo(t: TranslateFn) {
  return {
    categories: [
      {
        title: "Vocal",
        description: t(
          "노래 실력을 보여주세요. 장르 불문, 본인의 매력을 어필할 수 있는 곡을 선택해주세요.",
          "Show us your singing skills. Choose a song that showcases your charm, regardless of genre."
        ),
      },
      {
        title: "Dance",
        description: t(
          "자유 안무 또는 기존 곡의 커버 댄스를 준비해주세요. 개성 있는 퍼포먼스를 보여주세요.",
          "Prepare a free choreography or cover dance. Show us your unique performance."
        ),
      },
      {
        title: "Rap",
        description: t(
          "자작 랩 또는 기존 곡의 커버를 준비해주세요. 플로우와 가사 전달력을 중점적으로 봅니다.",
          "Prepare an original rap or cover. We focus on flow and lyrical delivery."
        ),
      },
      {
        title: "Acting",
        description: t(
          "1분 내외의 자유 연기 또는 지정 대본 연기를 준비해주세요.",
          "Prepare a 1-minute free acting piece or scripted performance."
        ),
      },
    ],
    requirements: [
      t("만 10세 ~ 만 23세 (성별 무관)", "Ages 10-23 (all genders)"),
      t("국적 불문", "All nationalities welcome"),
      t("기획사 미소속자 또는 계약 만료자", "Not currently signed or contract expired"),
      t("주 3회 이상 연습 참여 가능자", "Available for practice 3+ times per week"),
    ],
    process: [
      { step: "01", title: t("온라인 접수", "Online Application"), description: t("지원서 및 프로필 제출", "Submit application & profile") },
      { step: "02", title: t("1차 심사", "1st Screening"), description: t("서류 및 영상 심사", "Document & video review") },
      { step: "03", title: t("2차 심사", "2nd Screening"), description: t("대면 오디션", "In-person audition") },
      { step: "04", title: t("최종 합격", "Final Selection"), description: t("연습생 계약 체결", "Trainee contract signing") },
    ],
    faq: [
      {
        question: t("합격 연락은 언제 오나요?", "When will I hear about the results?"),
        answer: t("합격자에 한하여 2~3주 내로 개별 공지됩니다.", "Selected candidates will be individually notified within 2-3 weeks."),
      },
      {
        question: t("팀 지원이 가능한가요?", "Can I apply as a team?"),
        answer: t(
          "팀 지원은 받지 않습니다. 팀으로 지원하시면 심사 과정에서 탈락 처리됨으로 개별 지원해주시기 바랍니다.",
          "Team applications are not accepted. Please apply individually."
        ),
      },
      {
        question: t("기존 오디션에 지원했었는데 재지원이 가능한가요?", "Can I reapply if I've auditioned before?"),
        answer: t(
          "네, 가능합니다. 국내 지원자와 동일한 방식으로 자료 첨부하여 홈페이지 혹은 우편으로 지원해주시면 됩니다.",
          "Yes, you can. Please submit your materials through the website or by mail."
        ),
      },
    ],
  };
}

function getCountryCodes(t: TranslateFn) {
  return [
    { code: "+82", country: t("대한민국", "South Korea") },
    { code: "+1", country: t("미국/캐나다", "US/Canada") },
    { code: "+81", country: t("일본", "Japan") },
    { code: "+86", country: t("중국", "China") },
    { code: "+44", country: t("영국", "UK") },
    { code: "+49", country: t("독일", "Germany") },
    { code: "+33", country: t("프랑스", "France") },
    { code: "+61", country: t("호주", "Australia") },
    { code: "+65", country: t("싱가포르", "Singapore") },
    { code: "+66", country: t("태국", "Thailand") },
    { code: "+84", country: t("베트남", "Vietnam") },
  ];
}

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
  const { t } = useLanguage();
  const countryCodes = getCountryCodes(t);

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
  const [submitted, setSubmitted] = useState(false);
  const [imageError, setImageError] = useState("");
  const [videoError, setVideoError] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImageError("");
    const validTypes = ["image/jpeg", "image/gif", "image/png"];
    const maxSize = 2 * 1024 * 1024;
    const maxFiles = 3;

    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (images.length + newFiles.length >= maxFiles) {
        setImageError(t(`최대 ${maxFiles}개까지 업로드 가능합니다.`, `Maximum ${maxFiles} files allowed.`));
        break;
      }
      if (!validTypes.includes(files[i].type)) {
        setImageError(t("JPG, GIF, PNG 파일만 업로드 가능합니다.", "Only JPG, GIF, PNG files are allowed."));
        continue;
      }
      if (files[i].size > maxSize) {
        setImageError(t("파일당 최대 2MB까지 업로드 가능합니다.", "Maximum 2MB per file."));
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
    const maxSize = 20 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setVideoError(t("MP4, MOV, WMV 파일만 업로드 가능합니다.", "Only MP4, MOV, WMV files are allowed."));
      return;
    }
    if (file.size > maxSize) {
      setVideoError(t("최대 20MB까지 업로드 가능합니다.", "Maximum 20MB allowed."));
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
      alert(t("개인정보 수집 및 이용에 동의해주세요.", "Please agree to the privacy policy."));
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.nationality.trim() !== "" &&
    formData.gender !== "" &&
    formData.category !== "" &&
    formData.height.trim() !== "" &&
    formData.weight.trim() !== "" &&
    formData.birthYear !== "" &&
    formData.birthMonth !== "" &&
    formData.birthDay !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.privacyAgreed;

  const inputClass = "w-full bg-transparent border-b border-black/20 text-black focus:border-black focus:outline-none transition-colors placeholder:text-black/30";
  const labelClass = "block text-black/50 text-sm mb-1";
  const selectClass = "w-full bg-transparent border-b border-black/20 text-black focus:border-black focus:outline-none transition-colors appearance-none cursor-pointer";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="fixed top-6 right-6 z-50 flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Submitted State */}
          {submitted ? (
            <div className="min-h-screen flex flex-col items-center justify-center" style={{ padding: "80px 24px 60px" }}>
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Checkmark */}
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: "64px", height: "64px", backgroundColor: "#ff1f5d", marginBottom: "24px" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.25">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>

                <h2 className="text-2xl font-light text-black" style={{ marginBottom: "12px" }}>
                  {t("지원이 완료되었습니다", "Application Submitted")}
                </h2>
                <p className="text-black/50" style={{ fontSize: "14px", lineHeight: 1.6, maxWidth: "400px" }}>
                  {t(
                    "오디션 지원서가 성공적으로 접수되었습니다. 심사 결과는 합격자에 한하여 2~3주 내로 개별 연락드리겠습니다.",
                    "Your audition application has been successfully received. Selected candidates will be individually contacted within 2-3 weeks."
                  )}
                </p>

                {/* Summary */}
                <div
                  className="w-full text-left"
                  style={{ marginTop: "40px", maxWidth: "400px", padding: "16px", backgroundColor: "#f5f5f5" }}
                >
                  <p className="text-black/40 text-xs uppercase tracking-wider" style={{ marginBottom: "12px" }}>
                    {t("지원 정보", "Application Summary")}
                  </p>
                  <div className="flex flex-col gap-[10px] text-sm">
                    <div className="flex justify-between">
                      <span className="text-black/50">{t("이름", "Name")}</span>
                      <span className="text-black">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">{t("지원분야", "Category")}</span>
                      <span className="text-black">
                        {{ vocal: t("보컬", "Vocal"), rap: t("랩", "Rap"), dance: t("댄스", "Dance"), acting: t("연기", "Acting") }[formData.category] || formData.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">{t("이메일", "Email")}</span>
                      <span className="text-black">{formData.email}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="text-black/50 hover:text-black transition-colors underline underline-offset-4"
                  style={{ marginTop: "40px", fontSize: "14px" }}
                >
                  {t("닫기", "Close")}
                </button>
              </motion.div>
            </div>
          ) : (
          /* Form Content */
          <div className="min-h-screen" style={{ padding: "80px 24px 60px" }}>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-light text-black mb-2">{t("오디션 지원", "Audition Application")}</h1>
              <p className="text-black/50 text-sm mb-12">{t("* 표시는 필수 입력 항목입니다.", "* Required fields")}</p>

              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-10 mb-[24px]">
                  <div>
                    <label className={labelClass}>{t("이름", "Name")} *</label>
                    <input
                      type="text"
                      required
                      placeholder={t("이름을 입력해주세요", "Enter your name")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("국적", "Nationality")} *</label>
                    <input
                      type="text"
                      required
                      placeholder={t("국적을 입력해주세요", "Enter your nationality")}
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-10 mb-[24px]">
                  <div>
                    <label className={labelClass}>{t("성별", "Gender")} *</label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">{t("선택해주세요", "Please select")}</option>
                      <option value="female">{t("여", "Female")}</option>
                      <option value="male">{t("남", "Male")}</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t("지원분야", "Category")} *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">{t("선택해주세요", "Please select")}</option>
                      <option value="vocal">{t("보컬", "Vocal")}</option>
                      <option value="rap">{t("랩", "Rap")}</option>
                      <option value="dance">{t("댄스", "Dance")}</option>
                      <option value="acting">{t("연기", "Acting")}</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-10 mb-[24px]">
                  <div>
                    <label className={labelClass}>{t("신장 (cm)", "Height (cm)")} *</label>
                    <input
                      type="number"
                      required
                      placeholder={t("신장을 입력해주세요", "Enter your height")}
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("체중 (kg)", "Weight (kg)")} *</label>
                    <input
                      type="number"
                      required
                      placeholder={t("체중을 입력해주세요", "Enter your weight")}
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className={inputClass}
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>

                {/* Row 4: 생년월일 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("생년월일", "Date of Birth")} *</label>
                  <div className="grid grid-cols-3 gap-4">
                    <select
                      required
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      className={selectClass}
                      style={{ height: "40px" }}
                    >
                      <option value="">{t("년", "Year")}</option>
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
                      <option value="">{t("월", "Month")}</option>
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
                      <option value="">{t("일", "Day")}</option>
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("학교/직업", "School/Occupation")}</label>
                  <input
                    type="text"
                    placeholder={t("학교 또는 직업을 입력해주세요", "Enter your school or occupation")}
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 6 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("연락처", "Phone")} *</label>
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
                        placeholder={t("연락처를 입력해주세요 (- 제외)", "Enter your phone number (without -)")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClass}
                        style={{ height: "40px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 7 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("이메일", "Email")} *</label>
                  <input
                    type="email"
                    required
                    placeholder={t("이메일을 입력해주세요", "Enter your email")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 8 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("SNS 링크", "SNS Link")}</label>
                  <input
                    type="url"
                    placeholder={t("SNS 프로필 링크를 입력해주세요", "Enter your SNS profile link")}
                    value={formData.sns}
                    onChange={(e) => setFormData({ ...formData, sns: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 9 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("주소", "Address")} *</label>
                  <input
                    type="text"
                    required
                    placeholder={t("주소를 입력해주세요", "Enter your address")}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={inputClass}
                    style={{ height: "40px" }}
                  />
                </div>

                {/* Row 10 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("특기/경력사항", "Skills/Experience")}</label>
                  <textarea
                    placeholder={t("특기나 경력사항을 입력해주세요", "Enter your skills or experience")}
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={{ height: "100px" }}
                  />
                </div>

                {/* Row 11: 이미지 첨부 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>
                    {t("이미지 첨부 (최대 3개, JPG/GIF/PNG, 각 2MB 이하)", "Attach images (max 3, JPG/GIF/PNG, 2MB each)")}
                  </label>
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
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
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
                <div className="mb-[24px]">
                  <label className={labelClass}>
                    {t("동영상 첨부 (최대 1개, MP4/MOV/WMV, 20MB 이하)", "Attach video (max 1, MP4/MOV/WMV, 20MB max)")}
                  </label>
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
                        {t("클릭하여 동영상 파일 선택", "Click to select a video file")}
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

                {/* Row 13: 개인정보 */}
                <div className="mb-[24px]">
                  <label className={labelClass}>{t("개인정보 수집 및 이용에 대한 안내", "Privacy Collection Notice")}</label>
                  <div className="mt-2 p-[16px] border border-black/10 bg-black/5 text-sm text-black/70 leading-relaxed max-h-48 overflow-y-auto">
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
                    <span className="text-sm text-black">
                      {t("개인정보 수집 및 이용에 동의합니다.", "I agree to the collection and use of personal information.")} *
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting || !isFormValid}
                    className="text-sm transition-all duration-200 disabled:cursor-not-allowed"
                    style={{
                      height: "40px",
                      paddingLeft: "32px",
                      paddingRight: "32px",
                      backgroundColor: isFormValid && !submitting ? "#ff1f5d" : "#e5e5e5",
                      color: isFormValid && !submitting ? "#ffffff" : "#a3a3a3",
                    }}
                    onMouseEnter={(e) => {
                      if (isFormValid && !submitting) {
                        e.currentTarget.style.opacity = "0.8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {submitting ? t("제출 중...", "Submitting...") : t("오디션 지원하기", "Apply for Audition")}
                  </button>
                </div>
              </form>
            </div>
          </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AuditionClient() {
  const { t } = useLanguage();
  const auditionInfo = getAuditionInfo(t);
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
            style={{ lineHeight: 1.1, marginBottom: "16px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Audition
          </motion.h1>
          <motion.p
            className="text-white/60 font-normal max-w-xl"
            style={{ fontSize: "18px", lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t(
              <>IST Entertainment는 열정과 재능을 갖춘 미래의 스타를 찾고 있습니다.<br />당신의 꿈을 향한 첫 걸음을 함께 시작하세요.</>,
              <>IST Entertainment is looking for future stars with passion and talent.<br />Take the first step toward your dream with us.</>
            )}
          </motion.p>
          <motion.div
            className="flex items-center gap-[7px] mt-[30px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://www.instagram.com/istent_audition"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.75" y="2.75" width="14.5" height="14.5" rx="4.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <circle cx="14.5" cy="5.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://x.com/istent_audition"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.477 8.618 17.03 1h-1.553l-5.69 6.615L5.242 1H0l6.873 10.002L0 18.991h1.553l6.009-6.985L12.362 18.991h5.242L10.476 8.618Zm-2.127 2.472-.697-.996L2.113 2.169h2.385l4.471 6.396.697.996 5.812 8.31h-2.385l-4.743-6.781Z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@ISTentARTISTDEVELOPMENT"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.619 5.972a2.31 2.31 0 0 0-1.591-1.591C14.635 4 9.993 4 9.993 4s-4.628 0-6.021.381A2.31 2.31 0 0 0 2.368 5.972C2 7.366 2 10.298 2 10.298s0 2.931.368 4.338a2.31 2.31 0 0 0 1.604 1.591c1.394.382 6.021.382 6.021.382s4.641 0 6.035-.382a2.31 2.31 0 0 0 1.591-1.591C18 13.23 18 10.298 18 10.298s0-2.932-.381-4.326ZM8.205 13.007V7.603l4.668 2.695-4.668 2.71Z" fill="currentColor" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gap */}
      <div className="h-[60px]" />

      {/* Categories Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            <FadeIn className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                {t("분야", "Categories")}
              </h2>
            </FadeIn>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {auditionInfo.categories.map((category, index) => (
                  <FadeIn key={index} delay={index * 0.05}>
                    <h3 className="text-2xl md:text-3xl font-light text-white" style={{ marginBottom: "4px" }}>
                      {category.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </FadeIn>
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
            <FadeIn className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                {t("자격 요건", "Requirements")}
              </h2>
            </FadeIn>
            <div className="col-span-12 md:col-span-6 md:col-start-4">
              <ul className="space-y-4">
                {auditionInfo.requirements.map((req, index) => (
                  <FadeIn key={index} delay={index * 0.05} y={15}>
                    <li className="flex items-start gap-3 text-white/70 text-base">
                      <span className="text-white/40">-</span>
                      <span>{req}</span>
                    </li>
                  </FadeIn>
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
            <FadeIn className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                {t("절차", "Process")}
              </h2>
            </FadeIn>
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
                {auditionInfo.process.map((item, index) => (
                  <FadeIn key={item.step} delay={index * 0.08} className="relative">
                    <span className="text-5xl md:text-6xl font-light block mb-1" style={{ color: "var(--accent)" }}>
                      {item.step}
                    </span>
                    <h3 className="text-white text-lg font-light mb-1">{item.title}</h3>
                    <p className="text-white/40 text-sm">{item.description}</p>
                  </FadeIn>
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
            <FadeIn className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                FAQ
              </h2>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-9 md:col-start-4">
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
              <FadeIn>
                <h2
                  className="text-white font-light"
                  style={{ fontSize: "24px", marginBottom: "10px" }}
                >
                  {t("지금 바로 지원하세요", "Apply Now")}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p
                  className="text-white/50"
                  style={{ fontSize: "16px", marginBottom: "30px" }}
                >
                  {t(
                    "온라인으로 간편하게 오디션에 지원할 수 있습니다.",
                    "You can easily apply for auditions online."
                  )}
                  <br />
                  {t("프로필과 영상을 준비해주세요.", "Please prepare your profile and video.")}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="text-white text-sm transition-all duration-200"
                  style={{
                    height: "24px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    backgroundColor: "#ff1f5d",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  {t("오디션 지원하기", "Apply for Audition")}
                </button>
              </FadeIn>
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
