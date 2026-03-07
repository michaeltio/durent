import { Sidebar } from "@/components/ui/sidebar";

import AppSidebarHeader from "../app-sidebar/AppSidebarHeader";
import AppSidebarAdminContent from "./AppSidebarAdminContent";
import AppSidebarFooter from "../app-sidebar/AppSidebarFooter";

export function AppSidebarAdmin() {
  return (
    <Sidebar
      variant="floating"
      collapsible="none"
      className="fixed z-20 w-16 h-[calc(100vh-1rem)] m-2 rounded-lg border bg-sidebar/10 backdrop-blur-md"
    >
      <AppSidebarHeader />
      <AppSidebarAdminContent />
      <AppSidebarFooter />
    </Sidebar>
  );
}
