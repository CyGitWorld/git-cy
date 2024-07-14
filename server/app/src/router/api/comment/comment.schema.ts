export interface Comment {
  id: number;
  guestbookId: number;
  authorId: number;
  content: string;
  parentId: number | null;
  createdAt: number;
  updatedAt: number;
  isDeleted: number;
}
