import { BaseError } from "make-error";

const NetworkErrorName = "NetworkError";

export class NetworkError extends BaseError {
  constructor(message?: string) {
    super(message);

    this.name = NetworkErrorName;
  }
}
