import { Env } from "../../../worker-env";
import { GuestbookRepository } from "./guestbook.repository";
import { Guestbook } from "./guestbook.schema";

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

  async getGuestbook(minihomeId: number) {
    const res =
      await this.gestbookRepository.getGuestbookByMinihomeId(minihomeId);
    return res;
  }

  async createGuestbook(minihomeId: number) {
    const res = await this.gestbookRepository.createGuestbook(minihomeId);
    return res;
  }

  async getGuestbookOrCreate(
    props: Omit<Guestbook, "id" | "createdAt" | "updatedAt">
  ) {
    const { minihomeId } = props;

    let guestbook: Guestbook;
    const res = await this.getGuestbook(minihomeId);
    if (res == null) {
      guestbook = await this.gestbookRepository.createGuestbook(minihomeId);
    } else {
      guestbook = res;
    }

    return guestbook;
  }
}
