CREATE TABLE IF NOT EXISTS WorkoutNames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    desc TEXT,
    media_ids TEXT DEFAULT '[]',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    primary_category INTEGER,
    secondary_category INTEGER,
    FOREIGN KEY (primary_category) REFERENCES WorkoutCategories(id),
    FOREIGN KEY (secondary_category) REFERENCES WorkoutCategories(id)
);