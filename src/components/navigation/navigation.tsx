import { useState } from "react";
import DropDown from "./dropDown";
import Menu from "./menu";
import NotificationBar from "./notificationBar";

export default function Navigation() {
  const [current, setCurrent] = useState("");
  return (
    <>
      <NotificationBar />
      <Menu current={current} setCurrent={setCurrent} />
      <DropDown current={current} onMouseLeave={() => setCurrent("")} />
    </>
  );
}
