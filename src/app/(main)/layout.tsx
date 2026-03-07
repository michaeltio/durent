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
      <main className="relative ml-20 w-[calc(100%-5rem)]">{children}</main>
    </SidebarProvider>
  );
}
