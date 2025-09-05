import { CloseOutlined } from "@ant-design/icons";
import "./_customDrawerHeader.css";

type CustomDrawerHeaderProps = {
  closeDrawerHandler: () => void;
  title?: string;
  hasLeftSide?: boolean;
  hasRightSide?: boolean;
  isStickyTop?: boolean;
  leftSideContent?: React.ReactNode;
  rightSideContent?: React.ReactNode;
};
const CustomDrawerHeader = ({
  closeDrawerHandler,
  title,
  hasLeftSide = true,
  leftSideContent,
  hasRightSide = false,
  rightSideContent,
  isStickyTop = true,
}: CustomDrawerHeaderProps) => {
  return (
    <>
      <div
        className={`header-drawer-container ${isStickyTop ? "drawer-header-sticky-top" : ""}`}
      >
        {hasLeftSide && <div className="left-side">{leftSideContent}</div>}

        <div className="right-side">
          <div className="close-icon-container" onClick={() => closeDrawerHandler()}>
            <CloseOutlined style={{ color: "#777" }} />
          </div>
          <div className="right-side-title-contain">{title}</div>
        </div>
        {hasRightSide && <div >{rightSideContent}</div>}
      </div>
      {/* // Todo[saman]: old version */}
      {/* <CustomDivider /> */}
    </>
  );
};

export default CustomDrawerHeader;
