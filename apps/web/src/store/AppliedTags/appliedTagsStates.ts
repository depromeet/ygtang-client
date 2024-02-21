import { TagType } from "@ygtang/api";
import { atom } from "recoil";

export const appliedTagsState = atom<TagType[]>({
  key: "addTagState",
  default: [],
});
