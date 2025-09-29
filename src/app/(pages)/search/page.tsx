"use client";
import ProductCard from "@/app/_components/shared/ProductCard/ProductCard";
import { Col, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchSalonList } from "./_api/searchResult";
import {
  SearchSalonDataType,
  SearchSalonListResult,
} from "./_api/searchResult.types";
const text = "آرایشگرها";

const SearchResult = () => {
  const [data, setData] = useState<SearchSalonDataType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { mutate: getSearchList, isPending: isSearchListLoading } =
    useSearchSalonList({
      onSuccess: searchListOnSuccess,
    });

  useEffect(() => {
    getSearchList({
      province: queryParams?.province ? queryParams?.province : "*",
      gender: queryParams?.genderId ? queryParams?.genderId : "*",
      city: queryParams?.city ? queryParams?.city : "*",
      service: queryParams?.service ? queryParams?.service : "*",
      date: queryParams?.date ? queryParams?.date : "*"
    });
  }, []);

  function searchListOnSuccess(res: SearchSalonListResult) {
    setData(res?.salon);
    setTotalCount(res?.total_count)
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <h3 className="flex gap-2 items-center">
        <span className="text-3xl font-semibold text-neutral-800">
          بهترین {text}
        </span>
        <span className="text-xl text-neutral-500 font-normal">({totalCount})</span>
      </h3>
      <div className="flex gap-2 items-center">
        {queryParams?.province && (
          <span className="px-4 py-1 text-sm text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-2xl ">
            {queryParams?.province}
          </span>
        )}
        {queryParams?.city && (
          <span className="px-4 py-1 text-sm text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-2xl ">
            {queryParams?.city}
          </span>
        )}
        {queryParams?.gender && (
          <span className="px-4 py-1 text-sm text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-2xl ">
            {queryParams?.gender}
          </span>
        )}
        {queryParams?.service && (
          <span className="px-4 py-1 text-sm text-neutral-600 border border-neutral-200 bg-neutral-100 rounded-2xl ">
            {queryParams?.service}
          </span>
        )}
      </div>
      {
        data?.length > 0 ? <Row gutter={[24, 24]}>
          {data.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} className="w-full" key={item?.ID}>
              <ProductCard data={item} />
            </Col>
          ))}
        </Row> : <div className="flex flex-col items-center justify-center p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m2 7H7a2 2 0 01-2-2V7a2 2 0 012-2h5l5 5v6a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-lg font-medium"> موردی برای نمایش وجود ندارد.</p>
        </div>
      }

    </div>
  );
};

export default SearchResult;



