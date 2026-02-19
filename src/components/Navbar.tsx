import { Palette } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <Palette className="w-6 h-6 text-primary" />
          <span>ArtFolio</span>
        </Link>

        <div className="flex items-center gap-4">
          <a href="#gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Galeria
          </a>
          <a href="#quote" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Orçamento
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
