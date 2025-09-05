import { ReactNode } from "react";

export type RootLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;
