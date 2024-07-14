import { Kysely } from "kysely";

import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/addTimeStamp";
import { UserTable } from "./user.schema";

export class UserRepository {
  private db;

  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getUserByGithubUserId(githubUserId: UserTable["githubUserId"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.githubUserId", "=", githubUserId)
      .executeTakeFirst();
  }

  async getUserByGithubUserName(githubUserName: UserTable["githubUserName"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.githubUserName", "=", githubUserName)
      .executeTakeFirst();
  }

  async getUserById(id: UserTable["id"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.id", "=", id)
      .executeTakeFirst();
  }

  async createUser(props: Omit<UserTable, "id" | "createdAt" | "updatedAt">) {
    return await this.db
      .insertInto("Users")
      .values(addTimeStamp(props) as UserTable)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
