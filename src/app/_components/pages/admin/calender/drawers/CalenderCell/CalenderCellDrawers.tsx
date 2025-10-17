import CustomDrawer from "@/app/_components/core/antdComponents/CustomDrawer/CustomDrawer";
import React from "react";

const CalenderCellDrawers = ({ drawerOpen, closeDrawerHandler }) => {
  return (
    <CustomDrawer
      open={drawerOpen.isOpen}
      onClose={closeDrawerHandler}
      width="50%"
    >
      {drawerOpen}
    </CustomDrawer>
  );
};

export default CalenderCellDrawers;
