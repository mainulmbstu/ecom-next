"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { OrderModel } from "@/lib/models/OrderModel";
import { revalidatePath } from "next/cache";
const {
  createPayment,
  executePayment,
  queryPayment,
  searchTransaction,
  refundTransaction,
} = require("bkash-payment");
export const StatusAction = async (value, id) => {
  try {
    await dbConnect();
    await OrderModel.findByIdAndUpdate({ _id: id }, { status: value });
    revalidatePath("/dashboard/admin/order-list");

    return {
      message: `Order has been successfully updated to ${value} `,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
//=======================================
const bkashConfig = {
  base_url: process.env.BKASH_BASE_URL,
  username: process.env.BKASH_USER,
  password: process.env.BKASH_PASSWORD,
  app_key: process.env.BKASH_APP_KEY,
  app_secret: process.env.BKASH_APP_SECRET,
};
export const bkashSearch = async (formData) => {
  try {
    let trxID = formData.get("trxID") || "undefine";
    await dbConnect();
    const result = await searchTransaction(bkashConfig, trxID);
    // revalidatePath("/dashboard/admin/order-list");

    return {
      result,
      message: `Order has been successfully updated to ${"value"} `,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
