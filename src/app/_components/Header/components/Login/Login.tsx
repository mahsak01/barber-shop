import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <Link href="/login">
      <span className="cursor-pointer text-text-100 transition-colors hover:text-primary dark:text-text-50 dark:hover:text-primary">
        ورود یا ثبت‌نام
      </span>
    </Link>
  );
};

export default Login;
