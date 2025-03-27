import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import dbConnect from "@/lib/helpers/dbConnect";
import { ProductModel } from "@/lib/models/productModel";

//=============================
export async function GET(req) {
  let keyword = req.nextUrl.searchParams.get("keyword");
  let page = req.nextUrl.searchParams.get("page");
  let perPage = req.nextUrl.searchParams.get("perPage");
  let skip = (page - 1) * perPage;

  try {
    await dbConnect();
    const total = await ProductModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    });

    const list = await ProductModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    })
      // .populate("user", "name")
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return Response.json({ list, total: total?.length });
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
