import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-neutral-200 text-neutral-11 p-12 flex flex-col gap-8 mt-20">
      {/* Logo  */}
      <h2 className="text-2xl font-semibold ">به نوبت</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm text-right">
        {/* About */}
        <div>
          <h3 className="font-semibold mb-2">درباره فراشا</h3>
          <ul className="space-y-1">
            <li>فرصت‌های شغلی</li>
            <li>کمک و پشتیبانی</li>
            <li>وبلاگ</li>
            <li>نقشه سایت</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">قانونی</h3>
          <ul className="space-y-1">
            <li>سیاست حفظ حریم خصوصی</li>
            <li>شرایط خدمات</li>
            <li>شرایط استفاده</li>
          </ul>
        </div>

        {/* For Business */}
        <div>
          <h3 className="font-semibold mb-2">برای کسب‌وکارها</h3>
          <ul className="space-y-1">
            <li>برای شرکا</li>
            <li>قیمت‌گذاری</li>
            <li>پشتیبانی</li>
            <li>وضعیت</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-2">شبکه‌های اجتماعی ما</h3>
          <ul className="space-y-1">
            <li className="flex items-center  gap-2">
              <CiFacebook size={20} /> فیسبوک
            </li>
            <li className="flex items-center  gap-2">
              <IoLogoTwitter size={20} /> توییتر
            </li>
            <li className="flex items-center  gap-2">
              <CiLinkedin size={20} /> لینکدین
            </li>
            <li className="flex items-center  gap-2">
              <FaInstagram size={20} /> اینستاگرام
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
