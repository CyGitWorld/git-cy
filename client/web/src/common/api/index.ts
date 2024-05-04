import { ApiRouter } from "@repo/server-app";
import {
  hc,
  InferResponseType,
  InferRequestType,
  ClientResponse,
} from "hono/client";
import { ResponseFormat } from "hono/types";
import ky from "ky";

const API_DOMAIN = process.env.NEXT_PUBLIC_SERVER_API_HOST;

export const kyClient = ky.create({});
export const apiClient = hc<ApiRouter>(`${API_DOMAIN}/api`, {
  fetch: kyClient,
});

export const requestApiJson = async <
  T,
  U extends number,
  F extends ResponseFormat,
>(
  getter: (api: typeof apiClient) => Promise<ClientResponse<T, U, F>>
) => {
  const request = getter(apiClient);

  const res = await request;
  const data: T = (await res.json()) as T;
  return data;
};

export const getApiPath = (getter: (api: typeof apiClient) => URL) => {
  const url = getter(apiClient);

  return url.pathname;
};

export type { InferRequestType, InferResponseType };
