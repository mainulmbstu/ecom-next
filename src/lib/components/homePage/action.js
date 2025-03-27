"use server";

import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { CategoryModel } from "@/lib/models/categoryModdel";
import { ProductModel } from "@/lib/models/productModel";

//===========================================================
export const allProductAction = async (keyword, page = 1, perPage) => {
  let skip = (page - 1) * perPage;
  // let limit = page * perPage;
  try {
    await dbConnect();
    // let author = await UserModel.find({
    //   name: { $regex: keyword, $options: "i" },
    // });
    // let authIdArr = author?.length && (await author.map((item) => item._id));
    const total = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        // { user: authIdArr?.length && authIdArr },
      ],
    });
    const list = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        // { user: authIdArr?.length && authIdArr },
      ],
    })
      .populate("category", "name", CategoryModel)
      // .populate({ path: "category", select: "name", model: CategoryModel })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return { list, total: total?.length };
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
};
