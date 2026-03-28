import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="TONYA Inc."
              width={160}
              height={28}
              className="mb-3 invert"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold mb-3">{t("footer.links")}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gold transition-colors">
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold mb-3">{t("common.companyName")}</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">
                  {t("nav.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          {t("footer.copyright", { year: String(year) })}
        </div>
      </div>
    </footer>
  );
}
