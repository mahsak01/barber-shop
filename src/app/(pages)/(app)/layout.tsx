import { Metadata } from "next";
import { RootLayoutProps } from "@/types/common";
import Header from "@/app/_components/Header/Header";
import Footer from "@/app/_components/Footer/Footer";
import "../../globals.css";

export const metadata: Metadata = {
  title: "به نوبت",
  description: "رزرو وقت آرایشگاه",
};

export default async function ClientLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
