import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { App } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdConfigProviderWrapper from "@/lib/antd-provider";
import QueryProvider from "@/providers/react-query-provider";
import { vazirmatn } from "@/utils/fonts/fontUtils";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export default async function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable}   scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`relative grid min-h-screen grid-rows-[67x_1fr_auto] scroll-smooth bg-bg-0 text-text-50 antialiased dark:bg-bg-0 dark:text-text-50`}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <QueryProvider>
            <NextTopLoader showSpinner={false} color="var(--primary-600)" />
            <AntdRegistry>
              <AntdConfigProviderWrapper>
                <App notification={{ placement: "bottomLeft", stack: true }}>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                </App>
              </AntdConfigProviderWrapper>
            </AntdRegistry>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
