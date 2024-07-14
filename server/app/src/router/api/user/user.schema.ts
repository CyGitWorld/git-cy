import { type ConvertTimeType } from "../../../utils/types";

export interface UserTable {
  id: number;
  githubUserId: number;
  thumbnailUrl: string;
  name: string;
  githubUserName: string;
  bio: string;
  githubUrl: string;
  createdAt: number;
  updatedAt: number;
}

export type User = ConvertTimeType<UserTable>;
