import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/sidebar-context";
import { MainContent } from "@/components/main-content";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar userName="Tejada" userEmail="tejada@championsystem.com" />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}