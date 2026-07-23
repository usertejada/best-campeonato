import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/sidebar-context";
import { MainContent } from "@/components/main-content";
import { InactivityLogout } from "@/components/inactivity-logout";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userEmail = user?.email ?? "";
  const userName = user?.user_metadata?.full_name || (userEmail ? userEmail.split("@")[0] : "Usuário");
  const avatarUrl = user?.user_metadata?.avatar_url || undefined;

  return (
    <SidebarProvider>
      <InactivityLogout />
      <Sidebar userName={userName} userEmail={userEmail} avatarUrl={avatarUrl} />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}