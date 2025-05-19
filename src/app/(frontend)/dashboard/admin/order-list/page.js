import moment from "moment";
import Pagination from "@/lib/components/pagination";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from "@/lib/components/DeleteModal";
import { deleteAction } from "./deleteAction";
import Status from "./status";
import PriceFormat from "@/lib/components/PriceFormat";
import ClientPage from "./clientPage";
import { bkashSearch } from "./action";
import SubmitButton from "@/lib/components/SubmitButton";

export const metadata = {
  title: "Order List",
  description: "Order List page",
};
const Orders = async ({ searchParams }) => {
  let spms = await searchParams;
  let keyword = (await spms["keyword"]) ?? "";
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "12");
  // let start=(Number(page)-1)*Number(perPage)

  // let userList = await userListAction(keyword);
  let res = await fetch(
    `${process.env.BASE_URL}/api/both/order-list?keyword=${keyword}&page=${page}&perPage=${perPage}`
  );
  let data = await res.json();
  // let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  let entries = data?.orderList;
  let mmm = async (formData) => {
    let data = await bkashSearch(formData);
    console.log(data);
  };
  return (
    <div>
      <div className="my-3">
        <Form action={"/dashboard/admin/order-list"}>
          <div className="join">
            <div className="">
              <input
                name="keyword"
                type="search"
                className="input input-bordered join-item"
                placeholder="Name or Email"
              />
            </div>
            <div className="">
              <button className="btn join-item">Search</button>
            </div>
          </div>
        </Form>
      </div>
      <div className=" card p-2 mt-5">
        <h4>
          Total Orders: ({data?.total} of {data?.total})
        </h4>
        {/* <h4>Total Sale: {<PriceFormat price={totalPrice} />}</h4> */}
      </div>
      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Status</th>
              <th scope="col">User-email</th>
              <th scope="col">User-Address</th>
              <th scope="col">Payment</th>
              <th scope="col">Item</th>
              <th scope="col">Total Price</th>
              <th scope="col">Time</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Print</th>
              <th scope="col">Search</th>
              <th scope="col">Query</th>
              <th scope="col">Refund</th>
            </tr>
          </thead>
          <tbody>
            {entries?.length ? (
              entries?.map((item, i) => (
                <tr key={item?._id} className="hover:bg-zinc-200">
                  {/* <td>
                    <Link href={item.picture?.secure_url} target="_blank">
                      <Image
                        priority={true}
                        className="w-8 h-auto"
                        width={30}
                        height="0"
                        src={item.picture?.secure_url}
                        alt=""
                      />
                    </Link>
                  </td> */}
                  <td>{i + 1} </td>
                  <td>
                    <Status status={item.status} id={item._id.toString()} />
                  </td>
                  <td>{item?.user?.email} </td>
                  <td>{item?.user?.address} </td>
                  <td>
                    {item?.payment?.refund === "refunded"
                      ? "Refunded"
                      : item?.payment?.status === true
                      ? "Success"
                      : "Failed"}
                  </td>
                  <td>{item?.products?.length} </td>
                  <td>{<PriceFormat price={item.total} />} </td>
                  <td>{moment(item?.createdAt).fromNow()} </td>
                  <td>{item?.payment?.payment_id ? "Bkash" : "SSL"} </td>
                  <td>
                    <ClientPage item={item} />
                  </td>
                  <td>
                    <Form action={bkashSearch}>
                      <input
                        className="hidden"
                        name="trxID"
                        type="text"
                        defaultValue={item.payment?.trxn_id}
                      />
                      <SubmitButton
                        title={"Search"}
                        design={"btn-accent w-22"}
                      />
                    </Form>
                    {/* <button
                      onClick={() => {
                        item?.payment?.payment_id
                          ? searchBkash(item)
                          : searchSSL(item);
                      }}
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#paymentAll"
                      disabled={item?.payment?.refund === "refunded"}
                    >
                      search
                    </button> */}
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

export default Orders;
