import { Metadata } from "next"; 
import { RootLayoutProps } from "@/types/common";
import BaseLayout from "./_components/BaseLayout/BaseLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "به نوبت",
  description: "رزرو وقت آرایشگاه",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return <BaseLayout>{children}</BaseLayout>;
}
