export const dynamic = "force dynamic";

// import { Suspense } from "react";
// import Skeleton from "@/lib/components/Skeleton";
// import Home1 from "./Home1";

import * as motion from "motion/react-client";

import Pagination from "@/lib/components/pagination";
import Form from "next/form";
// import { allProductAction } from "./action";
import { Axios } from "@/lib/helpers/AxiosInstance";
import Card from "@/lib/components/Card";

const Home = async ({ searchParams }) => {
  let spms = await searchParams;
  let keyword = (await spms["keyword"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "30");

  // let data = await allProductAction(keyword, page, perPage);
  let { data } = await Axios.get(
    `/api/user/product?keyword=${keyword}&page=${page}&perPage=${perPage}`
  );
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
                placeholder="Title or Author name"
              />
            </div>
            <div className="">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </Form>
      </div>
      <h5>Total product found {data?.total} </h5>
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

export default Home;

// const Home = async ({ searchParams }) => {
//   return (
//     <Suspense fallback=<Skeleton />>
//       <Home1 searchParams={searchParams} />
//     </Suspense>
//   );
// };

// export default Home;
