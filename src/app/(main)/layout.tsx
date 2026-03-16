"use client";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative ml-20 w-[calc(100%-5rem)]">
        {children}
        <footer className="border-t border-border/30 px-6 py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Ada pertanyaan?</span>
          <a
            href="https://wa.me/628111029064"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium"
          >
            Hubungi Kami via WhatsApp
          </a>
        </footer>
      </main>
    </SidebarProvider>
  );
}
