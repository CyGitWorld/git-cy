import { Env } from "../../../worker-env";
import { GuestbookRepository } from "./guestbook.repository";

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
}
