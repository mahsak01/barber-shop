import { Drawer, GetProps } from "antd";
import "./_customDrawer.css";

type CustomDrawerProps = {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "large";
} & GetProps<typeof Drawer>;

const CustomDrawer = ({
  className,
  children,
  size = "large",
  ...props
}: CustomDrawerProps) => {
  return (
    <Drawer
      className={`custom-drawer-container ${className}`}
      size={size}
      rootClassName="custom-drawer-root-class"
      {...props}
    >
      {children}
    </Drawer>
  );
};
export default CustomDrawer;
