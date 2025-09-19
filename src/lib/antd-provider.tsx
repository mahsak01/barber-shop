"use client";
import { ConfigProvider, theme, ThemeConfig,ConfigProviderProps } from "antd";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { ConfigContext } from "antd/es/config-provider";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { GlobalConfigProps } from "antd/es/notification/interface";
import fa_IR from "antd/es/locale/fa_IR";

type Config = ConfigProviderProps & {
  ConfigContext?: typeof ConfigContext;
  SizeContext?: React.Context<SizeType>;
  config?: (props: GlobalConfigProps) => void;
  useConfig?: typeof useConfig;
};


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

    const config: Config = {
      locale: fa_IR,
      direction: "rtl",
      renderEmpty: () => <p>This is empty</p> ,
      theme: {
        // algorithm: theme.defaultAlgorithm,
        token: {
          borderRadiusSM: 4,
          borderRadius: 8,
          borderRadiusLG: 12,
          borderRadiusXS: 2,
          colorPrimary: "#1890ff",
          colorInfo: "#1890ff",
          colorWarning: "#faad14",
          wireframe: false,
        },
        hashed: true, // Enable CSS-in-JS hash to avoid conflicts
        cssVar: true, // Enable CSS variables mode
        // components: {},
      },
      virtual: true,
    };

  return (
    <ConfigProvider theme={antdThemeConfig(resolvedTheme)} {...config}>{children}</ConfigProvider>
  );
}
