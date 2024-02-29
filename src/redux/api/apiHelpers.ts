import SQLite from 'react-native-sqlite-storage';
import {
  CREATE_DUAL_WORKOUT_ITEMS,
  CREATE_WORKOUTS,
  CREATE_WORKOUT_CATEGORIES,
  CREATE_WORKOUT_GROUPS,
  CREATE_WORKOUT_ITEMS,
  CREATE_WORKOUT_NAMES,
  INSERT_WORKOUT_CATEGORIES,
  INSERT_WORKOUT_NAMES,
} from './schema';

const db = SQLite.openDatabase(
  {
    name: 'fittrackrr',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error: ' + error);
  },
);
db.executeSql('PRAGMA foreign_keys = ON;');

// db.transaction(tx => {
//   tx.executeSql(
//     'SELECT * FROM Users',
//     [],
//     (tx, results) => {
//       var len = results.rows.length;
//       for (let i = 0; i < len; i++) {
//         let row = results.rows.item(i);
//         console.log(`ID: ${row.id}, Name: ${row.name}, Age: ${row.age}`);
//       }
//     },
//     error => { console.log('Error: ' + error); }
//   );
// });

// Example api call
// getProfileWorkoutGroups: builder.query({
//     query: () => {
//       return {url: 'profile/workout_groups/'};
//     },
//     providesTags: ['UserWorkoutGroups'],
//   }),

// {"insertId": undefined, "rows": {"item": [Function item], "length": 2, "raw": [Function raw]}, "rowsAffected": 0}

export type SQLResult = {
  error?: string;
  result?: {
    insertId?: number;
    rows?: {
      item: any;
      length: number;
      raw: any;
      rowsAffected: number;
    };
  };
};

function fetchSQL(query): Promise<SQLResult> {
  return new Promise((res, rej) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          res({
            result: results,
          });
          // var len = results.rows.length;
          // for (let i = 0; i < len; i++) {
          //   let row = results.rows.item(i);
          //   console.log(`ID: ${row.id}, Name: ${row.name}, Age: ${row.age}`);
          // }
        },
        error => {
          console.log('Error fetchSQL: ', error);
          rej({error: error.toString()});
        },
      );
    });
  });
}

function create(db) {
  db.transaction(tx => {
    [
      CREATE_WORKOUT_GROUPS,
      CREATE_WORKOUT_CATEGORIES,
      CREATE_WORKOUTS,
      CREATE_WORKOUT_NAMES,
      CREATE_WORKOUT_ITEMS,
      CREATE_DUAL_WORKOUT_ITEMS,
      // INSERT_WORKOUT_CATEGORIES,
      // INSERT_WORKOUT_NAMES,
    ].map(sql => {
      let id = sql.slice(0, 65);
      tx.executeSql(
        sql,
        [],
        () => {
          console.log('Create successful', id);
        },
        error => {
          console.log('Error create(db): ', error, id);
        },
      );
    });
  });
}

create(db);

export {db, fetchSQL};
