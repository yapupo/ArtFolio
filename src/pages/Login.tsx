import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Palette } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({
          title: "Conta criada!",
          description: "Verifique seu e-mail para confirmar o cadastro.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin");
      }
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Algo deu errado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pastel-pink/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-pastel-lilac/20 blur-3xl" />

      <div className="relative w-full max-w-sm bg-card rounded-2xl border border-border p-8 drop-shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Palette className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl">ArtFolio</span>
        </div>

        <h2 className="text-center font-display font-bold text-2xl mb-2">
          {isSignUp ? "Criar Conta" : "Entrar"}
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          {isSignUp ? "Crie sua conta de administrador" : "Acesse o painel de administração"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl"
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary text-primary-foreground"
          >
            {loading ? "Aguarde..." : isSignUp ? "Criar Conta" : "Entrar"}
          </Button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isSignUp ? "Já tem conta? Entrar" : "Não tem conta? Criar"}
        </button>
      </div>
    </div>
  );
};

export default Login;
