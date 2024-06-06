import { Kysely, Transaction } from "kysely";
import { DataBase } from "../../../types/database";
import { User } from "./user.schema";
import { addTimeStamp } from "../../../utils/addTimeStamp";
import { MinihomeRepository } from "../minihome/minihome.repository";
import { GuestbookRepository } from "../guestbook/guestbook.repository";

export class UserRepository {
  private db;
  private minihomeRepository: MinihomeRepository;
  private guestbookRepository: GuestbookRepository;

  constructor({ db }: { db: Kysely<DataBase> }) {
    this.db = db;
    this.minihomeRepository = new MinihomeRepository({ db });
    this.guestbookRepository = new GuestbookRepository({ db });
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

  async createUser(
    props: Omit<User, "id" | "createdAt" | "updatedAt">,
    { trx }: { trx?: Transaction<DataBase> } = {}
  ) {
    const db = trx ?? this.db;
    return await db
      .insertInto("Users")
      .values(addTimeStamp(props) as User)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async createUserAndMinihomeAndGuestbook(
    props: Omit<User, "id" | "createdAt" | "updatedAt">
  ) {
    const user = await this.db.transaction().execute(async (trx) => {
      const createdUser = await this.createUser(props, { trx });
      const createdMinihome = await this.minihomeRepository.createMinihome(
        createdUser.id,
        { trx }
      );
      await this.guestbookRepository.createGuestbook(createdMinihome.id, {
        trx,
      });

      return createdUser;
    });

    return user;
  }
}
