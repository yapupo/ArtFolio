import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Constants } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Image, FileText } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CATEGORY_LABELS: Record<string, string> = {
  pixel_art: "Pixel Art",
  vectors: "Vetores",
  sketches: "Sketches",
  illustrations: "Ilustrações",
  logos: "Logos",
};

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<string>("");

  const { data: artworks = [] } = useQuery({
    queryKey: ["artworks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("artworks").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Tables<"artworks">[];
    },
  });

  const { data: quotes = [] } = useQuery({
    queryKey: ["quote_requests"],
    queryFn: async () => {
      const { data, error } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Tables<"quote_requests">[];
    },
  });

  const addArtwork = useMutation({
    mutationFn: async () => {
      if (!title || !imageUrl || !category) throw new Error("Preencha todos os campos");
      const { error } = await supabase.from("artworks").insert([{
        title,
        image_url: imageUrl,
        category: category as Tables<"artworks">["category"],
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
      setTitle("");
      setImageUrl("");
      setCategory("");
      toast({ title: "Arte adicionada! 🎨" });
    },
    onError: (err: Error) => {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-display font-bold">Painel Admin</h1>
          <Button variant="ghost" onClick={handleLogout} className="rounded-2xl">
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8 space-y-12">
        {/* Add Artwork Form */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Image className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-display font-bold">Adicionar Nova Arte</h2>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 drop-shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Título da obra"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-2xl"
              />
              <Input
                placeholder="URL da imagem"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="rounded-2xl"
              />
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.art_category.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CATEGORY_LABELS[cat] || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => addArtwork.mutate()}
              disabled={addArtwork.isPending}
              className="mt-4 rounded-2xl bg-primary text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addArtwork.isPending ? "Adicionando..." : "Adicionar Arte"}
            </Button>
          </div>
        </section>

        {/* Artworks List */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Image className="w-5 h-5 text-pastel-mint" />
            <h3 className="text-lg font-display font-semibold">Artes ({artworks.length})</h3>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden drop-shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {artworks.map((art) => (
                  <TableRow key={art.id}>
                    <TableCell className="font-medium">{art.title}</TableCell>
                    <TableCell>{CATEGORY_LABELS[art.category] || art.category}</TableCell>
                    <TableCell>{format(new Date(art.created_at), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                  </TableRow>
                ))}
                {artworks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      Nenhuma arte adicionada ainda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Quote Requests */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-pastel-lilac" />
            <h3 className="text-lg font-display font-semibold">Orçamentos Recebidos ({quotes.length})</h3>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden drop-shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium">{q.name}</TableCell>
                      <TableCell>{q.email}</TableCell>
                      <TableCell>{q.project_category}</TableCell>
                      <TableCell className="max-w-xs truncate">{q.description}</TableCell>
                      <TableCell>{format(new Date(q.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}</TableCell>
                    </TableRow>
                  ))}
                  {quotes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhum orçamento recebido ainda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
