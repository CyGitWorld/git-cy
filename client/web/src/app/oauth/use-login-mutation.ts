import { useMutation } from "@tanstack/react-query";

import { apiClient, InferRequestType, requestApiJson } from "@/common/api";

type LoginRequestType = InferRequestType<
  typeof apiClient.users.login.$post
>["json"];
export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ code }: LoginRequestType) =>
      requestApiJson((api) =>
        api.users.login.$post({
          json: {
            code,
          },
        })
      ),
  });
}
