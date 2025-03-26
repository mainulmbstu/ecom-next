import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import dbConnect from "@/lib/helpers/dbConnect";
import { uploadOnCloudinary } from "@/lib/helpers/cloudinary";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/helperFunction";
import { ProductModel } from "@/lib/models/productModel";

export async function POST(req) {
  let formData = await req.formData();

  let userInfo = await getTokenData(await getCookieValue("token"));
  let name = formData.get("name");
  let category = formData.get("category");
  let price = formData.get("price");
  let offer = formData.get("offer") || 0;
  let quantity = formData.get("quantity");
  let color = formData.get("color");
  let description = formData.get("description");
  if (!name || !category || !price || !quantity || !description) {
    return Response.json({ message: "All fields are required" });
  }
  let files = formData.getAll("file");
  try {
    await dbConnect();
    let url;
    if (files[0]?.size) {
      url = [];
      for (let file of files) {
        let { secure_url, public_id } = await uploadOnCloudinary(
          file,
          "ecomNextProduct"
        );
        url = [...url, { secure_url, public_id }];
      }
    }

    let cArr = [];
    if (color) {
      cArr = await color.split(",");
    }
    let product = new ProductModel();

    product.name = name;
    product.slug = slugify(name);
    product.category = category;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.user = userInfo?._id;
    if (offer) product.offer = offer;
    if (color) product.color = cArr;
    if (url) product.picture = url;

    await product.save();
    revalidatePath("/", "layout"); // layout means 'path/*'
    // revalidatePath("/post/category/[category]", 'page');  // // page means 'exact path'

    return Response.json({
      success: true,
      message: `Product  created successfully `,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: await getErrorMessage(error) });
  }
}
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

    const productList = await ProductModel.find({
      $or: [{ name: { $regex: keyword, $options: "i" } }],
    })
      .populate("user", "name")
      .populate("category", "name")
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return Response.json({ productList, total: total?.length });
  } catch (error) {
    console.log(error);
    return { message: await getErrorMessage(error) };
  }
}
