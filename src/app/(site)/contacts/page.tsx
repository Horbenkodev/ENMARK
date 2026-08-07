import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "ENMARK", href: "/" }, { label: "Де купити?" }]} />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">Де купити?</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Телефон</h2>
          <a href="tel:+380000000000" className="mt-1 block text-neutral-600 hover:text-neutral-900">
            +380 (00) 000-00-00
          </a>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Email</h2>
          <a
            href="mailto:info@enmark.ua"
            className="mt-1 block text-neutral-600 hover:text-neutral-900"
          >
            info@enmark.ua
          </a>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Адреса</h2>
          <p className="mt-1 text-neutral-600">м. Київ, вул. Прикладна, 1</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Графік роботи</h2>
          <p className="mt-1 text-neutral-600">Пн–Пт, 9:00–18:00</p>
        </div>
      </div>

      <p className="mt-10 text-sm text-neutral-400">
        Контакти орієнтовні — замініть на реальні дані компанії.
      </p>
    </div>
  );
}
