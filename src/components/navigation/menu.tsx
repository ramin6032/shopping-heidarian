import Image from "next/image";
import logo from "src/assets/svg/logo.svg";
import { useAppSelector } from "src/lib/redux/hooks";
import type { menu } from "src/lib/types";
import { Button, Input } from "antd";
import { Search } from "src/lib/icons";

const items = [
  {
    label: "صفحه اصلی",
    key: "home",
  },
  {
    label: "بهاره",
    key: "spring",
  },
  {
    label: "تابستانه",
    key: "summer",
  },
  {
    label: "پاییزه",
    key: "fall",
  },
  {
    label: "زمستانه",
    key: "winter",
  },
  {
    label: "مجلسی",
    key: "party",
  },
  {
    label: "عیدانه",
    key: "newYear",
  },
];

const MenuBar: React.FC<any> = ({ setCurrent, current }) => {
  const menu = useAppSelector((state) => state.web.menu);
  return (
    <nav className="d-flex flex-column">
      <div className="d-block py-1">
        <Input size="large" placeholder="جستجو" prefix={<Search />} />
      </div>
      <div>
        {menu.map((menu: menu) => (
          // <span
          //   className="p-3"
          //   key={menu?.key}
          //   onMouseOver={() => setCurrent(menu?.key)}
          //   style={{
          //     fontWeight:
          //       current === menu?.key && menu?.hover !== false ? "500" : "",
          //   }}
          // >
          //   {menu?.label}
          // </span>
          <Button
            size="large"
            key={menu.key}
            type="text"
            icon={menu.icon}
            onMouseOver={() => setCurrent(menu?.key)}
            style={{
              fontWeight: current === menu.key && menu.hover ? "500" : "",
            }}
          >
            {menu.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default MenuBar;
