import * as motion from "motion/react-client";

import Pagination from "@/lib/components/pagination";
import Form from "next/form";
import Loadmore from "@/lib/components/Loadmore";
import { allProductAction } from "./action";
import Card from "../card/Card";
import HomeCatPage from "./HomeCatPage";
import Link from "next/link";

const Home1 = async ({ searchParams }) => {
  let spms = await searchParams;
  let keyword = (await spms["keyword"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "30");

  let data = await allProductAction(keyword, page, perPage);
  // console.log(data);
  // let res = await fetch(
  //   `${process.env.BASE_URL}/api/user/product?keyword=${keyword}&page=${page}&perPage=${perPage}`
  // );
  // let data = await res.json();
  let entries = data?.list;
  return (
    <div className="p-2">
      <div className="my-3">
        <Form action={"/"}>
          <div className="join">
            <div className="">
              <input
                defaultValue={keyword}
                name="keyword"
                type="search"
                className="input input-bordered join-item"
                placeholder="name or description"
              />
            </div>
            <div className="">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </Form>
      </div>
      <HomeCatPage />
      <hr />
      <div className={!data?.offerList?.length || keyword ? "hidden" : ""}>
        <h4 className="ps-2">Special Offer</h4>
        <div className=" grid md:grid-cols-4 gap-6">
          {data?.offerList?.length ? (
            data?.offerList.map((item) => (
              <motion.div
                key={item._id}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Card item={item} />
              </motion.div>
            ))
          ) : (
            <p>No offer available</p>
          )}

          <div className="">
            <Link
              href={"/products/offers"}
              className="flex h-100 bg-black justify-center items-center hover:bg-gray-800"
            >
              <span className=" text-white text-3xl">All Offers</span>
            </Link>
          </div>
        </div>
      </div>

      <hr />
      <h4>Total product found {data?.total} </h4>
      <div className=" grid md:grid-cols-4 gap-6">
        {entries?.length ? (
          entries.map((item) => (
            <motion.div
              key={item._id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Card item={item} />
            </motion.div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
      {/* <Loadmore
        total={data?.total}
        page={page}
        perPage={perPage}
        spms1="keyword"
        spms1Value={keyword}
      /> */}
      <div className=" mt-3 ">
        <Pagination
          total={data?.total}
          page={page}
          perPage={perPage}
          spms1="keyword"
          spms1Value={keyword}
        />{" "}
      </div>
    </div>
  );
};

export default Home1;
