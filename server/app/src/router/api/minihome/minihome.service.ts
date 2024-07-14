import { Env } from "../../../worker-env";
import { MinihomeRepository } from "../minihome/minihome.repository";
import { MinihomeTable } from "../minihome/minihome.schema";

export class MinihomeService {
  private env;
  private minihomeRepository;
  constructor({
    env,
    minihomeRepository,
  }: {
    env: Env;
    minihomeRepository: MinihomeRepository;
  }) {
    this.env = env;
    this.minihomeRepository = minihomeRepository;
  }

  async getMinihome(userId: MinihomeTable["userId"]) {
    const res = await this.minihomeRepository.getMinihomeByUserId(userId);
    return res;
  }

  async createMinihome(userId: MinihomeTable["userId"]) {
    const res = await this.minihomeRepository.createMinihome(userId);
    return res;
  }

  async getMinihomeOrCreate(userId: MinihomeTable["userId"]) {
    let minihome: MinihomeTable;
    const res = await this.getMinihome(userId);
    if (res == null) {
      minihome = await this.minihomeRepository.createMinihome(userId);
    } else {
      minihome = res;
    }

    return minihome;
  }
}
