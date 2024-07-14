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
    const res = await this.db
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
        "Users.id as authorId",
        "Users.githubUserId as authorGithubUserId",
        "Users.thumbnailUrl as authorThumbnailUrl",
        "Users.name as authorName",
        "Users.githubUserName as authorGithubUserName",
        "Users.bio as authorBio",
        "Users.githubUrl as authorGithubUrl",
        "Users.createdAt as authorCreatedAt",
        "Users.updatedAt as authorUpdatedAt",
      ])
      .execute();

    return res.map((data) => ({
      id: data.id,
      guestbookId: data.guestbookId,
      content: data.content,
      parentId: data.parentId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      author: {
        id: data.authorId,
        githubUserId: data.authorGithubUserId,
        thumbnailUrl: data.authorThumbnailUrl,
        name: data.authorName,
        githubUserName: data.authorGithubUserName,
        bio: data.authorBio,
        githubUrl: data.authorGithubUrl,
        createdAt: data.authorCreatedAt,
        updatedAt: data.authorUpdatedAt,
      },
    }));
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
