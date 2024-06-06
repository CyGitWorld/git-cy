import { GuestbookService } from "./../guestbook/guestbook.service";
import { Env } from "../../../worker-env";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";
import { MinihomeService } from "../minihome/minihome.service";

export class UserService {
  private env;
  private userRepository;
  private minihomeService;
  private guestbookService;
  constructor({
    env,
    userRepository,
    minihomeService,
    guestbookService,
  }: {
    env: Env;
    userRepository: UserRepository;
    minihomeService: MinihomeService;
    guestbookService: GuestbookService;
  }) {
    this.env = env;
    this.userRepository = userRepository;
    this.minihomeService = minihomeService;
    this.guestbookService = guestbookService;
  }

  async getUserByGithubUserId(githubUserId: number) {
    const res = await this.userRepository.getUserByGithubUserId(githubUserId);
    return res;
  }

  async getUserByGithubUserName(githubUserName: string) {
    const res =
      await this.userRepository.getUserByGithubUserName(githubUserName);
    return res;
  }

  async getGuestbookByGithubUserName(githubUserName: string) {
    const user = await this.getUserByGithubUserName(githubUserName);
    if (user == null) {
      return null;
    }
    const minihome = await this.minihomeService.getMinihome(user.id);
    if (minihome == null) {
      return null;
    }
    const guestbook = await this.guestbookService.getGuestbook(minihome.id);
    if (guestbook == null) {
      return null;
    }
    return guestbook;
  }

  async getUserById(id: number) {
    const res = await this.userRepository.getUserById(id);
    return res;
  }

  async createUser(props: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const res = await this.userRepository.createUser(props);
    return res;
  }

  async createUserAndMinihomeAndGuestbook(
    props: Omit<User, "id" | "createdAt" | "updatedAt">
  ) {
    const createdUser = await this.createUser(props);
    const createdMinihome = await this.minihomeService.createMinihome(
      createdUser.id
    );
    await this.guestbookService.createGuestbook(createdMinihome.id);
    return createdUser;
  }

  async getUserOrCreateUser(
    props: Omit<User, "id" | "createdAt" | "updatedAt">
  ) {
    const { bio, githubUrl, githubUserId, githubUserName, name, thumbnailUrl } =
      props;

    let user: User;
    const res = await this.getUserByGithubUserId(githubUserId);
    if (res == null) {
      user = await this.createUserAndMinihomeAndGuestbook({
        githubUserId,
        bio,
        name,
        githubUrl,
        githubUserName,
        thumbnailUrl,
      });
    } else {
      user = res;
    }

    return user;
  }
}
