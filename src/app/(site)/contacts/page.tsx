import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "@/components/icons/SocialIcons";

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 px-6">
      <Breadcrumbs items={[{ label: "EN.MARK", href: "/" }, { label: "Де купити?" }]} />
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
          <a href="https://www.google.com/maps/place/New+Market/@49.8001909,24.0020958,14z/data=!4m6!3m5!1s0x473adce27c967d8b:0xfe8ef87977659c01!8m2!3d49.8015426!4d24.0057252!16s%2Fg%2F11cjnpq7pb?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="mt-1 underline text-neutral-600 hover:text-neutral-900">м. Львів, ТЦ Нова Маркет, вул. Наукова 7 (2-ий поверх)
          </a>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Соц. мережі</h2>
          <div className="mt-2 flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61583932820829"
              className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="h-4 w-4" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/stil.ua_nova.market?igsh=MWFoeTRydnV0MDNxOQ=="
              className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@enmark_lviv?_r=1&_t=ZS-98i6jdGTDQ9"
              className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TiktokIcon className="h-4 w-4" />
              TikTok
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Графік роботи</h2>
          <p className="mt-1 text-neutral-600">Пн–Пт, 10:00–19:00</p>
          <p className="mt-1 text-neutral-600">Сб, 11:00–19:00</p>
          <p className="mt-1 text-neutral-600">Нд, 11:00–18:00</p>
        </div>
      </div>
    </div>
  );
}
