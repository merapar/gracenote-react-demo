import { ErrorResponseParams, RequestError } from "./RequestError";

export class ServerError extends RequestError {
  constructor(params: ErrorResponseParams) {
    super(params);

    this.name = "ServerError";
  }
}
