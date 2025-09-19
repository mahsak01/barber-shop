import { ReactNode } from "react";
import { ConfigProvider, ConfigProviderProps } from "antd";
import { ConfigContext } from "antd/es/config-provider";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { GlobalConfigProps } from "antd/es/notification/interface";
import fa_IR from "antd/es/locale/fa_IR";

// const antdThemeConfig: (currentTheme?: string) => ThemeConfig = (
//   currentTheme?: string
// ) => ({
//   algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
// });

type Config = ConfigProviderProps & {
  ConfigContext?: typeof ConfigContext;
  SizeContext?: React.Context<SizeType>;
  config?: (props: GlobalConfigProps) => void;
  useConfig?: typeof useConfig;
};

const AntdConfigProviderWrapper = ({ children }: { children: ReactNode }) => {
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
  return <ConfigProvider {...config}>{children}</ConfigProvider>;
};

// theme={antdThemeConfig(currentTheme)}

export default AntdConfigProviderWrapper;
