import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("pageTitle")}</h1>
        </div>
      </section>

      {/* Business Model Intro */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6">
            {t("intro.title")}
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {t("intro.text")}
          </p>
        </div>
      </section>

      {/* Merchandising Division Overview */}
      <section className="py-16 bg-light-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            {t("model.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(["wholesale", "consulting"] as const).map((key) => (
              <div key={key} className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-navy mb-3">
                  {t(`model.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`model.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Noroshi Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">
              {t("noroshi.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              {t("noroshi.description")}
            </p>
          </div>

          {/* 6-Step Framework */}
          <h3 className="text-xl font-bold text-navy mb-8">
            {t("noroshi.frameworkTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(t.raw("noroshi.steps") as { step: string; title: string; description: string }[]).map(
              (item, i) => (
                <div key={i} className="bg-light-gray rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange/30 mb-2">
                    {item.step}
                  </div>
                  <h4 className="text-base font-bold text-navy mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Noroshi Merits */}
          <h3 className="text-xl font-bold text-navy mb-8">
            {t("noroshi.meritsTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(t.raw("noroshi.merits") as { title: string; description: string }[]).map(
              (merit, i) => (
                <div key={i} className="bg-cream/50 rounded-xl p-6">
                  <h4 className="text-base font-bold text-navy mb-2">
                    {merit.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {merit.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Tagpo Section */}
      <section className="py-16 bg-light-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy mb-4">
              {t("tagpo.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              {t("tagpo.description")}
            </p>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-navy mb-4">
              {t("tagpo.howItWorksTitle")}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t("tagpo.howItWorks")}
            </p>
          </div>

          {/* Effects */}
          <h3 className="text-xl font-bold text-navy mb-6">
            {t("tagpo.effectsTitle")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(t.raw("tagpo.effects") as { title: string; description: string }[]).map(
              (effect, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center mb-3">
                    <span className="text-orange font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-navy mb-2">
                    {effect.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {effect.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            {t("intro.text").split("。")[0]}。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange px-8 py-3 rounded-lg text-white font-semibold hover:bg-orange/90 transition-colors"
          >
            {t("cta")}
          </Link>
        </div>
      </section>
    </>
  );
}
