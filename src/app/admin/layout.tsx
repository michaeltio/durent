import { AppSidebarAdmin } from "@/components/app-sidebar-admin/AppSidebarAdmin";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <main className="relative z-10 ml-20 w-[calc(100%-5rem)] min-h-screen">
        {children}
      </main>
    </SidebarProvider>
  );
}
