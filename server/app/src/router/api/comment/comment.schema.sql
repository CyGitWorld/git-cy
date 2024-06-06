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
