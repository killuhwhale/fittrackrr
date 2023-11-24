CREATE TABLE IF NOT EXISTS Workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER,
    title TEXT NOT NULL,
    desc TEXT,
    scheme_type INTEGER DEFAULT 0,
    scheme_rounds TEXT DEFAULT '[]',
    instruction TEXT DEFAULT '',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES WorkoutGroups(id),
    UNIQUE(group_id, title)
);