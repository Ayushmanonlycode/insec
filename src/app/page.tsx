import HeroSection from "@/components/ui/hero-section";
import { Case } from "@/components/ui/cases-with-infinite-scroll";
import SolutionsGrid from "@/components/ui/solutions-grid";
import ComplianceSection from "@/components/ui/compliance-section";
import Footer from "@/components/ui/footer";

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
