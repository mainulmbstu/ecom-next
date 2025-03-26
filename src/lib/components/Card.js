import Image from "next/image";
import React from "react";
import getBase64 from "@/lib/helpers/plaiceholder";
import Link from "next/link";
import { getCookieValue } from "../helpers/helperFunction";
import { getTokenData } from "../helpers/getTokenData";
import PriceFormat from "./PriceFormat";
import { MdStar } from "react-icons/md";

const Card = async ({ item }) => {
  let charLimit = 30;
  let userInfo = await getTokenData(await getCookieValue("token"));
  let blurData = await getBase64(item?.picture[0]?.secure_url);
  return (
    <div className="h-full">
      <div className="card shadow-xl h-full flex flex-col">
        <figure className=" h-40 md:max-h-80 relative">
          <Image
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            blurDataURL={blurData}
            placeholder="blur"
            className=" object-contain"
            src={item?.picture[0]?.secure_url}
            alt=""
          />{" "}
        </figure>
        <div className="relative">
          <h4 className="">{item?.name}</h4>
          <div
            className={
              item?.offer
                ? "offerDisc p-3 text-white text-center bg-red-500 animate-pulse absolute right-0 top-[-10px] rounded-full"
                : "hidden"
            }
          >
            <h6 className="size-font">Off {item?.offer}%</h6>
            <h6 className="size-font">
              {<PriceFormat price={(item?.price * item?.offer) / 100} />}
            </h6>
          </div>
          <div className="relative">
            <p className="m-0">Category: {item?.category?.name}</p>
            <p className={item?.offer ? "line-through " : "mb-1"}>
              Price: {<PriceFormat price={item?.price} />}{" "}
            </p>
            <p
              className={item?.offer ? "mb-2 text-red-500  text-lg" : "hidden"}
            >
              <span className={"text-danger"}>
                Offer Price:{" "}
                {
                  <PriceFormat
                    price={item?.price - (item?.price * item?.offer) / 100}
                  />
                }
              </span>{" "}
            </p>
            <p className="m-0 ">
              <span className="p-1 text-white bg-green-600">
                Rating: {item?.rating?.toFixed(1)}
                <MdStar className=" text-red-500 inline mx-2" />(
                {item?.ratingNo})
              </span>{" "}
            </p>
            <p className="m-0">
              Description: {item?.description.substring(0, charLimit)}{" "}
              {item?.description?.length > charLimit ? "..." : ""}
            </p>
          </div>
        </div>

        <div className="mt-auto flex justify-between">
          <Link
            className="btn btn-primary "
            href={`/products/details/${item._id}?name=${
              item.name
            }&description=${item.description?.substring(0, 300)}`}
          >
            Viw Details
          </Link>
          <div
            className={
              item?.user?._id == userInfo?._id || userInfo?.role === "admin"
                ? ""
                : "hidden"
            }
          >
            {/* <DeleteModal
              value={{
                id: item?._id.toString(),
                message: `Do you want to delete ${item?.name}`,
                // action: deletePostAction,
                // redirect: "/",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
