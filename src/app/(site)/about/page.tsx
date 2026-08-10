import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "EN.MARK", href: "/" }, { label: "Про нас" }]} />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">Про нас</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-neutral-600">
        <p className="font-bold text-neutral-900">
          EN.MARK — салон столів та стільців у Львові.
        </p>
        <p>
          Ми є офіційними представниками перевірених виробників та
          спеціалізуємось на столах і стільцях для дому та закладів HoReCa.
        </p>
        <p>
          У салоні представлені моделі для кухонь та обідніх зон, а також
          рішення для ресторанів, кафе й інших закладів. Працюємо як із
          готовими моделями, так і з індивідуальними запитами — допомагаємо
          підібрати або виготовити стіл відповідно до ваших потреб.
        </p>
        <p className="font-bold text-neutral-900">
          EN.MARK — столи та стільці, створені під ваш простір.
        </p>
      </div>
    </div>
  );
}
