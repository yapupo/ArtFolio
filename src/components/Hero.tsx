import { motion } from "framer-motion";
import { Palette } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pastel-pink/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-pastel-lilac/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pastel-mint/20 blur-3xl" />

      <div className="relative container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-foreground px-4 py-2 rounded-full mb-6">
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/70">Portfólio de Arte Digital</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-6"
        >
          Criando mundos
          <span className="block text-primary">pixel por pixel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Ilustrações, vetores, pixel art e muito mais. Transformo ideias em arte digital com cores vibrantes e detalhes que encantam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a href="#gallery" className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity drop-shadow-sm">
            Ver Galeria
          </a>
          <a href="#quote" className="bg-card border border-border text-foreground px-6 py-3 rounded-2xl font-medium hover:bg-muted transition-colors drop-shadow-sm">
            Solicitar Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
