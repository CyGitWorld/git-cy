import { Kysely } from "kysely";
import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/addTimeStamp";
import { Comment } from "./comment.schema";

export class CommentRepository {
  private db;
  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getAllCommentsByGuestbookId(guestbookId: number) {
    return await this.db
      .selectFrom("Comments")
      .selectAll()
      .where("Comments.guestbookId", "=", guestbookId)
      .execute();
  }

  async createComment(props: {
    guestbookId: Comment["guestbookId"];
    authorId: Comment["authorId"];
    content: Comment["content"];
    parentId: Comment["parentId"];
  }) {
    return await this.db
      .insertInto("Comments")
      .values(addTimeStamp(props) as Comment)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
