import {
  WorkersScheduleDataType,
  WorkersScheduleRecordsType,
} from "@/app/(pages)/admin/workers/_api/workersList.types";
import Image from "next/image";

const WorkersScheduleTableModel = ({
  datesList,
}: {
  datesList: {
    weekday: string;
    month: string;
    day: number;
  }[];
}) => [
  {
    title: <span className="font-semibold">اعضای تیم</span>,
    dataIndex: "fname",
    key: "fname",
    width: 200,
    render: (value: string, record: WorkersScheduleRecordsType) => (
      <div className="flex items-center gap-2">
        {record?.avatar === 0 ? (
          <Image // Placeholder image
            src={`/images/placeholder/man.png`}
            alt="placeholder"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10 rounded-full object-cover mr-3"
          />
        ) : (
          <Image
            src={`https://be-nobat.ir/images/users/${record?.worker_id}.jpg`}
            alt="placeholder"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10 rounded-full object-cover mr-3"
          />
        )}
        <div className="flex flex-col">
          <span>
            {value} {record.lname}
          </span>
          <span className="text-xs text-gray-500">{record.weekly_hours}</span>
        </div>
      </div>
    ),
  },
  ...datesList.map((date, index) => ({
    title: (
      <div className="text-center">
        <div className="font-semibold">
          {date?.weekday} {date?.day} {date?.month}
        </div>
      </div>
    ),
    dataIndex: "schedule",
    key: "schedule",
    width: 150,
    render: (value: WorkersScheduleDataType[]) => {
      console.log({ x: value[index] });

      return value ? (
        <div className="flex flex-col gap-1">
          {value[index].shifts?.map((shift) => (
            <div className="bg-info-200 rounded-md py-1 text-center">
              {shift.start.slice(0, 5)} - {shift.end.slice(0, 5)}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-neutral-50 text-center">—</div>
      );
    },
  })),
];

export default WorkersScheduleTableModel;
