import React from "react";
import Image from "next/image";
import pic1 from "src/assets/images/pic1.jpg";
import pic2 from "src/assets/images/pic2.jpg";
import pic3 from "src/assets/images/pic3.jpg";

const Category: React.FC = () => {
  return (
    <div className="row g-3 p-1">
      <div className="col">
        <div className="categoryCoverContainer rounded">
          <Image src={pic1} alt="pic" className="cover" />
          <p className="subtitle">بلیز شلوار</p>
        </div>
      </div>
      <div className="col">
        <div className="categoryCoverContainer rounded">
          <Image src={pic2} alt="pic" className="cover" />
          <p className="subtitle">هودی</p>
        </div>
      </div>
      <div className="col">
        <div className="categoryCoverContainer rounded">
          <Image src={pic3} alt="pic" className="cover" />
          <p className="subtitle">سرهمی</p>
        </div>
      </div>
      <div className="col">
        <div className="categoryCoverContainer rounded">
          <Image src={pic1} alt="pic" className="cover" />
          <p className="subtitle">سویشرت</p>
        </div>
      </div>
      <div className="col">
        <div className="categoryCoverContainer rounded">
          <Image src={pic2} alt="pic" className="cover" />
          <p className="subtitle">شومیز</p>
        </div>
      </div>
      <div className="col">
        <div className="categoryCoverContainer rounded">
          <Image src={pic3} alt="pic" className="cover" />
          <p className="subtitle">تخفیف ویژه</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
