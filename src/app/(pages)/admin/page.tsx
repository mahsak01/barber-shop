import { BsGraphUpArrow } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

const appointments = [
  {
    day: "18",
    month: "Oct",
    dateText: "Sat, 18 Oct 2025 10:15",
    status: "Booked",
    service: "Hair Color",
    details: "Walk-In, 1h 15min with Atefeh",
  },
  {
    day: "17",
    month: "Oct",
    dateText: "Fri, 17 Oct 2025 10:00",
    status: "Booked",
    service: "Haircut",
    details: "Walk-In, 45min with Atefeh",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="فروش های اخیر">
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <BsGraphUpArrow size={40} />
          <p className="font-semibold">فروشی برای هفت روز اخیر ثبت نشده است</p>
        </div>
      </Card>
      <Card title="شیفت های آینده">
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <IoStatsChart size={40} />
          <p className="font-semibold">شیفتی برای هفت روز آینده وجود ندارد.</p>
          <p className="text-sm">
            برای نمایش داده‌های برنامه، چند شیفت ثبت کنید.
          </p>
        </div>
      </Card>
      <Card title="نوبت‌های آینده">
        <div className="flex flex-col items-center justify-center  gap-4 text-center ">
          <IoMdTime size={40} />
          <p className="font-semibold">نوبتی برای هفت روز آینده وجود ندارد.</p>
          <div className=" w-full">
            {appointments.map((a, index) => (
              <>
                <div key={index} className="flex gap-4 p-4">
                  {/* Date */}
                  <div className="text-center w-12">
                    <div className="text-xl font-semibold text-gray-900">
                      {a.day}
                    </div>
                    <div className="text-sm text-gray-500">{a.month}</div>
                  </div>

                  {/* Details */}
                  <div className=" ">
                    <div className="flex   gap-2 text-sm text-gray-500">
                      <span>{a.dateText}</span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {a.status}
                      </span>
                    </div>
                    <div className="text-gray-900 font-semibold mt-1">
                      {a.service}
                    </div>
                    <div className="text-gray-500 text-sm">{a.details}</div>
                  </div>
                </div>
                <hr className="border-neutral-200" />
              </>
            ))}
          </div>
        </div>
      </Card>
      <Card title="سرویس های برتر">
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <MdMiscellaneousServices size={40} />
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="font-semibold py-2">سرویس</th>
                <th className="font-semibold py-2">ماه جاری</th>
                <th className="font-semibold py-2">ماه گذشته</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">Haircut</td>
                <td className="py-2">2</td>
                <td className="py-2">0</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">Blow Dry</td>
                <td className="py-2">1</td>
                <td className="py-2">0</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-2">Hair Color</td>
                <td className="py-2">1</td>
                <td className="py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="برترین عضو">
        <div className="flex flex-col items-center justify-center  gap-4 text-center text-gray-500">
          <BsGraphUpArrow size={40} />
          <p className="font-semibold">این ماه فروشی وجود ندارد.</p>
          <p className="text-sm">
            برای نمایش داده‌های برنامه، چند شیفت ثبت کنید.
          </p>
        </div>
      </Card>
    </div>
  );
}
