
import Header from "@/components/layout/Header";
import Hero from "@/features/home/components/Hero";
import About from "@/features/home/components/About";
import Atuacao from "@/features/home/components/Atuacao";
import Diferenciais from "@/features/home/components/Diferenciais";
import NextStep from "@/features/home/components/NextStep";
import ContactFAQ from "@/features/home/components/ContactFAQ";
import Footer from "@/features/home/components/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F4]">
      <Header />
      <Hero />
      <About />
      <Atuacao />
      <Diferenciais />
      <NextStep />
      <ContactFAQ />
      <Footer />
      <FloatingWhatsApp />


    </main>
  );
}
