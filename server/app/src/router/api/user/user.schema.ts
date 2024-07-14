export interface UserTable {
  id: number;
  githubUserId: number;
  thumbnailUrl: string;
  name: string;
  githubUserName: string;
  bio: string;
  githubUrl: string;
  createdAt: number;
  updatedAt: number;
}

export interface User extends Omit<UserTable, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}
