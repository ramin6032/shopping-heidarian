"use client";
import ThumbsGallery from "src/components/introduce/thumbsGallery/thumbsGallery";
import Specifications from "./specifications/specifications";
import Navigation from "../navigation/navigation";
import Tabs from "./tabs/tabs";

export default function Introduce() {
  return (
    <>
      <Navigation />
      <div className="container-xl">
        <div className="d-flex justify-content-center py-3 gap-5 ">
          <ThumbsGallery />
          <Specifications />
        </div>
        {/* <Tabs /> */}
      </div>
    </>
  );
}
