import { Kysely } from "kysely";
import { ulid } from "ulidx";

import { DataBase } from "../../../types/database";
import { addTimeStamp } from "../../../utils/timestamp";
import { GuestbookTable } from "./guestbook.schema";

export class GuestbookRepository {
  private db;
  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
  }

  async getGuestbookByMinihomeId(minihomeId: GuestbookTable["minihomeId"]) {
    return await this.db
      .selectFrom("Guestbooks")
      .selectAll()
      .where("Guestbooks.minihomeId", "=", minihomeId)
      .executeTakeFirst();
  }

  async createGuestbook(minihomeId: GuestbookTable["minihomeId"]) {
    return await this.db
      .insertInto("Guestbooks")
      .values(addTimeStamp({ minihomeId, id: ulid() }) as GuestbookTable)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
