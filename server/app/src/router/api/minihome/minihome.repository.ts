import { Kysely } from "kysely";
import { ulid } from "ulidx";

import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/timestamp";
import { MinihomeTable } from "./minihome.schema";

export class MinihomeRepository {
  private db;
  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getMinihomeByUserId(userId: MinihomeTable["userId"]) {
    return await this.db
      .selectFrom("Minihomes")
      .selectAll()
      .where("Minihomes.userId", "=", userId)
      .executeTakeFirst();
  }

  async createMinihome(userId: MinihomeTable["userId"]) {
    return await this.db
      .insertInto("Minihomes")
      .values(addTimeStamp({ userId, id: ulid() }) as MinihomeTable)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
