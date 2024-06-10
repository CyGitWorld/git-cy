import { Comment } from "../router/api/comment/comment.schema";
import { Guestbook } from "../router/api/guestbook/guestbook.schema";
import { Minihome } from "../router/api/minihome/minihome.schema";
import { User } from "./../router/api/user/user.schema";
export type DataBase = {
  Users: User;
  Minihomes: Minihome;
  Guestbooks: Guestbook;
  Comments: Comment;
};
