CREATE TABLE IF NOT EXISTS Minihomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    userId INTEGER UNIQUE, -- 1:1 relationship with Users
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);
