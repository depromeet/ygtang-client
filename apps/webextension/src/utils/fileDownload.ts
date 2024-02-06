import { get } from "@ygtang/http";
import mime2ext from "mime2ext";

export async function fileDownload(src: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const file = await get<any>(src, {
    responseType: "blob",
  });
  const fileExtension = mime2ext(file.data.type);
  return { file: file.data, ext: fileExtension };
}
