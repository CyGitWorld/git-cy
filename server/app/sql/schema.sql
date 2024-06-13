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

DROP TABLE IF EXISTS Minihomes;
CREATE TABLE Minihomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    userId INTEGER UNIQUE,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);


DROP TABLE IF EXISTS Guestbooks;
CREATE TABLE Guestbooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    minihomeId INTEGER UNIQUE,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (minihomeId) REFERENCES Minihomes(id)
);

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    guestbookId INTEGER,
    authorId INTEGER,
    content TEXT,
    parentId INTEGER NULL,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (guestbookId) REFERENCES Guestbooks(id)
    FOREIGN KEY (authorId) REFERENCES Users(id)
);
