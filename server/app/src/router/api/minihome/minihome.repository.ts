import { Kysely } from "kysely";

import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/addTimeStamp";
import { Minihome } from "./minihome.schema";

export class MinihomeRepository {
  private db;
  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getMinihomeByUserId(userId: number) {
    return await this.db
      .selectFrom("Minihomes")
      .selectAll()
      .where("Minihomes.userId", "=", userId)
      .executeTakeFirst();
  }

  async createMinihome(userId: number) {
    return await this.db
      .insertInto("Minihomes")
      .values(addTimeStamp({ userId }) as Minihome)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
