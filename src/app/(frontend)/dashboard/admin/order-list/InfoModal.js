"use client";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/components/context";
import Form from "next/form";
import { bkashSearch } from "./action";
import SubmitButton from "@/lib/components/SubmitButton";
import Image from "next/image";

const InfoModal = ({ value }) => {
  let ref = useRef();
  let [loading, setLoading] = useState(false);
  let [paymentInfo, setpaymentInfo] = useState("");
  let clientAction = async () => {
    setLoading(true);
    let data = await bkashSearch(value?.trxn_id);
    setLoading(false);
    if (data?.success) {
      // Swal.fire("Success", data?.message, "success");
      // toast.success(data?.message);
      setpaymentInfo(data?.result);
    } else {
      // Swal.fire("Error", data?.message, "error");
      toast.error(data?.message);
    }
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        disabled={loading}
        className="btn btn-link text-blue-600 "
        onClick={() => ref.current.showModal()}
        // onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        {loading ? "Submitting" : value?.title}
      </button>
      <dialog ref={ref} id="my_modal_1" className="modal">
        <div className="modal-box max-w-full w-100">
          <div className="">
            <h3 className="text-lg font-bold">Payment Info</h3>

            <Form action={clientAction}>
              <div className="mt-3">
                <SubmitButton title={"View details"} design={"btn-accent"} />
              </div>
            </Form>
            <p> {JSON.stringify(paymentInfo)} </p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              {/* if there is a button in form, it will close the modal */}
              <button type="submit" className="btn btn-error">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InfoModal;
