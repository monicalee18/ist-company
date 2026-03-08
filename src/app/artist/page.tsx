"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const artists = [
  {
    id: "tunexx",
    name: "TUNEXX",
    logo: "/artists/tunexx-logo.svg",
    photo: "/artists/tunexx.jpg",
    socials: {
      tiktok: "https://www.tiktok.com/@tunexx_official",
      instagram: "https://www.instagram.com/tunexx_official",
      x: "https://x.com/TUNEXX_official",
      youtube: "https://www.youtube.com/@official_TUNEXX",
      website: "https://www.tunexx.co.kr",
    },
  },
];

function SocialIcon({
  type,
  href,
}: {
  type: "tiktok" | "instagram" | "x" | "youtube" | "website";
  href?: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    tiktok: (
      <path
        d="M10.369 1.579A14.3 14.3 0 0 1 13.117 1.565c.03 1.142.494 2.17 1.231 2.932a4.33 4.33 0 0 0 2.98 1.257v2.833a7.4 7.4 0 0 1-2.999-.702 9 9 0 0 1-1.169-.653c-.007 2.053.006 4.105-.015 6.15a7.2 7.2 0 0 1-.96 2.787 5.62 5.62 0 0 1-4.136 2.257c-.069.003-.15.005-.232.005a5.5 5.5 0 0 1-2.658-.73 5.61 5.61 0 0 1-2.564-4.01 11 11 0 0 1-.007-1.048c.276-2.688 2.528-4.768 5.266-4.768.307 0 .609.027.902.076.014 1.04-.028 2.08-.028 3.12a2.38 2.38 0 0 0-.8-.137 2.43 2.43 0 0 0-2.275 1.627 2.4 2.4 0 0 0-.118.802c0 .116.007.23.02.343a2.43 2.43 0 0 0 2.363 2.04h.096a2.44 2.44 0 0 0 1.942-1.132c.15-.21.253-.463.288-.738.07-1.258.038-2.51.045-3.768.006-2.833-.007-5.659.014-8.485Z"
        fill="currentColor"
      />
    ),
    instagram: (
      <>
        <rect
          x="2.75"
          y="2.75"
          width="14.5"
          height="14.5"
          rx="4.25"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle
          cx="10"
          cy="10"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="14.5" cy="5.5" r="1" fill="currentColor" />
      </>
    ),
    x: (
      <path
        d="M10.477 8.618 17.03 1h-1.553l-5.69 6.615L5.242 1H0l6.873 10.002L0 18.991h1.553l6.009-6.985L12.362 18.991h5.242L10.476 8.618Zm-2.127 2.472-.697-.996L2.113 2.169h2.385l4.471 6.396.697.996 5.812 8.31h-2.385l-4.743-6.781Z"
        fill="currentColor"
      />
    ),
    youtube: (
      <path
        d="M17.619 5.972a2.31 2.31 0 0 0-1.591-1.591C14.635 4 9.993 4 9.993 4s-4.628 0-6.021.381A2.31 2.31 0 0 0 2.368 5.972C2 7.366 2 10.298 2 10.298s0 2.931.368 4.338a2.31 2.31 0 0 0 1.604 1.591c1.394.382 6.021.382 6.021.382s4.641 0 6.035-.382a2.31 2.31 0 0 0 1.591-1.591C18 13.23 18 10.298 18 10.298s0-2.932-.381-4.326ZM8.205 13.007V7.603l4.668 2.695-4.668 2.71Z"
        fill="currentColor"
      />
    ),
    website: (
      <svg viewBox="199 11 18 18" width="20" height="20">
        <path
          d="M216.464 13.8658C216.407 13.8196 216.349 13.7726 216.29 13.728C215.879 13.4276 215.399 13.1857 214.865 13C214.837 13.8658 213.395 14.929 211.438 15.4737C209.308 16.0672 207.378 15.8196 207.126 14.9223C206.96 14.3281 207.57 13.5984 208.621 13C208.621 13 208.615 13.0017 208.612 13.0025C207.863 13.1915 207.099 13.4391 206.334 13.7511C206.169 13.818 206.005 13.8881 205.841 13.9608C205.676 14.0334 205.512 14.1093 205.348 14.1869C204.702 14.4956 204.089 14.8349 203.513 15.1972C203.417 15.2575 203.322 15.3185 203.229 15.3804C202.854 15.6272 202.495 15.8848 202.155 16.1497C201.73 16.4815 201.333 16.8257 200.967 17.179C200.811 17.33 200.66 17.4836 200.515 17.6379C200.403 17.7584 200.293 17.8789 200.187 18.0011C200.09 18.1125 199.997 18.2239 199.906 18.3362C199.816 18.4484 199.728 18.5615 199.645 18.6746C199.603 18.7315 199.561 18.7877 199.521 18.8446C199.487 18.8925 199.454 18.9412 199.42 18.9891C199.741 18.6721 200.099 18.3675 200.493 18.0861C202.831 16.4163 205.861 15.8707 206.836 17.2285C207.811 18.5863 206.363 21.3348 204.024 23.0046C203.662 23.263 203.292 23.4867 202.921 23.6765C204.576 22.1916 205.311 20.3683 204.573 19.339C203.796 18.2578 201.661 18.4319 199.624 19.6758C200.867 19.2582 201.979 19.3555 202.465 20.0324C203.182 21.0319 202.26 22.9163 200.405 24.2402C200.305 24.3112 200.206 24.3781 200.106 24.4425C199.739 24.6794 199.367 24.8758 199 25.0293C199.119 25.1705 199.251 25.3025 199.391 25.4272C199.439 25.4684 199.487 25.5097 199.535 25.5493C199.593 25.5955 199.65 25.6426 199.709 25.6872C200.12 25.9876 200.6 26.2294 201.134 26.4152C201.162 25.5493 202.604 24.4862 204.561 23.9414C206.691 23.348 208.622 23.5956 208.873 24.4928C208.952 24.7734 208.857 25.0846 208.625 25.3974C208.532 25.5229 208.417 25.6484 208.282 25.7722C208.215 25.8341 208.142 25.896 208.065 25.9571C207.95 26.0487 207.824 26.1387 207.689 26.227C207.599 26.2856 207.504 26.3434 207.406 26.4003C207.397 26.4053 207.388 26.4102 207.379 26.4152C207.379 26.4152 207.385 26.4135 207.388 26.4127C208.137 26.2237 208.901 25.976 209.666 25.664C209.995 25.5303 210.323 25.3851 210.652 25.2282C210.939 25.0912 211.22 24.9476 211.494 24.799C211.768 24.6505 212.034 24.4961 212.294 24.3376C212.517 24.2014 212.733 24.062 212.944 23.9192C213.085 23.8242 213.224 23.7268 213.36 23.6294C213.631 23.4338 213.894 23.2324 214.145 23.0261C214.207 22.9749 214.27 22.9229 214.331 22.8709C214.453 22.7669 214.573 22.6621 214.691 22.5564C214.808 22.4508 214.923 22.3435 215.033 22.2362C215.089 22.1825 215.144 22.1281 215.198 22.0736C215.277 21.9952 215.353 21.9159 215.428 21.8367C215.562 21.6964 215.69 21.5561 215.813 21.4141C215.91 21.3027 216.003 21.1912 216.094 21.079C216.184 20.9667 216.272 20.8536 216.355 20.7406C216.433 20.6357 216.508 20.5309 216.58 20.4261C216.259 20.743 215.901 21.0476 215.507 21.3291C213.168 22.9988 210.139 23.5444 209.164 22.1867C208.189 20.8289 209.637 18.0803 211.976 16.4105C212.338 16.1522 212.708 15.9285 213.079 15.7387C211.425 17.2236 210.689 19.0469 211.427 20.0761C212.204 21.1574 214.339 20.9832 216.376 19.7394C215.133 20.157 214.021 20.0596 213.535 19.3828C212.818 18.3832 213.74 16.4989 215.595 15.1749C215.695 15.1039 215.794 15.0371 215.894 14.9727C216.261 14.7358 216.633 14.5394 217 14.3858C216.841 14.1976 216.661 14.0251 216.465 13.8658H216.464Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  const icon = icons[type];
  const isNestedSvg = type === "website";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
    >
      {isNestedSvg ? (
        <div className="w-[20px] h-[20px]">{icon}</div>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {icon}
        </svg>
      )}
    </a>
  );
}

export default function ArtistPage() {
  const { t } = useLanguage();
  const artist = artists[0];

  return (
    <div className="h-screen bg-black flex flex-col pb-[60px]">
      {/* Upper Section - Artist Info */}
      <motion.div
        className="flex flex-col items-center justify-center gap-[40px] pt-[115px] pb-[40px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Artists Label */}
        <p className="text-white text-[18px] font-normal leading-[1.2] text-center font-[family-name:var(--font-geist-sans)]">
          Artist
        </p>

        {/* Artist Logo */}
        <div className="w-[300px] h-[53px] relative">
          <Image
            src={artist.logo}
            alt={artist.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-[7px]">
          <SocialIcon type="tiktok" href={artist.socials.tiktok} />
          <SocialIcon type="instagram" href={artist.socials.instagram} />
          <SocialIcon type="x" href={artist.socials.x} />
          <SocialIcon type="youtube" href={artist.socials.youtube} />
          <SocialIcon type="website" href={artist.socials.website} />
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-full border-t border-white/20" />

      {/* Artist Photo */}
      <motion.div
        className="flex-1 relative content-padding mt-[40px] min-h-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={artist.photo}
            alt={artist.name}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
