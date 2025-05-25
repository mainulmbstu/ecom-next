"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { ContactModel } from "@/lib/models/ContactModel";
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
