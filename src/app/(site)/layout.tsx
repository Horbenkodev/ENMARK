import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Header/Footer query categories from the database on every render.
// Force dynamic rendering so this doesn't require DB access at build time.
export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
