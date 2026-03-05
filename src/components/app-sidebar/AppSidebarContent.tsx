import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { House, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AppSidebarContent() {
  return (
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton asChild className="h-auto">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 py-3 px-2"
            >
              <House className="h-5 w-5 shrink-0" />
              <span className="text-[10px] leading-tight text-center">
                Home
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton asChild className="h-auto">
            <Link
              href="/ai-scout"
              className="flex flex-col items-center gap-1 py-3 px-2"
            >
              <Sparkles className="h-5 w-5 shrink-0" />
              <span className="text-[10px] leading-tight text-center">
                AI Scout
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
}
