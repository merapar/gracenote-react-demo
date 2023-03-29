import { BaseError } from "make-error";

interface ConstructorParams {
  message?: string;
  action?: "force-login";
}

export class AuthenticationFailedError extends BaseError {
  public action?: "force-login";

  constructor({ message, action }: ConstructorParams) {
    super(message);
    this.action = action;

    this.name = "AuthenticationFailedError";
  }
}
