import { DashboardLayout } from "@/components/shared/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

// Create a escape folder (General)
// inside the folder, create a layout.tsx and then copy everything we have inside the root layout to the layout.tsx that was created and include your header and footer component.
// move the root page.tsx into the escape folder that was created and also move all folder that uses the navbar and footer into the escape folder.
