const CREATE_WORKOUT_GROUPS = `CREATE TABLE IF NOT EXISTS WorkoutGroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    finished INTEGER DEFAULT 0,
    for_date DATETIME,
    title TEXT NOT NULL,
    caption TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(title)
);`;

const CREATE_WORKOUT_CATEGORIES = `CREATE TABLE IF NOT EXISTS WorkoutCategories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL
);`;
const CREATE_WORKOUTS = `CREATE TABLE IF NOT EXISTS Workouts (
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
);`;
const CREATE_WORKOUT_NAMES = `CREATE TABLE IF NOT EXISTS WorkoutNames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    desc TEXT,
    media_ids TEXT DEFAULT '[]',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    primary_category INTEGER,
    secondary_category INTEGER,
    FOREIGN KEY (primary_category) REFERENCES WorkoutCategories(id),
    FOREIGN KEY (secondary_category) REFERENCES WorkoutCategories(id)
);`;
const CREATE_WORKOUT_ITEMS = `CREATE TABLE IF NOT EXISTS WorkoutItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER,
    name_id INTEGER,
    ssid INTEGER DEFAULT -1,
    constant INTEGER DEFAULT 0,
    sets INTEGER DEFAULT 0,
    reps TEXT DEFAULT '[0]',
    pause_duration REAL DEFAULT 0.00,
    duration TEXT DEFAULT '[0]',
    duration_unit INTEGER DEFAULT 0,
    distance TEXT DEFAULT '[0]',
    distance_unit INTEGER DEFAULT 0,
    weights TEXT DEFAULT '[]',
    weight_unit TEXT DEFAULT 'kg',
    rest_duration REAL DEFAULT 0.0,
    rest_duration_unit INTEGER DEFAULT 0,
    percent_of TEXT DEFAULT '',
    order INTEGER,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_id) REFERENCES Workouts(id),
    FOREIGN KEY (name_id) REFERENCES WorkoutNames(id)
);`;

export {
  CREATE_WORKOUTS,
  CREATE_WORKOUT_CATEGORIES,
  CREATE_WORKOUT_GROUPS,
  CREATE_WORKOUT_ITEMS,
  CREATE_WORKOUT_NAMES,
};
