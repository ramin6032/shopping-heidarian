import React from "react";
import { Button } from "antd";
import { Sort } from "src/lib/icons";

const SortBy: React.FC = () => {
  return (
    <>
      <div className="d-flex user-select-none border-bottom pb-1 align-items-end ">
        <Sort style={{ fontSize: "22px" }} />
        <label style={{ fontSize: "13px" }} className="fw-medium me-2">
          مرتب سازی:
        </label>
        <Button type="text" size="small">
          پربازدیدترین
        </Button>
        <Button type="text" size="small">
          جدیدترین
        </Button>
        <Button type="text" size="small">
          پرفروش‌ ترین‌
        </Button>
        <Button type="text" size="small">
          ارزان ترین‌
        </Button>
        <Button type="text" size="small">
          گران ترین‌
        </Button>
      </div>
    </>
  );
};

export default SortBy;
