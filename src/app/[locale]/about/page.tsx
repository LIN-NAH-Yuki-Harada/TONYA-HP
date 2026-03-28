import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("pageTitle")}</h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-light-gray rounded-xl p-8">
              <h2 className="text-xl font-bold text-navy mb-4">
                {t("mission.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("mission.text")}
              </p>
            </div>
            <div className="bg-light-gray rounded-xl p-8">
              <h2 className="text-xl font-bold text-navy mb-4">
                {t("vision.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("vision.text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-light-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            {t("companyInfo.title")}
          </h2>
          <div className="bg-white rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {(
                  [
                    "name",
                    "address",
                    "established",
                    "capital",
                    "ceo",
                    "business",
                  ] as const
                ).map((key) => (
                  <tr key={key} className="border-b border-gray-100 last:border-0">
                    <th className="text-left px-6 py-4 bg-cream/50 text-navy font-semibold w-1/3 text-sm">
                      {t(`companyInfo.${key}`)}
                    </th>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {t(`companyInfo.${key}Value`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Access Map — H¹O Hatchobori */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            {t("access.title")}
          </h2>
          <div className="rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.0!2d139.7765!3d35.6735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018894e4b6e3b8d%3A0x0!2z5YWr5LiB5aCA77yS5LiB55uu!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TONYA Head Office — H¹O Hatchobori"
            />
          </div>
        </div>
      </section>
    </>
  );
}
