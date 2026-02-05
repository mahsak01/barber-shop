import { CommentsDataType } from "../../pages/home/Reviews/_api/reviews.types";
import Image from "next/image";

const ReviewCard = ({ data }: { data: CommentsDataType }) => {
  return (
<div className="max-w-xs min-h-[320px] flex flex-col justify-between bg-neutral-100 shadow-lg rounded-xl pt-6 px-6 pb-8 text-neutral-11">

      {/* Stars */}
      <div className="flex mb-4">
        {[...Array(Math.ceil(+data?.score || 3))].map((_, i) => (
           <span className="text-yellow-400 text-base">⭐</span>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{data?.title}</h3>
        <p className="text-sm text-gray-600">{data?.comment}</p>
      </div>

      {/* User info */}
      <div className="flex items-center justify-start mt-6">
       
        <Image
          src={
            data?.avatar === "0"
              ? "/images/placeholder/man.png"
              : `https://be-nobat.ir/images/users/${data?.UserID}.jpg`
          }
          alt="user avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
         <div className="text-right mr-4">
          <p className="text-sm font-medium">{data?.name}</p>
        </div>

      </div>
    </div>
  );
};

export default ReviewCard;
