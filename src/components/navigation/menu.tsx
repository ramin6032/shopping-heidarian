import Image from "next/image";
import logo from "src/assets/svg/logo.svg";

const items = [
  {
    label: "صفحه اصلی",
    key: "home",
    hover: false,
  },
  {
    label: "دخترانه",
    key: "girls",
  },
  {
    label: "پسرانه",
    key: "boys",
  },
  {
    label: "نوزادی",
    key: "kids",
  },
];

const MenuBar: React.FC<any> = ({ setCurrent, current }) => {
  return (
    <nav className="d-flex user-select-none border-bottom">
      {items.map((menu: { key: string; label: string; hover?: boolean }) => (
        <span
          className="p-3"
          key={menu?.key}
          onMouseOver={() => setCurrent(menu?.key)}
          style={{
            fontWeight:
              current === menu?.key && menu?.hover !== false ? "500" : "",
          }}
        >
          {menu?.label}
        </span>
      ))}
    </nav>
  );
};

export default MenuBar;
