import { Axios } from "@/lib/helpers/AxiosInstance";
import ContactPage from "./ContactPage";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/helperFunction";
import moment from "moment";
import Pagination from "@/lib/components/pagination";

export const metadata = {
  title: "Contact",
  description: "Contact page",
};

const Contact = async ({ searchParams }) => {
  let spms = await searchParams;
  let page = Number((await spms["page"]) ?? "1");
  let perPage = Number((await spms["perPage"]) ?? "12");
  let userInfo = await getTokenData(await getCookieValue("token"));
  let { data } = await Axios.get(
    `/api/user/contacts?keyword=${userInfo?.email}&page=${page}&perPage=${perPage}`
  );
  let contacts = data?.list;
  return (
    <div>
      <ContactPage />
      <h4>Message history</h4>
      <div>
        {contacts?.length &&
          contacts.map((item, i) => {
            return (
              <div
                key={item._id}
                className={` border p-2 px-3 ${
                  i % 2 ? " bg-zinc-200" : "bg-white"
                }`}
              >
                <p>
                  <b>You:</b> ({moment(item?.createdAt).fromNow()},
                  {moment(item?.createdAt).format("DD-MM-YY hh:mm a")})
                </p>
                <p>Message: {item.message} </p>
                <p>
                  Time: ({moment(item?.createdAt).fromNow()},
                  {moment(item?.createdAt).format("DD-MM-YY hh:mm a")})
                </p>

                <hr className=" w-25" />
                <h5>{item?.replies?.length ? "An Admin" : "No reply yet"}</h5>
                {item?.replies &&
                  item?.replies?.reverse().map((rep, i, arr) => {
                    return (
                      <div key={i}>
                        <p className=" font-bold">
                          Reply-{arr?.length - i}: {rep.msg}
                        </p>
                        <p>
                          Time: {moment(rep?.date).fromNow()},
                          {new Date(rep?.date).toLocaleString()}{" "}
                        </p>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div className=" mt-3 ">
        <Pagination
          total={data?.total}
          page={page}
          perPage={perPage}
          spms1="keyword"
          spms1Value={userInfo?.email}
          spms2="userId"
          spms2Value={""}
        />
      </div>
    </div>
  );
};

export default Contact;
