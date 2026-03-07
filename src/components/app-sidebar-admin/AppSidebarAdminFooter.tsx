import { LogOut } from "lucide-react";
import Link from "next/link";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export default function AppSidebarAdminFooter() {
  return (
    <SidebarFooter className="">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="">
            <Link href="/">
              <div className="flex justify-center items-center rounded-lg w-12 h-12 ">
                <LogOut className="w-5 h-5" />
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
