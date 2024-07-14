import { User } from "../user/user.schema";

export interface CommentTable {
  id: string;
  guestbookId: string;
  authorId: string;
  content: string;
  parentId: string | null;
  createdAt: number;
  updatedAt: number;
  isDeleted: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}
