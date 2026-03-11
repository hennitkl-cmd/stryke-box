import Navigation from "@/components/landing/Navigation";
import ProductHero3D from "@/components/landing/ProductHero3D";
import Hero from "@/components/landing/Hero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import ScienceSection from "@/components/landing/ScienceSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import SplashTitle from "@/components/landing/SplashTitle";
import AIChatbot from "@/components/landing/AIChatbot";
import { CustomerTypeProvider } from "@/context/CustomerTypeContext";

const Index = () => {
  return (
    <CustomerTypeProvider>
      <SplashTitle />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <Hero />
        <FeatureGrid />
        <ScienceSection />
        <ProductShowcase />
        <CTASection />
        <Footer />
        <AIChatbot />
      </div>
    </CustomerTypeProvider>
  );
};

export default Index;
