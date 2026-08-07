import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "ENMARK", href: "/" }, { label: "Про нас" }]} />
      <h1 className="mt-3 text-3xl font-bold text-neutral-900">Про нас</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-neutral-600">
        <p>
          ENMARK — виробник меблів для дому та закладів HoReCa. Ми
          створюємо столи, крісла та стільці, поєднуючи практичність,
          сучасний дизайн і якісні матеріали.
        </p>
        <p>
          Це орієнтовний текст-заглушка — замініть його на реальну історію та
          цінності компанії.
        </p>
      </div>
    </div>
  );
}
