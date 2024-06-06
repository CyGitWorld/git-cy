CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    guestbookId INTEGER,
    userId INTEGER,
    content TEXT,
    parentId INTEGER NULL,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (guestbookId) REFERENCES Guestbooks(id)
    FOREIGN KEY (userId) REFERENCES Users(id)
);
