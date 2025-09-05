"use client";
import { forwardRef, ReactNode } from "react";
import { Button, GetProps, GetRef } from "antd";
import "./_customButton.css";

type CustomButtonProps = {
  children?: ReactNode;
  className?: string;
} & GetProps<typeof Button>;

const CustomButton = forwardRef<GetRef<typeof Button>, CustomButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Button ref={ref} className={`${className ? className : ""}`} {...props}>
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
