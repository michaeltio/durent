"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, Paperclip, X, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiScoutPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const hasText = input.trim();
    const hasPdf = !!pdfFile;

    if ((!hasText && !hasPdf) || loading) return;

    // Label pesan user di chat bubble
    const userLabel = hasPdf
      ? hasText
        ? `📄 ${pdfFile!.name}\n${input.trim()}`
        : `📄 ${pdfFile!.name}`
      : input.trim();

    setMessages((prev) => [...prev, { role: "user", content: userLabel }]);
    setLoading(true);
    setInput("");
    setPdfFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    try {
      let response: Response;

      if (hasPdf) {
        // Kirim sebagai FormData
        const formData = new FormData();
        formData.append("pdf", pdfFile!);
        if (hasText) formData.append("message", hasText);

        response = await fetch("/api/ai-scout", {
          method: "POST",
          body: formData,
        });
      } else {
        // Kirim sebagai JSON biasa
        response = await fetch("/api/ai-scout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: input || hasText,
            conversationHistory: messages,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Gagal mendapatkan response dari AI");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setPdfFile(file);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-lg">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          AI Location Scout
        </h1>
        <p className="mt-2 text-muted-foreground text-sm max-w-md mx-auto">
          Deskripsikan scene kamu dan AI akan membantu merekomendasikan lokasi
          syuting yang paling cocok
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 rounded-lg border bg-muted/20 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Sparkles className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Mulai percakapan</p>
            <p className="text-sm mt-2">
              Ceritakan tentang scene yang ingin kamu syuting, atau upload PDF naskah kamu
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-background border shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* PDF preview indicator */}
      {pdfFile && (
        <div className="mb-2 flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <span className="flex-1 truncate text-foreground">{pdfFile.name}</span>
          <button
            type="button"
            onClick={() => {
              setPdfFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="rounded p-0.5 hover:bg-muted"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* PDF upload button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-[80px] w-[50px] shrink-0"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          title="Upload PDF naskah"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            pdfFile
              ? "Tambahkan konteks (opsional)..."
              : "Contoh: 'INT. MANSION - NIGHT - Seorang detektif masuk ke ruangan besar dengan chandelier...'"
          }
          className="min-h-[80px] max-h-[200px] resize-none"
          disabled={loading}
        />
        <Button
          type="submit"
          size="icon"
          className="h-[80px] w-[80px]"
          disabled={(!input.trim() && !pdfFile) || loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
