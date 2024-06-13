import { Kysely } from "kysely";

import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/addTimeStamp";
import { Guestbook } from "./guestbook.schema";

export class GuestbookRepository {
  private db;
  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getGuestbookByMinihomeId(minihomeId: number) {
    return await this.db
      .selectFrom("Guestbooks")
      .selectAll()
      .where("Guestbooks.minihomeId", "=", minihomeId)
      .executeTakeFirst();
  }

  async createGuestbook(minihomeId: number) {
    return await this.db
      .insertInto("Guestbooks")
      .values(addTimeStamp({ minihomeId }) as Guestbook)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
