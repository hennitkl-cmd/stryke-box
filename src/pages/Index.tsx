import { lazy, Suspense } from "react";
import Navigation from "@/components/landing/Navigation";
import ProductHero3D from "@/components/landing/ProductHero3D";
import Hero from "@/components/landing/Hero";
import SplashTitle from "@/components/landing/SplashTitle";
import { CustomerTypeProvider } from "@/context/CustomerTypeContext";

const FeatureGrid = lazy(() => import("@/components/landing/FeatureGrid"));
const ScienceSection = lazy(() => import("@/components/landing/ScienceSection"));
const ProductShowcase = lazy(() => import("@/components/landing/ProductShowcase"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const AIChatbot = lazy(() => import("@/components/landing/AIChatbot"));

const Index = () => {
  return (
    <CustomerTypeProvider>
      <SplashTitle />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <ProductHero3D />
        <Hero />
        <Suspense fallback={null}>
          <FeatureGrid />
          <ScienceSection />
          <ProductShowcase />
          <CTASection />
          <Footer />
          <AIChatbot />
        </Suspense>
      </div>
    </CustomerTypeProvider>
  );
};

export default Index;
