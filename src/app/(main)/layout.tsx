import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar/AppSidebarAdmin";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserProfile();
  const isAdmin = profile?.role === "admin";

  return (
    <SidebarProvider>
      {isAdmin ? <AppSidebarAdmin /> : <AppSidebar />}
      <main className="relative ml-24 flex min-h-svh w-[calc(100%-6rem)] flex-col">
        <div className="flex-1">{children}</div>
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
