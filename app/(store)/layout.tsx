import type { Metadata } from "next";
import { CartProvider } from "@/components/store/CartContext";
import { Navbar } from "@/components/store/Navbar";
import { CartDrawer } from "@/components/store/CartDrawer";

export const metadata: Metadata = {
  title: "Yora Store",
  description: "المتجر الأول لإكسسوارات الموبايل في أسوان",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "201000000000";

  return (
    <CartProvider>
      <Navbar />
      <CartDrawer whatsappNumber={whatsappNumber} />
      <main>
        {children}
      </main>
    </CartProvider>
  );
}
