"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: "ja" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale("ja")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "ja"
            ? "bg-navy text-white"
            : "text-navy hover:bg-gray-100"
        }`}
      >
        JA
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-navy text-white"
            : "text-navy hover:bg-gray-100"
        }`}
      >
        EN
      </button>
    </div>
  );
}
