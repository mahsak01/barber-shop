"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";

const LOGIN_BY = {
  otp: 1,
  password: 2,
  forgetPassword: 3,
};

const Login = () => {
  const [loginBy, setLoginBy] = useState(LOGIN_BY.otp);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <div className="flex items-center justify-center  md:max-w-2xl m-auto my-10 md:rounded-3xl md:shadow-2xl md:overflow-hidden">
      {/* Left side - Form - login by code */}
      {loginBy === LOGIN_BY.otp && (
        <div className="w-full flex flex-col gap-10 items-center md:w-1/2 px-5 py-16 sm:max-w-[350px] sm:shadow-2xl  sm:mx-5 sm:rounded-3xl md:max-w-none md:shadow-none md:mx-none">
          <div className="flex flex-col gap-2 items-center ">
            <h1 className="text-3xl font-semibold text-neutral-11 ">
              ورود یا ثبت‌نام
            </h1>
            <p className="text-sm text-neutral-11">
              برای ادامه شماره موبایل خود را وارد کنید.
            </p>
          </div>
          <form className="flex flex-col gap-3 w-full">
            <CustomInput
              name="mobileNumber"
              placeholder="شماره موبایل"
              suffix="98+"
            />
            <CustomButton type="primary" className="w-full">
              تائید و دریافت کد
            </CustomButton>
            <span
              className="text-sm text-center text-blue-600 cursor-pointer"
              onClick={() => setLoginBy(LOGIN_BY.password)}
            >
              ورود با کلمه عبور
            </span>
          </form>
        </div>
      )}

      {/* Left side - Form - login by password*/}
      {loginBy === LOGIN_BY.password && (
        <div className="w-full flex flex-col gap-10 items-center md:w-1/2 px-5 py-16 sm:max-w-[350px] sm:shadow-2xl  sm:mx-5 sm:rounded-3xl md:max-w-none md:shadow-none md:mx-none">
          <div className="flex flex-col gap-2 items-center ">
            <h1 className="text-3xl font-semibold text-neutral-11 ">
              ورود به حساب کاربری
            </h1>
          </div>
          <form className="flex flex-col gap-3 w-full">
            <CustomInput
              name="mobileNumber"
              placeholder="شماره موبایل"
              suffix="98+"
            />
            <CustomInput
              name="password"
              placeholder="کلمه عبور"
              type={isPasswordShow ? "text" : "password"}
              suffix={
                isPasswordShow ? (
                  <LuEye onClick={() => setIsPasswordShow(false)} />
                ) : (
                  <LuEyeClosed onClick={() => setIsPasswordShow(true)} />
                )
              }
            />
            <CustomButton type="primary" className="w-full">
              ورود
            </CustomButton>
            <div className="flex justify-between w-full ">
              <span
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => setLoginBy(LOGIN_BY.forgetPassword)}
              >
                فراموشی رمز عبور
              </span>
              <span
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => setLoginBy(LOGIN_BY.otp)}
              >
                ورود با رمز یکبار مصرف
              </span>
            </div>
          </form>
        </div>
      )}

      {/* Left side - Form - forget password */}
      {loginBy === LOGIN_BY.forgetPassword && (
        <div className="w-full flex flex-col gap-10 items-center md:w-1/2 px-5 py-16 sm:max-w-[350px] sm:shadow-2xl  sm:mx-5 sm:rounded-3xl md:max-w-none md:shadow-none md:mx-none">
          <div className="flex flex-col gap-2 items-center ">
            <h1 className="text-3xl font-semibold text-neutral-11 ">
              فراموشی کلمه عبور
            </h1>
          </div>
          <form className="flex flex-col gap-3 w-full">
            <CustomInput
              name="mobileNumber"
              placeholder="شماره موبایل"
              suffix="98+"
            />
            <CustomButton type="primary" className="w-full">
             بازیابی کلمه عبور
            </CustomButton>
            <span
              className="text-sm text-center text-blue-600 cursor-pointer"
              onClick={() => setLoginBy(LOGIN_BY.otp)}
            >
              ورود با رمز یکبار مصرف 
            </span>
          </form>
        </div>
      )}

      {/* Right side - Image and Schedule UI */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/login/background.png"
          width={362}
          height={532}
          alt="login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
