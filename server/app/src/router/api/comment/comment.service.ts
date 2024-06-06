import { Env } from "../../../worker-env";
import { UserService } from "../user/user.service";
import { CommentRepository } from "./comment.repository";
import { Comment } from "./comment.schema";

export class CommentService {
  private env;
  private commentRepository;
  private userService;
  constructor({
    env,
    commentRepository,
    userService,
  }: {
    env: Env;
    commentRepository: CommentRepository;
    userService: UserService;
  }) {
    this.env = env;
    this.commentRepository = commentRepository;
    this.userService = userService;
  }

  async getAllGuestbookCommentsByGithubUserName(githubUserName: string) {
    const guestbook =
      await this.userService.getGuestbookByGithubUserName(githubUserName);
    if (guestbook == null) {
      throw new Error("Guestbook not found");
    }
    const comments = await this.commentRepository.getAllCommentsByGuestbookId(
      guestbook.id
    );
    return { comments, guestbookId: guestbook.id };
  }

  async createComment(props: {
    guestbookId: Comment["guestbookId"];
    authorId: Comment["authorId"];
    content: Comment["content"];
    parentId: Comment["parentId"];
  }) {
    const res = await this.commentRepository.createComment(props);
    return res;
  }
}
