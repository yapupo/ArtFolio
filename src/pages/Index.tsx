import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MasonryGallery from "@/components/MasonryGallery";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <MasonryGallery />
      <QuoteForm />
      <Footer />
    </div>
  );
};

export default Index;
