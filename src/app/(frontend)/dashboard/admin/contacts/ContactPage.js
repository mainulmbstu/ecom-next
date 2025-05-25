"use client";
import { useAuth } from "@/lib/components/context";
import SubmitButton from "@/lib/components/SubmitButton";
import Form from "next/form";
import toast from "react-hot-toast";
import { contactAction } from "./action";
import moment from "moment";

const ContactPage = () => {
  let { userInfo } = useAuth();
  let clientAction = async (formData) => {
    let data = await contactAction(formData);
    if (data?.success) {
      // Swal.fire("Success", data?.message, "success");
      toast.success(data?.message);
    } else {
      // Swal.fire("Error", data?.message, "error");
      toast.error(data?.message);
    }
  };
  return (
    <div>
      <div className="my-3">
        <Form action={"/dashboard/admin/contacts"}>
          <div className="join">
            <div className="">
              <input
                name="keyword"
                type="search"
                className="input input-bordered join-item"
                placeholder="email"
              />
            </div>
            <div className="">
              <SubmitButton title={"Search"} design={"btn join-item"} />
            </div>
          </div>
        </Form>
      </div>
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
                <h5>
                  Name: {item.name} ({moment(item?.createdAt).fromNow()},
                  {moment(item?.createdAt).format("DD-MM-YY hh:mm a")})
                </h5>
                <p>email: {item.email} </p>
                <p>Message: {item.message} </p>

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
    </div>
  );
};

export default ContactPage;
