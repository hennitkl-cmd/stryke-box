import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import ScienceSection from "@/components/landing/ScienceSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <ScienceSection />
      <FeatureGrid />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
