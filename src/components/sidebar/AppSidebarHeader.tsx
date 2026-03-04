import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <h1>Hello</h1>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
