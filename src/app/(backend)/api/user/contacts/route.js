import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { ContactModel } from "@/lib/models/ContactModel";

export async function GET(req) {
  let keyword = req.nextUrl.searchParams.get("keyword");
  let page = req.nextUrl.searchParams.get("page");
  let perPage = req.nextUrl.searchParams.get("perPage");
  let skip = (page - 1) * perPage;
  try {
    await dbConnect();

    const total = await ContactModel.find({ email: keyword });

    const list = await ContactModel.find({ email: keyword })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return Response.json({ list, total: total?.length });
  } catch (error) {
    console.log(error);
    return Response.json({ message: await getErrorMessage(error) });
  }
}
