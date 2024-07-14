import { Env } from "../../../worker-env";
import { GuestbookRepository } from "./guestbook.repository";
import { GuestbookTable } from "./guestbook.schema";

export class GuestbookService {
  private env;
  private gestbookRepository;
  constructor({
    env,
    gestbookRepository,
  }: {
    env: Env;
    gestbookRepository: GuestbookRepository;
  }) {
    this.env = env;
    this.gestbookRepository = gestbookRepository;
  }

  async getGuestbook(minihomeId: GuestbookTable["minihomeId"]) {
    const res =
      await this.gestbookRepository.getGuestbookByMinihomeId(minihomeId);
    return res;
  }

  async createGuestbook(minihomeId: GuestbookTable["minihomeId"]) {
    const res = await this.gestbookRepository.createGuestbook(minihomeId);
    return res;
  }

  async getGuestbookOrCreate(minihomeId: GuestbookTable["minihomeId"]) {
    let guestbook: GuestbookTable;
    const res = await this.getGuestbook(minihomeId);
    if (res == null) {
      guestbook = await this.gestbookRepository.createGuestbook(minihomeId);
    } else {
      guestbook = res;
    }

    return guestbook;
  }
}
