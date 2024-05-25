import { Kysely } from "kysely";
import { User } from "./user";
import { DataBase } from "../../../types/database";

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

  async getUserById(id: User["id"]) {
    return await this.db
      .selectFrom("Users")
      .selectAll()
      .where("Users.id", "=", id)
      .executeTakeFirst();
  }

  async createUser(props: Omit<User, "id">) {
    return await this.db
      .insertInto("Users")
      .values(props as User) // FIXME
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
