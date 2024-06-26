import { Kysely, sql } from "kysely";

import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/addTimeStamp";
import { User } from "../user/user.schema";
import { Comment } from "./comment.schema";

export class CommentRepository {
  private db;
  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getAllCommentsByGuestbookId(guestbookId: number) {
    return await this.db
      .selectFrom("Comments")
      .where("Comments.guestbookId", "=", guestbookId)
      .where("Comments.isDeleted", "=", 0)
      .innerJoin("Users", "Users.id", "Comments.authorId")
      .select([
        "Comments.id",
        "Comments.guestbookId",
        "Comments.content",
        "Comments.parentId",
        "Comments.createdAt",
        "Comments.updatedAt",
        sql<User>`
          json_object(
            'id', Users.id,
            'githubUserId', Users.githubUserId,
            'thumbnailUrl', Users.thumbnailUrl,
            'name', Users.name,
            'githubUserName', Users.githubUserName,
            'bio', Users.bio,
            'githubUrl', Users.githubUrl,
            'createdAt', Users.createdAt,
            'updatedAt', Users.updatedAt
          )`.as("author"),
      ])
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

  async updateComment(props: {
    content: Comment["content"];
    id: Comment["id"];
  }) {
    return await this.db
      .updateTable("Comments")
      .set({
        content: props.content,
      })
      .where("Comments.id", "=", props.id)
      .returningAll()
      .executeTakeFirst();
  }

  async deleteComment(props: { id: Comment["id"] }) {
    return await this.db
      .updateTable("Comments")
      .set({
        isDeleted: 1,
      })
      .where("Comments.id", "=", Number(props.id))
      .returningAll()
      .executeTakeFirst();
  }
}
