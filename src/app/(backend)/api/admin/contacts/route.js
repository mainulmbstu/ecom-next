import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { ContactModel } from "@/lib/models/ContactModel";

export async function POST(req) {
  let keyword = req.nextUrl.searchParams.get("keyword");
  let page = req.nextUrl.searchParams.get("page");
  let perPage = req.nextUrl.searchParams.get("perPage");
  let skip = (page - 1) * perPage;
  let editKey = keyword === "unread" ? "" : keyword;
  try {
    await dbConnect();

    const total = await ContactModel.find({
      email: { $regex: editKey, $options: "i" },
    });

    const list = await ContactModel.find({
      email: { $regex: editKey, $options: "i" },
    })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });
    let unread =
      list?.length && list.filter((item) => item?.replies?.length === 0);
    return Response.json({
      list: keyword === "unread" ? unread : list,
      total: keyword === "unread" ? unread?.length : total?.length,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: await getErrorMessage(error) });
  }
}
