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
    createdAt TEXT,
    updatedAt TEXT
);

CREATE TABLE Minihomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    userId INTEGER UNIQUE,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Guestbooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    minihomeId INTEGER UNIQUE,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (minihomeId) REFERENCES Minihomes(id)
);

CREATE TABLE Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    guestbookId INTEGER,
    authorId INTEGER,
    content TEXT,
    parentId INTEGER NULL,
    createdAt TEXT,
    updatedAt TEXT,
    isDeleted INTEGER DEFAULT 0,
    FOREIGN KEY (guestbookId) REFERENCES Guestbooks(id),
    FOREIGN KEY (authorId) REFERENCES Users(id)
);
