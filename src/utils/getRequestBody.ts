import { NextRequest } from "next/server";

const getRequestBody = async (req: NextRequest) => {
  const contentType: string = req.headers.get("content-type") || " ";
  if (contentType.includes("multipart/form-data")) {
    let formData = await req.formData();
    var result: any = {};
    formData.forEach((value, key) => (result[key] = value));
    return result;
  } else {
    return await req.json();
  }
};
export default getRequestBody;
