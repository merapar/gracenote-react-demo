import { AuthenticationFailedError } from "./errors/AuthenticationFailedError";
import { NetworkError } from "./errors/NetworkError";
import { RequestError } from "./errors/RequestError";
import { ServerError } from "./errors/ServerError";

export interface URLQueryParams {
  [param: string]: string | number;
}
export interface RequestOptions extends RequestInit {
  queryParams?: URLQueryParams;
}
export const appendQueryParams = (
  urlObject: URL,
  queryParams: URLQueryParams = {}
): void => {
  Object.keys(queryParams).forEach((param: string) =>
    urlObject.searchParams.append(param, queryParams[param].toString())
  );
};

export async function request(
  maybeUrlObject: URL | string,
  requestOptions?: RequestOptions
): Promise<undefined | Response> {
  let response: Response | undefined;
  const url: URL = new URL(maybeUrlObject.toString());
  if (requestOptions && requestOptions.queryParams) {
    appendQueryParams(url, requestOptions.queryParams);
    delete requestOptions.queryParams;
  }
  try {
    response = await fetch(url.toString(), requestOptions);
  } catch (e) {
    if (e instanceof TypeError) {
      throw new NetworkError();
    }
  }
  if (response && !response.ok) {
    const errorResponseParams = {
      body: await response.text(),
      status: response.status,
    };
    console.log({ errorResponseParams });
    if (response.status === 401) {
      throw new AuthenticationFailedError({
        message: errorResponseParams.body,
      });
    } else if (response.status === 402) {
      throw new AuthenticationFailedError({
        message: errorResponseParams.body,
      });
    } else if (response.status < 500) {
      throw new RequestError(errorResponseParams);
    } else {
      throw new ServerError(errorResponseParams);
    }
  }
  return response;
}
