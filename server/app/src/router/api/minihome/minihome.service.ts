import { Env } from "../../../worker-env";
import { MinihomeRepository } from "../minihome/minihome.repository";
import { Minihome } from "../minihome/minihome.schema";

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

  async getMinihome(userId: number) {
    const res = await this.minihomeRepository.getMinihomeByUserId(userId);
    return res;
  }

  async createMinihome(userId: number) {
    const res = await this.minihomeRepository.createMinihome(userId);
    return res;
  }

  async getMinihomeOrCreate(
    props: Omit<Minihome, "id" | "createdAt" | "updatedAt">
  ) {
    const { userId } = props;

    let minihome: Minihome;
    const res = await this.getMinihome(userId);
    if (res == null) {
      minihome = await this.minihomeRepository.createMinihome(userId);
    } else {
      minihome = res;
    }

    return minihome;
  }
}
