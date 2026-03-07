import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, MapPin, Tag } from "lucide-react";
import Link from "next/link";

export default function AppSidebarAdminContent() {
  return (
    <SidebarContent className="py-2">
      <SidebarMenu>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton asChild className="h-auto">
            <Link
              href="/admin"
              className="flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <LayoutDashboard className="h-6 w-6 shrink-0" />
              <span className="text-[11px] leading-tight text-center font-medium">
                Dashboard
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton asChild className="h-auto">
            <Link
              href="/admin/locations"
              className="flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <MapPin className="h-6 w-6 shrink-0" />
              <span className="text-[11px] leading-tight text-center font-medium">
                Locations
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton asChild className="h-auto">
            <Link
              href="/admin/tags"
              className="flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <Tag className="h-6 w-6 shrink-0" />
              <span className="text-[11px] leading-tight text-center font-medium">
                Tags
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
}
