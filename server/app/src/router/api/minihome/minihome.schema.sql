CREATE TABLE IF NOT EXISTS Minihomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    userId INTEGER UNIQUE,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);
