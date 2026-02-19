const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ArtFolio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
