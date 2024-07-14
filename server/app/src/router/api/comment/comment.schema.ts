import { User } from "../user/user.schema";

export interface CommentTable {
  id: number;
  guestbookId: number;
  authorId: number;
  content: string;
  parentId: number | null;
  createdAt: number;
  updatedAt: number;
  isDeleted: number;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}
