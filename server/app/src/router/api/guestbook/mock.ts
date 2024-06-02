const MOCK_USER = {
  id: 1,
  githubUserId: 2,
  thumbnailUrl: "",
  name: "김의진",
  githubUserName: "euijinkkk",
  bio: "Fronend Devloper",
  githubUrl: "https://github.com/euijinkk",
};

export const MOCK_GUEST_BOOK = {
  id: 1,
  content: "안녕~ 잘지내니",
  author: MOCK_USER,
  createdAt: "2024-05-30T00:00:00+09:00",
  updatedAt: "2024-05-30T00:00:00+09:00",
};

export function createNewMockGuestBook({ content }: { content: string }) {
  return {
    ...MOCK_GUEST_BOOK,
    id: MOCK_GUEST_BOOK_LIST.length + 1,
    content,
    author: MOCK_USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export const MOCK_GUEST_BOOK_LIST = Array.from({ length: 20 }, (_, index) => {
  if (index % 2 === 0) {
    return {
      ...MOCK_GUEST_BOOK,
      id: index,
      replies: [
        { ...MOCK_GUEST_BOOK, id: index + 10000 },
        { ...MOCK_GUEST_BOOK, id: index + 20000 },
      ],
    };
  }
  return { ...MOCK_GUEST_BOOK, id: index };
});
