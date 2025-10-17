"use client";
import CustomButton from "@/app/_components/core/antdComponents/CustomButton/CustomButton";
import CustomInput from "@/app/_components/core/antdComponents/CustomInput/CustomInput";
import { Badge, Dropdown, Space, Table } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { FiFilter } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  WorkersListDataType,
  WorkersListResult,
} from "@/app/(pages)/admin/workers/_api/workersList.types";
import { useWorkersList } from "@/app/(pages)/admin/workers/_api/workersList";
import WorkersListTableModel from "./models/workersListTableModel";
import CustomDrawer from "@/app/_components/core/antdComponents/CustomDrawer/CustomDrawer";
import WorkerDetailDrawer from "./drawers/WorkerDetailDrawer/WorkerDetailDrawer";

const WorkersListTab = () => {
  const [workersList, setWorkersList] = useState<WorkersListDataType[]>([]);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const router = useRouter();

  const { mutate: getWorkersList, isPending: isGetWorkersListLoading } =
    useWorkersList({
      onSuccess: WorkersListOnSuccess,
    });

  useEffect(() => {
    getWorkersList({
      owner_user_id: 8,
      salon_id: 1002,
    });
  }, []);

  function WorkersListOnSuccess(res: WorkersListResult) {
    setWorkersList(res?.data);
  }

  const openDetailDrawerHandler = (id: number) => {
    setDetailDrawerOpen({ id, isOpen: true });
  };
  const closeDetailDrawerHandler = () => {
    setDetailDrawerOpen({ id: -1, isOpen: false });
  };

  return (
    <>
      <div className="p-8 flex flex-col gap-8  bg-neutral-50">
        <div className="flex justify-between mb-4">
          <div className="flex gap-3 items-center">
            <h2 className="text-xl font-semibold">اعضای تیم</h2>
            <Badge count={3} color="#bdbdbd" />
          </div>
          <Space>
            <Dropdown
              menu={{
                items: [
                  {
                    label: "1st menu item",
                    key: "1",
                  },
                ],
              }}
            >
              <CustomButton>
                <Space>
                  گزینه‌ها
                  <DownOutlined />
                </Space>
              </CustomButton>
            </Dropdown>
            <CustomButton
              type="primary"
              onClick={() => {
                router.push("/admin/add-worker");
              }}
            >
              اضافه کردن
            </CustomButton>
          </Space>
        </div>
        <div className="flex justify-between bg-neutral-100 rounded-md p-4  ">
          <CustomInput
            prefix={<SearchOutlined />}
            placeholder="جستجو اعضای تیم"
            className="w-64"
          />
          <CustomButton icon={<FiFilter />}>فیلترها</CustomButton>
        </div>
        <Table
          rowKey="ID"
          columns={WorkersListTableModel({
            detailDrawerHandler: openDetailDrawerHandler,
          })}
          dataSource={workersList}
          pagination={false}
        />
      </div>
      <CustomDrawer
        open={detailDrawerOpen.isOpen}
        onClose={closeDetailDrawerHandler}
        width="50%"
      >
        <WorkerDetailDrawer />
      </CustomDrawer>
    </>
  );
};

export default WorkersListTab;
