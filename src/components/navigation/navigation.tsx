"use client";
import { useState } from "react";
import DropDown from "./dropDown";
import Image from "next/image";
import Logo from "src/assets/images/logo.png";
import { Shopping, User, Search } from "src/lib/icons";
import { FadeDown } from "src/lib/animation";

export default function Navigation() {
  const [current, setCurrent] = useState("");
  return (
    <header className="position-absolute top-0 z-3 w-100">
      <FadeDown>
        <div className="position-relative pt-3 mb-4">
          <div className="position-absolute d-flex justify-content-between gap-4 align-items-center pe-5">
            <Shopping style={{ fontSize: "26px" }} />
            <User style={{ fontSize: "26px" }} />
            <Search style={{ fontSize: "26px" }} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex gap-5 text-dark justify-content-between border-bottom pb-1 px-5 border-black">
              <span>دخترانه</span>
              <span>پسرانه</span>
              <span>نوزادی</span>
            </div>
            <Image
              src={Logo}
              alt="logo"
              style={{ width: "120px", height: "auto" }}
            />
            <div className="d-flex gap-5 text-dark justify-content-between border-bottom pb-1 px-5 border-black">
              <span>شال وکلاه</span>
              <span>اکسسوری</span>
              <span>مناسبتی</span>
            </div>
          </div>

          <DropDown current={current} onMouseLeave={() => setCurrent("")} />
        </div>
      </FadeDown>
    </header>
  );
}

{
  /* <div className="d-flex py-2 px-3 gap-3 shadow-sm z-4">
        <Menu current={current} setCurrent={setCurrent} />
      </div> */
}
