import { Env } from "../../../worker-env";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";

export class UserService {
  private env;
  private userRepository;
  constructor({
    env,
    userRepository,
  }: {
    env: Env;
    userRepository: UserRepository;
  }) {
    this.env = env;
    this.userRepository = userRepository;
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

  async getUserById(id: number) {
    const res = await this.userRepository.getUserById(id);
    return res;
  }

  async createUser(props: Omit<User, "id">) {
    const res = await this.userRepository.createUser(props);
    return res;
  }

  async getUserOrCreateUser(props: Omit<User, "id">) {
    const { bio, githubUrl, githubUserId, githubUserName, name, thumbnailUrl } =
      props;

    let user: User;
    const res = await this.getUserByGithubUserId(githubUserId);
    if (res == null) {
      user = await this.createUser({
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
