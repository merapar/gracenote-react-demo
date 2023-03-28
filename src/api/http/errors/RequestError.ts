import { BaseError } from "make-error";

export type ErrorResponseParams = {
  body: any;
  status: number;
};

export class RequestError extends BaseError {
  body: any;

  status: number;

  constructor(params: ErrorResponseParams) {
    super(`HTTP Error ${params.status}`);
    this.status = params.status;
    this.body = params.body;
    this.name = "RequestError";
    this.stack = (<any>new Error()).stack;
  }
}
