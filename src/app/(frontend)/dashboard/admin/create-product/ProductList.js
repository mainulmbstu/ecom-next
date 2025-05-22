import moment from "moment";
import Pagination from "@/lib/components/pagination";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from "@/lib/components/DeleteModal";
import { deleteAction } from "./action";
import EditModal from "./EditModal";
import { Axios } from "@/lib/helpers/AxiosInstance";

const ProductList = async ({ searchParams }) => {
  let spms = await searchParams;
  let keyword = (await spms["keyword"]) ?? "";
  let category = (await spms["category"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "12");

  let res = await fetch(
    `${process.env.BASE_URL}/api/admin/product?keyword=${keyword}&category=${category}&page=${page}&perPage=${perPage}`
    // {
    //   cache: "force-cache",
    // }
  );
  let proddata = await res.json();
  let entries = proddata?.productList;

  let { data } = await Axios.get(`/api/both/category-list`);
  let catPlain = data?.categoryList;
  return (
    <div>
      <div className="my-3">
        <Form action="/dashboard/admin/create-product">
          <div className="join">
            <div className="">
              <input
                defaultValue={keyword}
                name="keyword"
                type="search"
                className="input input-bordered join-item"
                placeholder="Search"
              />
            </div>
            <div className="">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </Form>
      </div>
      <div className="my-3">
        <Form action="/dashboard/admin/create-product">
          <div className="join">
            <div className="">
              <input
                defaultValue={category}
                name="category"
                type="search"
                list="categoryList"
                className="input input-bordered join-item"
                placeholder="Search"
              />
              <datalist id="categoryList">
                {catPlain?.length &&
                  catPlain.map((item) => {
                    return <option key={item._id} value={item?.slug}></option>;
                  })}
              </datalist>
            </div>
            <div className="">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </Form>
      </div>

      <div className="">
        <h5> Total product: {proddata?.total} </h5>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Creator</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Offer</th>
              <th>Created Date</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries?.length ? (
              entries?.map((item) => (
                <tr key={item?._id} className="hover:bg-zinc-200">
                  <td>{item.name}</td>
                  <td>
                    <Link href={item.picture[0]?.secure_url} target="_blank">
                      <Image
                        priority={true}
                        className="w-8 h-auto"
                        width={30}
                        height="0"
                        src={item.picture[0]?.secure_url}
                        alt=""
                      />
                    </Link>
                  </td>
                  <td>{item.user?.name}</td>
                  <td>{item.category?.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.offer}</td>
                  <td>
                    {moment(new Date(item.createdAt)).format("DD-MM-YYYY")}
                  </td>

                  <td>
                    <EditModal
                      value={{
                        id: item._id.toString(),
                        name: item.name,
                        category: item.category?.name,
                        picture: item?.picture[0]?.secure_url,
                        price: item.price,
                        offer: item.offer,
                        quantity: item.quantity,
                        description: item.description,
                        color: item.color.toString(),
                      }}
                    />
                  </td>

                  <td>
                    <DeleteModal
                      value={{
                        id: item?._id.toString(),
                        message: `Do you want to delete ${item?.name}`,
                        action: deleteAction,
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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

export default ProductList;
