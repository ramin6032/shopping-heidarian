"use client";
import ThumbsGallery from "src/components/introduce/thumbsGallery/thumbsGallery";
import Specifications from "./specifications/specifications";
import Navigation from "../navigation/navigation";
import Tabs from "./tabs/tabs";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "src/server/actions";

export default function Introduce({ id }) {
  const { data } = useQuery({ queryKey: ["product"], queryFn: getProduct(id) });
  return (
    <>
      {/* <Navigation /> */}
      <div className="container-xl">
        <div className="d-flex justify-content-center py-3 gap-5 ">
          <ThumbsGallery />
          <Specifications product={data} />
        </div>
        {/* <Tabs /> */}
      </div>
    </>
  );
}
