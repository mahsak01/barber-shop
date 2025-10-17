import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import { BiPencil } from "react-icons/bi";

function Field({ label, value }: { value: string; label: string }) {
  return (
    <div>
      <span className="block text-gray-500 mb-1">{label}</span>
      <span className="text-gray-800 text-sm">{value}</span>
    </div>
  );
}

export default function WorkerDetailDrawer() {
  return (
    <div className="max-w-2xl mx-auto  p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">اطلاعات شخصی</h1>
        <CustomButton className="flex items-center gap-2">
          <BiPencil className="h-4 w-4" /> ویرایش
        </CustomButton>
      </header>

      {/* Profile Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">پروفایل</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <Field label="نام" value="Atefeh Bakhshi" />
          <Field label="ایمیا" value="at.bakhshi1373@gmail.com" />
          <Field label="شماره همراه" value="+98 913 528 0252" />
          <Field label="تاریخ تولد" value="-" />
          <Field label="استان" value="-" />
          <div>
            <span className="block text-gray-500 mb-1">رنگ تقویم</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-300" />
              <span className="text-gray-800 text-sm">ابی</span>
            </div>
          </div>
          <Field label="عنوان شغلی" value="-" />
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* Work details */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">جزییات شغل</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <Field label="شروع کار از" value="October 2nd, 2025 - present" />
          <Field label="سطح دسترسی" value="-" />
          <Field label="آیدی" value="-" />
        </div>
      </section>
    </div>
  );
}
