"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/helperFunction";
import { CommentModel } from "@/lib/models/CommentModel";
import { ContactModel, ContactReplyModel } from "@/lib/models/ContactModel";
import { ProductModel } from "@/lib/models/productModel";
import { revalidatePath } from "next/cache";

//===========================================================
export const contactAction = async (formData) => {
  let name = formData.get("name");
  let email = formData.get("email");
  let message = formData.get("message");
  try {
    await dbConnect();
    await ContactModel.create({ name, email, message });
    revalidatePath("/", "layout");
    return {
      success: true,
      message: `message has been sent successfully`,
    };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
//=====================================
export const replyAction = async (cid, formData) => {
  let reply = formData.get("reply");
  let userInfo = await getTokenData(await getCookieValue("token"));
  console.log(reply);
  try {
    await dbConnect();
    let findmsg = await ContactModel.findById(cid);
    await ContactReplyModel.create({
      email: findmsg?.email,
      reply,
      msgId: findmsg?._id,
      user: userInfo?._id,
    });
    let destructure = [...findmsg.replies];
    findmsg.replies = [
      ...destructure,
      { userName: userInfo?.name, msg: reply, date: Date.now() },
    ];
    await findmsg.save();
    revalidatePath("/", "layout");
    return { success: true, message: "Replied successfully" };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
