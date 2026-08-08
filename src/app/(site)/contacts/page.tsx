import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 px-6">
      <Breadcrumbs items={[{ label: "ENMARK", href: "/" }, { label: "Де купити?" }]} />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">Де купити?</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Телефон</h2>
          <a href="tel:+380967062202" className="mt-1 block text-neutral-600 hover:text-neutral-900">
            +380967062202
          </a>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Email</h2>
          <a
            href="mailto:enmark.lviv@gmail.com"
            className="mt-1 block text-neutral-600 hover:text-neutral-900"
          >
            enmark.lviv@gmail.com
          </a>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Адреса</h2>
          <p className="mt-1 text-neutral-600">м. Львів, ТЦ Нова Маркет, вул. Наукова 7 (2-ий поверх)</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Графік роботи</h2>
          <p className="mt-1 text-neutral-600">Пн–Пт, 10:00–19:00</p>
          <p className="mt-1 text-neutral-600">Сб, 11:00–19:00</p>
          <p className="mt-1 text-neutral-600">Нд, 11:00–18:00</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Соц. мережі</h2>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61583932820829"
              className="mt-1 block text-neutral-600 hover:text-neutral-900"
              target="_blank"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/stil.ua_nova.market?igsh=MWFoeTRydnV0MDNxOQ=="
              className="mt-1 block text-neutral-600 hover:text-neutral-900"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@enmark_lviv?_r=1&_t=ZS-98i6jdGTDQ9"
              className="mt-1 block text-neutral-600 hover:text-neutral-900"
              target="_blank"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
