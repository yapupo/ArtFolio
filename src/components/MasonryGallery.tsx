import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const CATEGORIES = [
  { value: "all", label: "Todas" },
  { value: "pixel_art", label: "Pixel Art" },
  { value: "vectors", label: "Vetores" },
  { value: "sketches", label: "Sketches" },
  { value: "illustrations", label: "Ilustrações" },
  { value: "logos", label: "Logos" },
] as const;

const MasonryGallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: artworks = [], isLoading } = useQuery({
    queryKey: ["artworks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Tables<"artworks">[];
    },
  });

  const filtered = activeFilter === "all"
    ? artworks
    : artworks.filter((a) => a.category === activeFilter);

  return (
    <section id="gallery" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
          Galeria
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all drop-shadow-sm ${
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            Nenhuma arte encontrada. As obras aparecerão aqui quando forem adicionadas pelo admin.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden drop-shadow-sm"
                >
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex items-end">
                    <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-card font-display font-semibold text-lg">
                        {artwork.title}
                      </h3>
                      <span className="text-card/70 text-sm capitalize">
                        {artwork.category.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default MasonryGallery;
