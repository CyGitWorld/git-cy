import { CommentTable } from "../router/api/comment/comment.schema";
import { GuestbookTable } from "../router/api/guestbook/guestbook.schema";
import { MinihomeTable } from "../router/api/minihome/minihome.schema";
import { UserTable } from "./../router/api/user/user.schema";
export type DataBase = {
  Users: UserTable;
  Minihomes: MinihomeTable;
  Guestbooks: GuestbookTable;
  Comments: CommentTable;
};
