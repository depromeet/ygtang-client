import { get } from "~/libs/api/client";
import mime2ext from "mime2ext";

export async function fileDownload(src: string) {
  const file = await get<any>(src, {
    responseType: "blob",
  });
  const fileExtension = mime2ext(file.data.type);
  return { file: file.data, ext: fileExtension };
}
