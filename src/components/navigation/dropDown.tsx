import React from "react";
import { List, Tabs } from "antd";
import { useAppSelector } from "src/lib/redux/hooks";
import type { TabsProps } from "antd";
import Image from "next/image";
import pic from "src/assets/images/mega-menu-category-01.jpg";
import { NumberOfRowsInDesktopMenu } from "src/lib/consts";
import { submenu } from "src/lib/types";
import Link from "next/link";

const DropDown: React.FC<any> = ({ onMouseLeave, current }) => {
  const NumberOfRows = NumberOfRowsInDesktopMenu + 1;
  const subMenuColumns: submenu[][] = [];
  const column: submenu[] = [];
  const menu = useAppSelector((state) => state.web.menu);
  // const tabs = menu.

  const [currentMenu] = menu.filter((item) => item.key === current);
  currentMenu?.submenu?.forEach((submenu, index) => {
    if (index % NumberOfRows) {
      column.push(submenu);
    } else {
      subMenuColumns.push(column);
      column.splice(0, column.length);
    }
  });
  if (current)
    return (
      <section
        className="p-1 border rounded shadow position-absolute w-100 bg-light z-3"
        onMouseLeave={onMouseLeave}
      >
        <div className="d-flex flex-wrap justify-content-between p-3 dropDownMenu">
          <div className="d-flex gx-3">
            {subMenuColumns.map((item, index) => {
              const column = item;
              return (
                <div key={index} className="px-1" style={{ minWidth: "180px" }}>
                  {column.map((submenu) => (
                    <Link
                      key={submenu.key}
                      href={`/category/${submenu.category}`}
                      className="d-block py-2"
                    >
                      {submenu.label}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );

  return;
};

export default DropDown;
