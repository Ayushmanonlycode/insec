import HeroSection from "@/components/landing/HeroSection";
import { Case } from "@/components/landing/CasesInfiniteScroll";
import SolutionsGrid from "@/components/landing/SolutionsGrid";
import ComplianceSection from "@/components/landing/ComplianceSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <HeroSection />
      <Case />
      <SolutionsGrid />
      <ComplianceSection />
      <Footer />
    </main>
  );
}
