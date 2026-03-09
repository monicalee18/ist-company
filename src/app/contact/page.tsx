"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center"
      style={{ paddingTop: "78px" }}
    >
      {/* Desktop Layout */}
      <div
        className="hidden md:block w-full"
        style={{
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "24px",
          }}
        >
          {/* Left Column - Contact Info (columns 1-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ gridColumn: "1 / 3" }}
            className="flex flex-col justify-between"
          >
            {/* Top Content */}
            <div>
              {/* IST Logo */}
              <div style={{ marginBottom: "40px" }}>
                <svg
                  viewBox="0 0 317.50661 60.325002"
                  style={{ width: "100%", maxWidth: "420px", height: "auto" }}
                >
                  <defs>
                    <clipPath id="contact-logo-a">
                      <path d="M146 91h1201v228H146z" />
                    </clipPath>
                    <clipPath id="contact-logo-b">
                      <path d="M146 91h1201v228H146z" />
                    </clipPath>
                    <clipPath id="contact-logo-c">
                      <path d="M146 91h1201v228H146z" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#contact-logo-a)" transform="matrix(.26458 0 0 .26458 -38.765 -24.077)">
                    <g clipPath="url(#contact-logo-b)">
                      <g clipPath="url(#contact-logo-c)">
                        <path
                          fill="#ff1f5d"
                          d="M146.514 171.982h108.363V319l80.8-79.999V91H226.925Z"
                        />
                        <path
                          fill="#ffffff"
                          d="M450.602 115.938c1.317 6.707 6.51 10.19 12.812 11.652 4.803 1.125 9.797 1.423 14.71 2.1s9.986.826 14.63 2.289c2.297.726 5.212 3.821 5.323 5.97.129 2.498-1.898 6.06-4.095 7.494a21.616 21.616 0 0 1-10.285 2.895c-10.706.588-20.133-3.144-28.742-10.08l-8.159 11.225c1.898 1.403 3.376 2.667 4.994 3.682a52.398 52.398 0 0 0 34.782 7.413 45.605 45.605 0 0 0 17.087-5.702c7.13-4.22 9.658-11.623 8.529-19.733-.999-7.344-5.683-12.23-12.643-14.499a84.81 84.81 0 0 0-13.492-2.866c-5.722-.875-11.564-1.094-17.227-2.219-1.867-.378-4.743-2.666-4.743-4.09 0-1.89 1.937-4.507 3.765-5.493a20.113 20.113 0 0 1 8.558-1.99c9.577-.328 18.165 2.986 26.374 8.17l7.24-11.085c-3.255-1.802-6.1-3.861-9.277-5.036-14.365-6.059-30.028-7.224-43.23 1.085-6.612 4.289-8.36 11.384-6.911 18.818zM1113.275 204.244l-24.06 34.112-23.957-34.112h-10.806v66.423h13.131v-40.958l21.65 30.828 22.012-31.207v41.337h12.443v-66.423zM535.336 245.471l-36.596-41.227h-7.993v66.423h12.982v-40.889l36.697 40.889h8.202v-66.423h-13.292zM430.798 243.252h24.298v-12.817h-24.268v-13.653h40.325v-12.538h-53.418v66.423h55.436v-12.309h-42.373zM887.327 204.244l-32.707 66.423h15.022l7.759-16.03h30.428l8.085 16.03h14.528l-32.991-66.423zm-3.584 37.287 8.558-17.684 8.919 17.684zM564.446 216.782h25.556v53.885h13.272v-53.885h25.585v-12.538h-64.413zM854.403 204.244H789.97v12.538h25.696v53.885h13.111v-53.885h25.626zM1281.97 216.782h25.812v53.885h13.136v-53.885h25.621v-12.538l-64.568.03zM585.048 105.25V93.1h-64.352v12.15h25.725v53.945h12.983V105.25ZM943.692 270.667h12.513v-66.423h-12.513zM430.249 93.11h-12.514v66.254h12.514z"
                        />
                      </g>
                    </g>
                  </g>
                  <path
                    fill="#ffffff"
                    d="m231.424 40.87-9.683-10.908h-2.115v17.575h3.435V36.718l9.71 10.819h2.17V29.962h-3.517zM135.407 40.283h6.43v-3.39h-6.422V33.28h10.67v-3.318H131.95v17.575h14.668V44.28h-11.212zM266.906 40.283h6.43v-3.39h-6.422V33.28h10.67v-3.318H263.45v17.575h14.668V44.28h-11.212zM293.721 40.87l-9.683-10.908h-2.115v17.575h3.435V36.718l9.71 10.819h2.17V29.962h-3.517zM164.542 39.986c2.114-1.272 2.949-3.32 2.439-5.993-.424-2.802-2.71-3.901-5.449-4.03h-10.318v17.56h3.44V40.67h5.058l3.982 6.854h4.063l-4.084-7.03c.348-.21.613-.358.87-.508zm-1.057-4.74c-.042 1.006-.494 1.965-1.701 1.996h-7.13v-3.91h7.338c1.03.037 1.54.97 1.501 1.915z"
                  />
                </svg>
              </div>

              {/* Phone, Email, Address with 20px gap */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Phone Numbers */}
                <div>
                  <p className="text-white" style={{ fontSize: "14px" }}>
                    T. +82. 2.6327.1280 &nbsp; F. +82. 2.6919.1276
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-white/50 text-sm">Business</span>
                      <a
                        href="mailto:istent_business@istent.co.kr"
                        className="block text-white hover:text-white/70 transition-colors"
                        style={{ fontSize: "14px" }}
                      >
                        istent_business@istent.co.kr
                      </a>
                    </div>
                    <div>
                      <span className="text-white/50 text-sm">Fan Staff</span>
                      <a
                        href="mailto:istent_fanstaff@istent.co.kr"
                        className="block text-white hover:text-white/70 transition-colors"
                        style={{ fontSize: "14px" }}
                      >
                        istent_fanstaff@istent.co.kr
                      </a>
                    </div>
                    <div>
                      <span className="text-white/50 text-sm">Audition</span>
                      <a
                        href="mailto:audition@istent.co.kr"
                        className="block text-white hover:text-white/70 transition-colors"
                        style={{ fontSize: "14px" }}
                      >
                        audition@istent.co.kr
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-white/40 text-xs tracking-widest uppercase mb-1">
                    {t("주소", "Address")}
                  </h3>
                  <p className="text-white leading-relaxed" style={{ fontSize: "14px" }}>
                    {t(
                      "서울 강남구 강남대로146길 39 B1, 2, 3층",
                      "39, Gangnam-daero 146-gil, Gangnam-gu, Seoul, Korea (B1, 2, 3F)"
                    )}
                  </p>
                  {/* Google Map */}
                  <div style={{ marginTop: "10px", width: "100%", height: "120px" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.0285!3d37.4965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159a0000001%3A0x1234567890!2z7ISc7Jq4IOqwleuCqOq1rCDqsJXrgqjrjIDroZwxNDbquLggMzk!5e0!3m2!1sko!2skr!4v1709654321"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column - Form (columns 4-6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ gridColumn: "4 / 7" }}
          >
            {submitted ? (
              <div>
                <h3 className="text-white text-2xl mb-3">{t("메시지가 전송되었습니다.", "Message received.")}</h3>
                <p className="text-white/50">{t("빠른 시일 내에 답변 드리겠습니다.", "We will get back to you shortly.")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Row 1: Name & Email */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                    marginBottom: "60px",
                  }}
                >
                  <div>
                    <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("이름", "Name")}*</label>
                    <input
                      type="text"
                      required
                      placeholder={t("이름을 입력해주세요", "Enter your name")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
                      style={{ height: "40px" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("이메일", "Email")}*</label>
                    <input
                      type="email"
                      required
                      placeholder={t("이메일을 입력해주세요", "Enter your email")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>

                {/* Row 2: Inquiry Type & Subject */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                    marginBottom: "60px",
                  }}
                >
                  <div>
                    <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("문의 유형", "Inquiry Type")}*</label>
                    <select
                      required
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      style={{
                        height: "40px",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0 center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="" className="bg-black text-white/50">{t("선택해주세요", "Select one")}</option>
                      <option value="business" className="bg-black">{t("비즈니스 제휴", "Business Partnership")}</option>
                      <option value="audition" className="bg-black">Audition</option>
                      <option value="fanstaff" className="bg-black">Fan Staff</option>
                      <option value="media" className="bg-black">{t("미디어/언론", "Media/Press")}</option>
                      <option value="other" className="bg-black">{t("기타", "Other")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("문의 제목", "Subject")}*</label>
                    <input
                      type="text"
                      required
                      placeholder={t("제목을 입력해주세요", "Enter subject")}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "40px" }}>
                  <label className="block text-white/50 text-sm" style={{ marginBottom: "10px" }}>{t("문의 내용", "Message")}*</label>
                  <textarea
                    required
                    placeholder={t("문의 내용을 입력해주세요", "Enter your message")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors resize-none placeholder:text-white/30"
                    style={{ height: "100px" }}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-white text-sm transition-all duration-200 disabled:opacity-50"
                    style={{
                      height: "24px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      backgroundColor: "rgba(186, 186, 186, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff1f5d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(186, 186, 186, 0.3)";
                    }}
                  >
                    {submitting ? t("전송 중...", "Sending...") : t("문의하기", "Submit")}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className="md:hidden w-full"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "100px",
          paddingBottom: "30px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contact Info */}
          <div style={{ marginBottom: "60px" }}>
            {/* IST Logo */}
            <div style={{ marginBottom: "30px" }}>
              <svg
                viewBox="0 0 317.50661 60.325002"
                style={{ width: "100%", maxWidth: "300px", height: "auto" }}
              >
                <defs>
                  <clipPath id="mobile-logo-a">
                    <path d="M146 91h1201v228H146z" />
                  </clipPath>
                  <clipPath id="mobile-logo-b">
                    <path d="M146 91h1201v228H146z" />
                  </clipPath>
                  <clipPath id="mobile-logo-c">
                    <path d="M146 91h1201v228H146z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#mobile-logo-a)" transform="matrix(.26458 0 0 .26458 -38.765 -24.077)">
                  <g clipPath="url(#mobile-logo-b)">
                    <g clipPath="url(#mobile-logo-c)">
                      <path
                        fill="#ff1f5d"
                        d="M146.514 171.982h108.363V319l80.8-79.999V91H226.925Z"
                      />
                      <path
                        fill="#ffffff"
                        d="M450.602 115.938c1.317 6.707 6.51 10.19 12.812 11.652 4.803 1.125 9.797 1.423 14.71 2.1s9.986.826 14.63 2.289c2.297.726 5.212 3.821 5.323 5.97.129 2.498-1.898 6.06-4.095 7.494a21.616 21.616 0 0 1-10.285 2.895c-10.706.588-20.133-3.144-28.742-10.08l-8.159 11.225c1.898 1.403 3.376 2.667 4.994 3.682a52.398 52.398 0 0 0 34.782 7.413 45.605 45.605 0 0 0 17.087-5.702c7.13-4.22 9.658-11.623 8.529-19.733-.999-7.344-5.683-12.23-12.643-14.499a84.81 84.81 0 0 0-13.492-2.866c-5.722-.875-11.564-1.094-17.227-2.219-1.867-.378-4.743-2.666-4.743-4.09 0-1.89 1.937-4.507 3.765-5.493a20.113 20.113 0 0 1 8.558-1.99c9.577-.328 18.165 2.986 26.374 8.17l7.24-11.085c-3.255-1.802-6.1-3.861-9.277-5.036-14.365-6.059-30.028-7.224-43.23 1.085-6.612 4.289-8.36 11.384-6.911 18.818zM1113.275 204.244l-24.06 34.112-23.957-34.112h-10.806v66.423h13.131v-40.958l21.65 30.828 22.012-31.207v41.337h12.443v-66.423zM535.336 245.471l-36.596-41.227h-7.993v66.423h12.982v-40.889l36.697 40.889h8.202v-66.423h-13.292zM430.798 243.252h24.298v-12.817h-24.268v-13.653h40.325v-12.538h-53.418v66.423h55.436v-12.309h-42.373zM887.327 204.244l-32.707 66.423h15.022l7.759-16.03h30.428l8.085 16.03h14.528l-32.991-66.423zm-3.584 37.287 8.558-17.684 8.919 17.684zM564.446 216.782h25.556v53.885h13.272v-53.885h25.585v-12.538h-64.413zM854.403 204.244H789.97v12.538h25.696v53.885h13.111v-53.885h25.626zM1281.97 216.782h25.812v53.885h13.136v-53.885h25.621v-12.538l-64.568.03zM585.048 105.25V93.1h-64.352v12.15h25.725v53.945h12.983V105.25ZM943.692 270.667h12.513v-66.423h-12.513zM430.249 93.11h-12.514v66.254h12.514z"
                      />
                    </g>
                  </g>
                </g>
                <path
                  fill="#ffffff"
                  d="m231.424 40.87-9.683-10.908h-2.115v17.575h3.435V36.718l9.71 10.819h2.17V29.962h-3.517zM135.407 40.283h6.43v-3.39h-6.422V33.28h10.67v-3.318H131.95v17.575h14.668V44.28h-11.212zM266.906 40.283h6.43v-3.39h-6.422V33.28h10.67v-3.318H263.45v17.575h14.668V44.28h-11.212zM293.721 40.87l-9.683-10.908h-2.115v17.575h3.435V36.718l9.71 10.819h2.17V29.962h-3.517zM164.542 39.986c2.114-1.272 2.949-3.32 2.439-5.993-.424-2.802-2.71-3.901-5.449-4.03h-10.318v17.56h3.44V40.67h5.058l3.982 6.854h4.063l-4.084-7.03c.348-.21.613-.358.87-.508zm-1.057-4.74c-.042 1.006-.494 1.965-1.701 1.996h-7.13v-3.91h7.338c1.03.037 1.54.97 1.501 1.915z"
                />
              </svg>
            </div>

            {/* Phone, Email, Address */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Phone */}
              <p className="text-white" style={{ fontSize: "14px" }}>
                T. +82. 2.6327.1280 &nbsp; F. +82. 2.6919.1276
              </p>

              {/* Email */}
              <div className="space-y-1">
                <div>
                  <span className="text-white/50 text-xs">Business</span>
                  <a href="mailto:istent_business@istent.co.kr" className="block text-white hover:text-white/70 transition-colors" style={{ fontSize: "14px" }}>
                    istent_business@istent.co.kr
                  </a>
                </div>
                <div>
                  <span className="text-white/50 text-xs">Fan Staff</span>
                  <a href="mailto:istent_fanstaff@istent.co.kr" className="block text-white hover:text-white/70 transition-colors" style={{ fontSize: "14px" }}>
                    istent_fanstaff@istent.co.kr
                  </a>
                </div>
                <div>
                  <span className="text-white/50 text-xs">Audition</span>
                  <a href="mailto:audition@istent.co.kr" className="block text-white hover:text-white/70 transition-colors" style={{ fontSize: "14px" }}>
                    audition@istent.co.kr
                  </a>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-white/40 text-xs tracking-widest uppercase mb-1">
                  {t("주소", "Address")}
                </h3>
                <p className="text-white" style={{ fontSize: "14px" }}>
                  {t(
                    "서울 강남구 강남대로146길 39 B1, 2, 3층",
                    "39, Gangnam-daero 146-gil, Gangnam-gu, Seoul, Korea (B1, 2, 3F)"
                  )}
                </p>
                {/* Google Map */}
                <div style={{ marginTop: "10px", width: "100%", height: "120px" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.0285!3d37.4965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159a0000001%3A0x1234567890!2z7ISc7Jq4IOqwleuCqOq1rCDqsJXrgqjrjIDroZwxNDbquLggMzk!5e0!3m2!1sko!2skr!4v1709654321"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

            </div>
          </div>

          {submitted ? (
            <div>
              <h3 className="text-white text-2xl mb-3">{t("메시지가 전송되었습니다.", "Message received.")}</h3>
              <p className="text-white/50">{t("빠른 시일 내에 답변 드리겠습니다.", "We will get back to you shortly.")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: "40px" }}>
                <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("이름", "Name")}*</label>
                <input
                  type="text"
                  required
                  placeholder={t("이름을 입력해주세요", "Enter your name")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
                  style={{ height: "48px" }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "40px" }}>
                <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("이메일", "Email")}*</label>
                <input
                  type="email"
                  required
                  placeholder={t("이메일을 입력해주세요", "Enter your email")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
                  style={{ height: "48px" }}
                />
              </div>

              {/* Inquiry Type */}
              <div style={{ marginBottom: "40px" }}>
                <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("문의 유형", "Inquiry Type")}*</label>
                <select
                  required
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{
                    height: "48px",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0 center",
                    backgroundSize: "16px",
                  }}
                >
                  <option value="" className="bg-black text-white/50">{t("선택해주세요", "Select one")}</option>
                  <option value="business" className="bg-black">{t("비즈니스 제휴", "Business Partnership")}</option>
                  <option value="audition" className="bg-black">Audition</option>
                  <option value="fanstaff" className="bg-black">Fan Staff</option>
                  <option value="media" className="bg-black">{t("미디어/언론", "Media/Press")}</option>
                  <option value="other" className="bg-black">{t("기타", "Other")}</option>
                </select>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: "40px" }}>
                <label className="block text-white/50 text-sm" style={{ marginBottom: "4px" }}>{t("문의 제목", "Subject")}*</label>
                <input
                  type="text"
                  required
                  placeholder={t("제목을 입력해주세요", "Enter subject")}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
                  style={{ height: "48px" }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "40px" }}>
                <label className="block text-white/50 text-sm" style={{ marginBottom: "10px" }}>{t("문의 내용", "Message")}*</label>
                <textarea
                  required
                  placeholder={t("문의 내용을 입력해주세요", "Enter your message")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 text-white focus:border-white focus:outline-none transition-colors resize-none placeholder:text-white/30"
                  style={{ height: "100px" }}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-white text-sm transition-all duration-200 disabled:opacity-50"
                  style={{
                    height: "24px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    backgroundColor: "rgba(186, 186, 186, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff1f5d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(186, 186, 186, 0.3)";
                  }}
                >
                  {submitting ? t("전송 중...", "Sending...") : t("문의하기", "Submit")}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
