"use client";
import { ConfigProvider, theme, ThemeConfig } from "antd";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

const antdThemeConfig: (currentTheme?: string) => ThemeConfig = (
  currentTheme?: string
) => {
  return {
    algorithm: currentTheme === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      borderRadiusSM: 4,
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusXS: 2,
      wireframe: false,
    },
  };
};

export default function AntdConfigProviderWrapper({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setIsThemeReady(true); // Once theme is resolved, allow rendering
    }
  }, [resolvedTheme]);

  // If the theme is not yet ready, prevent rendering to avoid Flashing
  if (!isThemeReady) {
    return null; // Don't render anything until the theme is resolved
  }

  return (
    <ConfigProvider theme={antdThemeConfig(resolvedTheme)}>{children}</ConfigProvider>
  );
}
