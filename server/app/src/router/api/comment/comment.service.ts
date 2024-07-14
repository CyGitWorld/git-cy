import { Env } from "../../../worker-env";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { CommentRepository } from "./comment.repository";
import { Comment } from "./comment.schema";

type AllCommentDTO = {
  guestbookId: number;
  comments: Array<CommentWithRepies>;
};

type CommentWithRepies = CommentDTO & { replies: CommentDTO[] };

interface CommentDTO {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

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
      return { result: "notFound" as const };
    }
    const comments = await this.commentRepository.getAllCommentsByGuestbookId(
      guestbook.id
    );
    const commentMap = new Map<number, CommentWithRepies>();
    comments.forEach((comment) => {
      const { parentId, ...commentData } = comment;

      if (!parentId) {
        // parentId가 없는 경우 (최상위 댓글)
        commentMap.set(commentData.id, { ...commentData, replies: [] });
      } else {
        // 대댓글인 경우
        const parentComment = commentMap.get(parentId);
        if (parentComment == null) {
          return;
        }
        parentComment.replies.push(commentData);
      }
    });

    const result = Array.from(commentMap.values());

    return {
      result: "success" as const,
      comments: result,
      guestbookId: guestbook.id,
    };
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

  async updateComment(props: {
    content: Comment["content"];
    id: Comment["id"];
  }) {
    const res = await this.commentRepository.updateComment(props);
    return res;
  }

  async deleteComment(props: { id: Comment["id"] }) {
    const res = await this.commentRepository.deleteComment(props);
    return { isSuccess: res != null };
  }
}
