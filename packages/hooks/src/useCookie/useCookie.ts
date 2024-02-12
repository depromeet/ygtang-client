import { IS_PRODUCTION } from "@ygtang/constants";
import Cookie from "js-cookie";

export function useCookie() {
  const handleSet = (key: string, value: string) => {
    Cookie.set(key, value, {
      sameSite: "Lax",
      secure: IS_PRODUCTION,
    });
  };

  return {
    get: Cookie.get,
    set: handleSet,
    remove: Cookie.remove,
  };
}
