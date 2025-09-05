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

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { mutate: getSearchList, isPending: isSearchListLoading } =
    useSearchSalonList({
      onSuccess: searchListOnSuccess,
    });

  useEffect(() => {
    getSearchList({
      gender: "0",
      date: "1404.06.07",
      province: "سمنان",
      city: "دامغان",
      service: "اصلاح ساده سر",
    });
    // getSearchList({
    //   gender: queryParams?.genderId,
    //   city: queryParams?.city,
    //   service: queryParams?.service,
    // });
  }, []);

  function searchListOnSuccess(res: SearchSalonListResult) {
    setData(res?.salon);
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      <h3 className="flex gap-2 items-center">
        <span className="text-3xl font-semibold text-neutral-800">
          بهترین {text}
        </span>
        <span className="text-xl text-neutral-500 font-normal">({253})</span>
      </h3>
      <div className="flex gap-2 items-center">
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
      <Row gutter={[24, 24]}>
        {data.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} className="w-full" key={item?.ID}>
            <ProductCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchResult;


