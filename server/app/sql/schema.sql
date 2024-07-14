DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Guestbooks;
DROP TABLE IF EXISTS Minihomes;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    userId INTEGER UNIQUE,
    createdAt INTEGER,
    updatedAt INTEGER,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Guestbooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    minihomeId INTEGER UNIQUE,
    createdAt INTEGER,
    updatedAt INTEGER,
    FOREIGN KEY (minihomeId) REFERENCES Minihomes(id)
);

CREATE TABLE Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    guestbookId INTEGER,
    authorId INTEGER,
    content TEXT,
    parentId INTEGER NULL,
    createdAt INTEGER,
    updatedAt INTEGER,
    isDeleted INTEGER DEFAULT 0,
    FOREIGN KEY (guestbookId) REFERENCES Guestbooks(id),
    FOREIGN KEY (authorId) REFERENCES Users(id)
);
