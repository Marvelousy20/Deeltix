import RestaurantDashBoardNavbar from "@/components/RestaurantDashboardNavbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="overflow-y-hidden">
    <RestaurantDashBoardNavbar />
    {children}
    </section>;
}

// Create a escape folder (General)
// inside the folder, create a layout.tsx and then copy everything we have inside the root layout to the layout.tsx that was created and include your header and footer component.
// move the root page.tsx into the escape folder that was created and also move all folder that uses the navbar and footer into the escape folder.
