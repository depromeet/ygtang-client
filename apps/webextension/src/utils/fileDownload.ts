import { instance } from "@ygtang/http";
import mime2ext from "mime2ext";

export async function fileDownload(src: string) {
  const file = await (await instance.get(src, { prefixUrl: undefined })).blob();
  const fileExtension = mime2ext(file.type);
  return { file: file, ext: fileExtension };
}
