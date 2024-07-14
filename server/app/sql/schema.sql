DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Guestbooks;
DROP TABLE IF EXISTS Minihomes;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id TEXT PRIMARY KEY,
    githubUserId KEY,
    thumbnailUrl TEXT,
    name TEXT,
    githubUserName TEXT,
    bio TEXT,
    githubUrl TEXT,
    createdAt INTEGER,
    updatedAt INTEGER
);

CREATE TABLE Minihomes (
    id TEXT PRIMARY KEY,    
    userId TEXT UNIQUE,
    createdAt INTEGER,
    updatedAt INTEGER,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Guestbooks (
    id TEXT PRIMARY KEY,    
    minihomeId TEXT UNIQUE,
    createdAt INTEGER,
    updatedAt INTEGER,
    FOREIGN KEY (minihomeId) REFERENCES Minihomes(id)
);

CREATE TABLE Comments (
    id TEXT PRIMARY KEY,    
    guestbookId TEXT,
    authorId TEXT,
    content TEXT,
    parentId TEXT NULL,
    createdAt INTEGER,
    updatedAt INTEGER,
    isDeleted INTEGER DEFAULT 0,
    FOREIGN KEY (guestbookId) REFERENCES Guestbooks(id),
    FOREIGN KEY (authorId) REFERENCES Users(id)
);
