"use client";
import { useEffect, useState } from "react";
import { useWorkerListBySalonServiceIdResultDetail } from "./_api/selectWorker";
import {
  WorkerDateBySalonServiceId,
  WorkerListBySalonServiceIdResult,
} from "./_api/selectWorker.types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const SelectWorker = () => {
  const [workerList, setWorkerList] = useState<WorkerDateBySalonServiceId[]>(
    []
  );

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const router = useRouter();

  const {
    mutate: getWorkerListBySalonServiceId,
    isPending: isGetWorkerListBySalonServiceIdLoading,
  } = useWorkerListBySalonServiceIdResultDetail({
    onSuccess: workerListBySalonServiceIdOnSuccess,
  });

  useEffect(() => {
    getWorkerListBySalonServiceId({
      salon_id: queryParams?.salonId,
      service_id: queryParams?.serviceId,
    });
  }, []);

  function workerListBySalonServiceIdOnSuccess(
    res: WorkerListBySalonServiceIdResult
  ) {
    setWorkerList(res?.service_workers);
  }

  const goToSelectTimePage = (workerId: string) => {
    router.push(
      `/select-time?salonId=${queryParams?.salonId}&serviceId=${queryParams?.serviceId}&workerId=${workerId}`
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">انتخاب متخصص</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workerList.map((worker) => (
          <div
            key={worker?.worker_id}
            className="border border-neutral-200 rounded-2xl cursor-pointer hover:bg-neutral-100 transition p-6 flex flex-col items-center text-center"
            onClick={() => goToSelectTimePage(worker?.worker_id)}
          >
            {worker?.worker_id ? (
              <Image
                src={`https://be-nobat.ir/images/users/${worker?.worker_id}.jpg`}
                alt={worker?.worker_name}
                width={117}
                height={117}
                className="w-28 h-28 min-w-28 rounded-full border border-neutral-200 object-cover"
              />
            ) : (
              <Image
                src={`/images/placeholder/man.png`}
                alt={worker?.worker_name}
                width={117}
                height={117}
                className="w-28 h-28 min-w-28 rounded-full object-cover"
              />
            )}

            <h3 className="text-lg font-semibold">{worker.worker_name}</h3>
            {/* Todo:uncomment when api got ready */}
            {/* {worker?.role && (
              <p className="text-sm text-gray-500">{worker?.role}</p>
            )}
            <p className="text-sm text-gray-500">{"worker?.role"}</p> */}

            {worker.worker_score && (
              <div className="flex items-center justify-center mt-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm font-medium">
                  {worker.worker_score}
                </span>
              </div>
            )}

            <p className="mt-2 text-gray-700 font-medium">
              از {worker.price} هزار تومان
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectWorker;
