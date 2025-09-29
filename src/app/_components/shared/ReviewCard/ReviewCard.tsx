import { IoIosStar } from "react-icons/io";
import { CommentsDataType } from "../../pages/home/Reviews/_api/reviews.types";
import Image from "next/image";

const ReviewCard = ({ data }: { data: CommentsDataType }) => {
  return (
    <div className="max-w-xs h-full flex flex-col justify-between bg-neutral-100 shadow-md rounded-lg p-6 text-neutral-11 ">
      <div>
        <div className="flex mb-4">
          {[...Array(Math.ceil(+data?.score || 3))].map((_, i) => (
            <IoIosStar key={i} className="w-4 h-4" />
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">{data?.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{data?.comment}</p>
      </div>
      <div className="flex items-center mt-auto">
        {data?.avatar === "0" ? (
          <Image // Placeholder image
            src={`/images/placeholder/man.png`}
            alt="placeholder"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10 rounded-full object-cover mr-3"
          />
        ) : (
          <Image
            src={`https://be-nobat.ir/images/users/${data?.UserID}.jpg`}
            alt="placeholder"
            width={40}
            height={40}
            className="w-10 h-10 min-w-10 rounded-full object-cover mr-3"
          />
        )}
        <div>
          <p className="text-sm font-medium">{data?.name}</p>
          {/* Todo: uncomment when api got ready */}
          {/* <p className="text-sm text-gray-500">تهران</p> */}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
