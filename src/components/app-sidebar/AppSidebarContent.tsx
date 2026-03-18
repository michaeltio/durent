"use client";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { CalendarCheck, House, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { usePathname } from "next/navigation";

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppSidebarContent() {
  const { totalItems } = useCart();
  const pathname = usePathname();

  return (
    <SidebarContent className="py-2">
      <SidebarMenu>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton
            asChild
            className="h-auto"
            isActive={isPathActive(pathname, "/")}
          >
            <Link
              href="/"
              className="flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <House className="h-6 w-6 shrink-0" />
              <span className="text-[11px] leading-tight text-center font-medium">
                Home
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton
            asChild
            className="h-auto"
            isActive={isPathActive(pathname, "/ai-scout")}
          >
            <Link
              href="/ai-scout"
              className="flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <Sparkles className="h-6 w-6 shrink-0" />
              <span className="text-[11px] leading-tight text-center font-medium">
                AI Scout
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton
            asChild
            className="h-auto"
            isActive={isPathActive(pathname, "/reservations")}
          >
            <Link
              href="/reservations"
              className="flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <CalendarCheck className="h-6 w-6 shrink-0" />
              <span className="text-[11px] leading-tight text-center font-medium">
                Reservations
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem className="px-1">
          <SidebarMenuButton
            asChild
            className="h-auto"
            isActive={isPathActive(pathname, "/cart")}
          >
            <Link
              href="/cart"
              className="relative flex flex-col items-center gap-1.5 py-3 px-2"
            >
              <ShoppingBag className="h-6 w-6 shrink-0" />
              {totalItems > 0 ? (
                <span className="absolute right-1 top-2 flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {totalItems}
                </span>
              ) : null}
              <span className="text-[11px] leading-tight text-center font-medium">
                Cart
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
}
