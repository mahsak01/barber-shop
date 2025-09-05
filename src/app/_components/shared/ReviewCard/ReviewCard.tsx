import { IoIosStar } from "react-icons/io";
import { CommentsDataType } from "../../pages/home/Reviews/_api/reviews.types";

const ReviewCard = ({ data }: { data: CommentsDataType }) => {
  return (
    <div className="max-w-xs h-full flex flex-col justify-between bg-neutral-100 shadow-md rounded-lg p-6 text-neutral-11 ">
      <div>
        <div className="flex mb-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <IoIosStar size={20} />
            ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">
          عالی برای پیدا کردن آرایشگر
        </h3>
        <p className="text-sm text-gray-600 mb-4">{data?.comment}</p>
      </div>
      <div className="flex items-center mt-auto">
        <img
          className="w-10 h-10 rounded-full mr-3"
          src="https://randomuser.me/api/portraits/women/75.jpg" // Placeholder image
          alt="Lucy"
        />
        <div>
          <p className="text-sm font-medium">{data?.name}</p>
          <p className="text-sm text-gray-500">تهران</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
