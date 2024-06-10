import { Kysely } from "kysely";
import { DataBase } from "../../../types/database";
import { User } from "./user.schema";
import { addTimeStamp } from "../../../utils/addTimeStamp";

export class UserRepository {
  private db;

  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getUserByGithubUserId(githubUserId: User["githubUserId"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.githubUserId", "=", githubUserId)
      .executeTakeFirst();
  }

  async getUserByGithubUserName(githubUserName: User["githubUserName"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.githubUserName", "=", githubUserName)
      .executeTakeFirst();
  }

  async getUserById(id: User["id"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.id", "=", id)
      .executeTakeFirst();
  }

  async createUser(props: Omit<User, "id" | "createdAt" | "updatedAt">) {
    return await this.db
      .insertInto("Users")
      .values(addTimeStamp(props) as User)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
