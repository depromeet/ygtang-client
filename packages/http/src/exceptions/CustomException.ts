export type CustomErrorCode =
  | "UNKNOWN_ERROR"
  | "NETWORK_TIMEOUT"
  | "NETWORK_ERROR";

export class CustomException extends Error {
  declare code: CustomErrorCode;

  constructor(message: string, code: CustomErrorCode) {
    super(message);
    this.name = "CustomException";
    this.code = code;
  }
}
