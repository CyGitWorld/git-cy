"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getApiPath, requestApiJson } from "@/common/api";

export interface PostGuestbookPayload {
  content: string;
  githubUserName: string;
  parentId?: string | null;
  g;
}

export const usePostGuestbook = ({
  payload,
  onSuccess,
}: {
  payload: Pick<PostGuestbookPayload, "parentId">;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();

  return useMutation({
    mutationFn: ({ content }: Pick<PostGuestbookPayload, "content">) =>
      requestApiJson((api) =>
        api.guestbooks.$post(
          {
            json: {
              content,
              parentId: payload.parentId,
              githubUserName: params["user-name"] as string,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
            },
          }
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          getApiPath((api) => api.guestbooks[":githubUserName"].$url()),
          params["user-name"],
        ],
      });
      onSuccess?.();
    },
  });
};
