"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen) {
      closeMenu();
    }
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[54px] flex items-center header-padding">
      <div className="flex items-center justify-between w-full">
        {/* Left Logo */}
        <Link href="/" onClick={handleLogoClick}>
          <motion.svg
            viewBox="0 0 317.50661 60.325002"
            className="h-6 md:h-8 w-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <defs>
              <clipPath id="logo-a">
                <path d="M146 91h1201v228H146z" />
              </clipPath>
              <clipPath id="logo-b">
                <path d="M146 91h1201v228H146z" />
              </clipPath>
              <clipPath id="logo-c">
                <path d="M146 91h1201v228H146z" />
              </clipPath>
            </defs>
            <g clipPath="url(#logo-a)" transform="matrix(.26458 0 0 .26458 -38.765 -24.077)">
              <g clipPath="url(#logo-b)">
                <g clipPath="url(#logo-c)">
                  <path
                    fill="#ff1f5d"
                    className="transition-colors duration-300"
                    d="M146.514 171.982h108.363V319l80.8-79.999V91H226.925Z"
                  />
                  <path
                    fill={isMenuOpen ? "#000000" : "#ffffff"}
                    className="transition-colors duration-300"
                    d="M450.602 115.938c1.317 6.707 6.51 10.19 12.812 11.652 4.803 1.125 9.797 1.423 14.71 2.1s9.986.826 14.63 2.289c2.297.726 5.212 3.821 5.323 5.97.129 2.498-1.898 6.06-4.095 7.494a21.616 21.616 0 0 1-10.285 2.895c-10.706.588-20.133-3.144-28.742-10.08l-8.159 11.225c1.898 1.403 3.376 2.667 4.994 3.682a52.398 52.398 0 0 0 34.782 7.413 45.605 45.605 0 0 0 17.087-5.702c7.13-4.22 9.658-11.623 8.529-19.733-.999-7.344-5.683-12.23-12.643-14.499a84.81 84.81 0 0 0-13.492-2.866c-5.722-.875-11.564-1.094-17.227-2.219-1.867-.378-4.743-2.666-4.743-4.09 0-1.89 1.937-4.507 3.765-5.493a20.113 20.113 0 0 1 8.558-1.99c9.577-.328 18.165 2.986 26.374 8.17l7.24-11.085c-3.255-1.802-6.1-3.861-9.277-5.036-14.365-6.059-30.028-7.224-43.23 1.085-6.612 4.289-8.36 11.384-6.911 18.818zM1113.275 204.244l-24.06 34.112-23.957-34.112h-10.806v66.423h13.131v-40.958l21.65 30.828 22.012-31.207v41.337h12.443v-66.423zM535.336 245.471l-36.596-41.227h-7.993v66.423h12.982v-40.889l36.697 40.889h8.202v-66.423h-13.292zM430.798 243.252h24.298v-12.817h-24.268v-13.653h40.325v-12.538h-53.418v66.423h55.436v-12.309h-42.373zM887.327 204.244l-32.707 66.423h15.022l7.759-16.03h30.428l8.085 16.03h14.528l-32.991-66.423zm-3.584 37.287 8.558-17.684 8.919 17.684zM564.446 216.782h25.556v53.885h13.272v-53.885h25.585v-12.538h-64.413zM854.403 204.244H789.97v12.538h25.696v53.885h13.111v-53.885h25.626zM1281.97 216.782h25.812v53.885h13.136v-53.885h25.621v-12.538l-64.568.03zM585.048 105.25V93.1h-64.352v12.15h25.725v53.945h12.983V105.25ZM943.692 270.667h12.513v-66.423h-12.513zM430.249 93.11h-12.514v66.254h12.514z"
                  />
                </g>
              </g>
            </g>
            <path
              fill={isMenuOpen ? "#000000" : "#ffffff"}
              className="transition-colors duration-300"
              d="m231.424 40.87-9.683-10.908h-2.115v17.575h3.435V36.718l9.71 10.819h2.17V29.962h-3.517zM135.407 40.283h6.43v-3.39h-6.422V33.28h10.67v-3.318H131.95v17.575h14.668V44.28h-11.212zM266.906 40.283h6.43v-3.39h-6.422V33.28h10.67v-3.318H263.45v17.575h14.668V44.28h-11.212zM293.721 40.87l-9.683-10.908h-2.115v17.575h3.435V36.718l9.71 10.819h2.17V29.962h-3.517zM164.542 39.986c2.114-1.272 2.949-3.32 2.439-5.993-.424-2.802-2.71-3.901-5.449-4.03h-10.318v17.56h3.44V40.67h5.058l3.982 6.854h4.063l-4.084-7.03c.348-.21.613-.358.87-.508zm-1.057-4.74c-.042 1.006-.494 1.965-1.701 1.996h-7.13v-3.91h7.338c1.03.037 1.54.97 1.501 1.915z"
            />
          </motion.svg>
        </Link>

        {/* Right Menu Button */}
        <button
          onClick={toggleMenu}
          className="relative z-50 flex items-center justify-center gap-1 transition-all duration-300"
          style={{
            fontSize: "12px",
            height: "24px",
            paddingLeft: "16px",
            paddingRight: "16px",
            backgroundColor: "rgba(186, 186, 186, 0.3)",
            color: isMenuOpen ? "#000000" : "#ffffff",
            borderRadius: "0",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isMenuOpen ? "#000000" : "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          <span>{isMenuOpen ? t("닫기", "Close") : t("메뉴", "Menu")}</span>
          {isMenuOpen && (
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            >
              <line x1="1" y1="1" x2="7" y2="7" />
              <line x1="7" y1="1" x2="1" y2="7" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
