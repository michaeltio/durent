"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import type { User } from "@supabase/supabase-js";

export default function AppSidebarFooter() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <SidebarFooter className="">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="">
            {user ? (
              <div className="flex justify-center items-center cursor-pointer">
                <Avatar size="default">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase() || "JD"}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Link href="/login">
                <div className="flex justify-center items-center rounded-lg w-12 h-12">
                  <LogIn className="w-5 h-5" />
                </div>
              </Link>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
