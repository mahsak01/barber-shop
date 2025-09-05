import React from "react";

const Statistics = () => {
  return (
    <section className="text-center mt-28 px-4 text-neutral-11 dark:text-neutral-50">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        برترین مقصد برای زیبایی و سلامت{" "}
      </h2>

      {/* Subheading */}
      <p className="text-sm sm:text-base text-gray-600 mb-10">
        یک راهکار، یک نرم‌افزار. مورد اعتماد بهترین‌ها در صنعت زیبایی و سلامت
      </p>

      {/* Main Stat */}
      <h3 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
        5 میلیون +
      </h3>
      <p className="text-lg text-gray-700 mb-12">
        نوبت‌های رزرو شده در به نوبت
      </p>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
        <div>
          <p className="text-xl font-semibold">130,000+</p>
          <p className="text-sm text-gray-600">کسب و کارهای شریک</p>
        </div>
        <div>
          <p className="text-xl font-semibold">14 استان</p>
          <p className="text-sm text-gray-600">با استفاده از به نوبت</p>
        </div>
        <div>
          <p className="text-xl font-semibold">450,000+</p>
          <p className="text-sm text-gray-600">استایلیست‌ها و متخصصان</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
