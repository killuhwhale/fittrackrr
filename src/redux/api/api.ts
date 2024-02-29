import {parse} from 'url';
import {WorkoutItemProps} from '../../app_components/Cards/types';
import {fetchSQL} from './apiHelpers';

// type SelectError = {
//   insertId: undefined;
//   rows: any;
// };

interface WorkoutName {
  desc: string;
  media_ids: string;
  name: string;
  primary: string;
  secondary: string;
}

interface WorkoutItem {
  id: number;
  ssid: number;
  sets: number;
  reps: string;
  pause_duration: number;
  duration: string;
  duration_unit: number;
  distance: string;
  distance_unit: number;
  weights: string;
  weight_unit: string;
  rest_duration: number;
  rest_duration_unit: number;
  percent_of: string;
  w_order: number;
  date: string;
  name: WorkoutName;

  r_sets?: number;
  r_reps?: string;
  r_pause_duration?: number;
  r_duration?: string;
  r_duration_unit?: number;
  r_distance?: string;
  r_distance_unit?: number;
  r_weights?: string;
  r_weight_unit?: string;
  r_rest_duration?: number;
  r_rest_duration_unit?: number;
  r_percent_of?: string;
}

interface Workout {
  title: string;
  date: string;
  desc: string;
  instruction: string;
  group_id: number;
  id: number;
  scheme_rounds: string;
  scheme_type: number;
  workout_items: WorkoutItem[];
}

interface WorkoutGroup {
  finished: number;
  for_date: string;
  caption: string;
  date: string;
  title: string;
}

function getRows(res) {
  const rows: any[] = [];

  if (res.result?.rows?.length ?? 0 > 0) {
    const len = res!.result!.rows!.length;
    for (let i = 0; i < len; i++) {
      let row = res.result!.rows!.item(i);
      // console.log(`Row: `, row);
      //   console.log(`ID: ${row.id}, Name: ${row.title}, Age: ${row.caption}`);
      rows.push(row);
    }
  } else {
    console.log('No results.');
    return [];
  }
  ``;
  // console.log('Return rows: ', rows);
  return rows;
}

async function getUserWorkouts() {
  const res = await fetchSQL('SELECT * FROM WorkoutGroups');
  return getRows(res);
}

async function getProfile() {
  // Post to WorkoutGroups

  const res = await fetchSQL('SELECT * FROM WorkoutGroups');

  if (!res.result?.insertId) {
    console.log('No results.');
    return {};
  }
  return res;
}

async function createWorkoutGroup(data) {
  // Post to WorkoutGroups
  //   finished
  //   for_date
  //   title
  //   caption

  const d = Object.fromEntries(data['_parts']);
  let query = '';

  console.log('createWorkoutGroup data: ', data);
  const for_date = new Date(d['for_date']);
  query = ` (${for_date.getTime()}, "${d['title']}", "${d['caption']}") `;

  console.log('createWorkoutGroup query: ', query);

  const res = await fetchSQL(
    'INSERT INTO WorkoutGroups  (for_date, title, caption) VALUES ' + query,
  );

  console.log('createWorkoutGroup: ', res);

  return {id: res.result.insertId};
}

function extractIdFromURL(url: string): number | null {
  // Regex pattern to match the first sequence of digits in the URL
  const regex = /(\d+)/;

  // Execute the regex pattern on the provided URL
  const match = regex.exec(url);

  // Check if there is a match and return the first matched group as a number
  if (match) {
    return parseInt(match[1], 10);
  }

  // Return null if no ID is found
  return null;
}

// url: `workoutGroups/${id}/user_workouts/`
const aaa = {
  workout_group: {
    caption: 'testcaption',
    date: '2024-02-10 16:31:23',
    finished: 1,
    for_date: 1707523200000,
    id: 4,
    title: 'test',
  },
  workouts: [
    {
      date: '2024-02-10 16:41:45',
      desc: 'Get big or go home',
      group_id: 4,
      id: 55,
      instruction: '',
      scheme_rounds: '',
      scheme_type: 0,
      title: 'BodyBuidling Workout',
      workout_items: [
        {
          constant: 0,
          date: '2024-02-10 16:43:17',
          distance: '[0]',
          distance_unit: 0,
          duration: '[0]',
          duration_unit: 0,
          finished: 0,
          id: 42,
          name: {
            date: '2024-01-28 22:48:59',
            desc: 'An upper body exercise where the body is lifted up towards a bar with the arms until the chin is above the bar.',
            id: 83,
            media_ids: '[]',
            name: 'Pull Up',
            primary: '',
            primary_category: 26,
            secondary_category: 1,
          },
          name_id: 83,
          pause_duration: 0,
          percent_of: '',
          r_distance: '[500]',
          r_distance_unit: 0,
          r_duration: '[0]',
          r_duration_unit: 0,
          r_pause_duration: 0,
          r_percent_of: '',
          r_reps: '[0]',
          r_rest_duration: 0,
          r_rest_duration_unit: 0,
          r_sets: 0,
          r_weight_unit: 'kg',
          r_weights: '[]',
          reps: '[5]',
          rest_duration: 0,
          rest_duration_unit: 0,
          sets: 1,
          ssid: -1,
          w_order: 1,
          weight_unit: 'kg',
          weights: '[]',
          workout_id: 56,
        },
      ],
    },
    {
      date: '2024-02-10 16:43:17',
      desc: '5s',
      group_id: 4,
      id: 56,
      instruction: '20mins:',
      scheme_rounds: '',
      scheme_type: 3,
      title: 'Cindy',
      workout_items: [
        {
          constant: 0,
          date: '2024-02-10 16:43:17',
          distance: '[0]',
          distance_unit: 0,
          duration: '[0]',
          duration_unit: 0,
          finished: 0,
          id: 42,
          name: {
            date: '2024-01-28 22:48:59',
            desc: 'An upper body exercise where the body is lifted up towards a bar with the arms until the chin is above the bar.',
            id: 83,
            media_ids: '[]',
            name: 'Pull Up',
            primary: '',
            primary_category: 26,
            secondary_category: 1,
          },
          name_id: 83,
          pause_duration: 0,
          percent_of: '',
          r_distance: '[500]',
          r_distance_unit: 0,
          r_duration: '[0]',
          r_duration_unit: 0,
          r_pause_duration: 0,
          r_percent_of: '',
          r_reps: '[0]',
          r_rest_duration: 0,
          r_rest_duration_unit: 0,
          r_sets: 0,
          r_weight_unit: 'kg',
          r_weights: '[]',
          reps: '[5]',
          rest_duration: 0,
          rest_duration_unit: 0,
          sets: 1,
          ssid: -1,
          w_order: 1,
          weight_unit: 'kg',
          weights: '[]',
          workout_id: 56,
        },
      ],
    },
  ],
};

async function getFullWorkoutGroup(id) {
  try {
    const workoutGroupQ = `SELECT * FROM WorkoutGroups WHERE id=${id};`;
    const workoutQ = `SELECT * FROM Workouts WHERE group_id =${id}`;
    const workoutGroupData = getRows(await fetchSQL(workoutGroupQ))[0];
    const workoutResults = getRows(await fetchSQL(workoutQ));

    const workouts: Workout[] = [];
    for (let i = 0; i < workoutResults.length; i++) {
      const workout = workoutResults[i];

      const workoutItemQ = `SELECT
      wi.*,
      wn.name,
      wn.desc,
      wn.media_ids,
      pc.title AS "primary",
      sc.title AS "secondary"
      FROM WorkoutItems wi
      JOIN WorkoutNames wn ON wi.name_id = wn.id
      LEFT JOIN WorkoutCategories pc ON wn.primary_category = pc.id
      LEFT JOIN WorkoutCategories sc ON wn.secondary_category = sc.id
      WHERE wi.workout_id = ${workout.id};`;

      const dualWorkoutItemQ = `SELECT
      wi.*,
      wn.name,
      wn.desc,
      wn.media_ids,
      pc.title AS "primary",
      sc.title AS "secondary"
      FROM DualWorkoutItems wi
      JOIN WorkoutNames wn ON wi.name_id = wn.id
      LEFT JOIN WorkoutCategories pc ON wn.primary_category = pc.id
      LEFT JOIN WorkoutCategories sc ON wn.secondary_category = sc.id
      WHERE wi.workout_id = ${workout.id};`;

      const workoutItemsResults = [
        ...getRows(await fetchSQL(workoutItemQ)),
        ...getRows(await fetchSQL(dualWorkoutItemQ)),
      ];

      const workoutItems: WorkoutItem[] = [];
      for (let j = 0; j < workoutItemsResults.length; j++) {
        const item = workoutItemsResults[j];
        workoutItems.push({
          ...item,
          name: {
            desc: item.desc,
            media_ids: item.media_ids,
            name: item.name,
            primary: {
              title: item.primary,
            },
            secondary: {
              title: item.secondary,
            },
          },
        });
      }
      console.log('Collecting workout date: ', workout.date);
      workouts.push({
        title: workout.title,
        date: workout.date,
        desc: workout.desc,
        group_id: workout.group_id,
        id: workout.id,
        scheme_rounds: workout.scheme_rounds,
        scheme_type: workout.scheme_type,
        instruction: workout.instruction,
        workout_items: workoutItems,
      });
    }

    return {
      workout_group: {
        finished: workoutGroupData.finished,
        for_date: new Date(workoutGroupData.for_date),
        caption: workoutGroupData.caption,
        date: workoutGroupData.date,
        title: workoutGroupData.title,
      },
      workouts: workouts,
    };
  } catch (err) {
    console.log('getWorkoutsForUsersWorkoutGroup error:', err);
  }

  return null;
}

async function getWorkoutsForUsersWorkoutGroupJoined(url) {
  const id = extractIdFromURL(url);
  return getFullWorkoutGroup(id);
}

async function getWorkoutsForUsersWorkoutGroup(url) {
  const id = extractIdFromURL(url);

  const resGroup = getRows(
    await fetchSQL('SELECT * FROM workoutgroups WHERE id=' + id),
  )[0];
  console.log('\n\nFetched resGroup!!! ', resGroup);
  console.log('\n \n');
  const res = await fetchSQL('SELECT * FROM workouts WHERE group_id=' + id);

  let fullWorkouts = [] as any[];
  try {
    fullWorkouts = await Promise.all(
      getRows(res).map(async workout => {
        const resItems = await fetchSQL(
          'SELECT * FROM workoutitems WHERE workout_id=' + workout.id,
        );
        const resDualItems = await fetchSQL(
          'SELECT * FROM dualworkoutitems WHERE workout_id=' + workout.id,
        );

        let fullItems = await Promise.all(
          [...getRows(resItems), ...getRows(resDualItems)].map(async item => {
            const resName = await fetchSQL(
              'SELECT * FROM workoutnames WHERE id=' + item.name_id,
            );
            const resPrimaryCat = await fetchSQL(
              'SELECT * FROM workoutcategories WHERE id=' + item.name_id,
            );
            console.log('item: ', {
              ...item,
              name: {
                ...getRows(resName)[0],
                primary: getRows(resPrimaryCat)[0],
              },
            });

            return {
              ...item,
              name: {
                ...getRows(resName)[0],
                primary: getRows(resPrimaryCat)[0],
              },
            };
          }),
        );

        let ob = {...workout, workout_items: fullItems} as any;
        console.log('Workout items for workout: ', ob);

        return ob;
      }),
    );
  } catch (err) {
    console.log('getWorkoutsForUsersWorkoutGroup error:', err);
  }

  // console.log('getworkoutsForGroup: ', fullWorkouts);
  const result = {workout_group: resGroup, workouts: fullWorkouts};
  console.log('result getworkoutsForGroup: ', result);
  return result;
}

async function getWorkoutNames() {
  console.log('get workout names: ');
  const res = await fetchSQL('SELECT * FROM workoutnames;');
  console.log('getworkoutNames:', res);
  return getRows(res);
}

async function deleteWorkoutDualItem(id) {
  console.log('Delete workoutdualitem by workout id: ', id);
  try {
    const res = await fetchSQL(
      'DELETE FROM dualworkoutitems where workout_id=' + id,
    );

    const delRes = getRows(res);
    console.log('Delete dual workout item res:', delRes);
  } catch (err) {
    console.log('deleteDualWorkoutItem err', err);
  }

  return true;
}
async function deleteWorkoutItem(id) {
  console.log('Delete workoutitem by workout id: ', id);
  try {
    const res = await fetchSQL(
      'DELETE FROM workoutitems where workout_id=' + id,
    );

    const delRes = getRows(res);
    console.log('Delete workout item res:', delRes);
  } catch (err) {
    console.log('deleteWorkoutItem err', err);
  }

  return true;
}

async function deleteWorkout(url) {
  const id = extractIdFromURL(url);
  console.log('Delete workout by id: ', id);
  try {
    await deleteWorkoutItem(id);
    await deleteWorkoutDualItem(id);
    const res = await fetchSQL('DELETE FROM workouts where id=' + id);

    const delRes = getRows(res);
    console.log('Delete workout res:', delRes);
  } catch (err) {
    console.log('deleteWorkout err', err);
  }

  return true;
}
async function deleteGroupWorkout(url) {
  const id = extractIdFromURL(url);
  console.log('Delete workout group by id: ', id);
  try {
    // Get all workouts for their ids and then dlete...
    const resWorkoutIds = getRows(
      await fetchSQL('SELECT id FROM workouts where group_id=' + id),
    );
    console.log('resWorkoutIds: ', resWorkoutIds);
    const promises = resWorkoutIds.map(idItem => deleteWorkout(idItem['id']));
    await Promise.all(promises);

    const res = await fetchSQL('DELETE FROM workoutgroups where id=' + id);

    const delRes = getRows(res);
    console.log('Delete workout group res:', delRes);
  } catch (err) {
    console.log('deleteWorkoutGroup err', err);
  }

  return true;
}

async function createWorkout(data) {
  const d = Object.fromEntries(data['_parts']);

  const group = d['group'];
  const title = d['title'];
  const desc = d['desc'];
  const instruction = d['instruction'];
  const scheme_type = d['scheme_type'];
  const scheme_rounds = d['scheme_rounds'];
  console.log('createWorkout from data: ', d);

  const res = await fetchSQL(
    `INSERT INTO workouts (group_id, title, desc, scheme_type, scheme_rounds, instruction) VALUES (${group},"${title}","${desc}",${scheme_type},"${scheme_rounds}","${instruction}");`,
  );

  return res;
}

async function createWorkoutItem(data) {
  const workoutData = Object.fromEntries(data['_parts']);

  const items = JSON.parse(workoutData['items']) as WorkoutItemProps[];
  const workout_id = workoutData['workout'];
  delete workoutData['items'];
  console.log('createWorkoutItem from data: ', workoutData);
  console.log('createWorkoutItem from data: ', items);
  // Prepare your SQL statement
  // const stmt = db.prepare("INSERT INTO users (id, name, age) VALUES (?, ?, ?)");

  // // Insert each row
  // users_to_insert.forEach((user) => stmt.run(user));

  // // Finalize and close
  // stmt.finalize();
  // db.close();

  // Need to get name ID

  const sql_items = items
    .map(d => {
      const query = `(${workout_id}, ${d['name']['id']},
        ${d['ssid']}, ${d['constant'] ? 1 : 0}, ${d['sets']}, "${d['reps']}",
        ${d['pause_duration']}, "${d['duration']}", ${d['duration_unit']},
        "${d['distance']}", ${d['distance_unit']}, "${d['weights']}",
        "${d['weight_unit']}", ${d['rest_duration']},
        ${d['rest_duration_unit']}, "${d['percent_of']}", ${d['order']}),`;
      return query;
    })
    .join(' ');

  console.log('sql_items: ', sql_items);

  const res = await fetchSQL(
    `INSERT INTO workoutitems
      (workout_id, name_id, ssid, constant, sets, reps, pause_duration,
         duration, duration_unit, distance, distance_unit, weights, weight_unit,
          rest_duration, rest_duration_unit, percent_of, w_order)
    VALUES
     ${sql_items.slice(0, -1)};`,
  );
  console.log('createWorkoutItem:', res);
  return res;
}

async function createDualWorkoutItem(data) {
  console.log('createDualWorkoutItem data: ', data);
  const workoutData = Object.fromEntries(data['_parts']);

  const items = JSON.parse(workoutData['items']) as WorkoutItemProps[];
  const workout_id = workoutData['workout'];
  delete workoutData['items'];
  console.log('create Dual WorkoutItem from data: ', workoutData);
  console.log('create Dual WorkoutItem from data: ', items);

  const sql_items = items
    .map(d => {
      const query = `(${workout_id}, ${d['name']['id']}, ${d['ssid']},
      ${d['constant'] ? 1 : 0}, ${d['sets']}, "${d['reps']}",
      ${d['pause_duration']}, "${d['duration']}", ${d['duration_unit']},
      "${d['distance']}", ${d['distance_unit']}, "${d['weights']}",
      "${d['weight_unit']}", ${d['rest_duration']}, ${d['rest_duration_unit']},
      "${d['percent_of']}", ${d['order']}),`;
      return query;
    })
    .join(' ');

  console.log('sql_items: ', sql_items);

  const res = await fetchSQL(
    `INSERT INTO dualworkoutitems
     (workout_id, name_id, ssid, constant, sets, reps, pause_duration,
       duration, duration_unit, distance, distance_unit, weights, weight_unit,
        rest_duration, rest_duration_unit, percent_of, w_order)
     VALUES
      ${sql_items.slice(0, -1)};`,
  );
  const result = getRows(res);
  console.log('createDualWorkoutItem result:', result);
  return true;
}

async function updateDualWorkoutItem(data) {
  // console.log('updateDualWorkoutItem data: ', data);
  const workoutData = Object.fromEntries(data['_parts']);

  const items = JSON.parse(workoutData['items']) as WorkoutItemProps[];
  const workout_id = workoutData['workout'];
  delete workoutData['items'];
  const workoutGroupID = workoutData['workoutgroup_id'];
  // console.log('updateDualWorkoutItem from workoutData: ', workoutData);
  // console.log('updateDualWorkoutItem from items: ', items);

  const promises = items.map(d => {
    const query = `UPDATE dualworkoutitems SET
        r_sets=${d['r_sets']}, r_reps="${d['r_reps']}", r_pause_duration="${d['r_pause_duration']}",
        r_duration="${d['r_duration']}", r_duration_unit=${d['r_duration_unit']}, r_distance="${d['r_distance']}",
        r_distance_unit=${d['r_distance_unit']}, r_weights="${d['r_weights']}", r_weight_unit="${d['r_weight_unit']}",
        r_rest_duration=${d['r_rest_duration']}, r_rest_duration_unit=${d['r_rest_duration_unit']}, r_percent_of="${d['r_percent_of']}"
        WHERE workout_id=${workout_id};`;
    return fetchSQL(query);
  });

  const query = `UPDATE workoutgroups SET finished='1' WHERE id=${workoutGroupID};`; // Hack
  const res = await Promise.all([...promises, fetchSQL(query)]);

  // console.log('updateDualWorkoutItem res:', res);
  return getRows(res);
}

async function finishGroupWorkout(data) {
  // const workoutData = Object.fromEntries(data['_parts']);
  const workoutgroup_id = data;
  console.log('finsih workoutgroup_id: ', workoutgroup_id);
  const query = `UPDATE workoutgroups SET finished='1' WHERE id=${workoutgroup_id};`;
  const res = await fetchSQL(query);

  console.log('finishGroupWorkout res:', res);
  return getRows(res);
}

type RangeURL = {
  query: {
    end_date: string;
    start_date: string;
  };
};

async function getUserWorkoutsByDateRange(url) {
  let {
    query: {end_date, start_date},
  } = parse(url, true) as unknown as RangeURL;

  console.log('parsedUrl:', end_date, start_date);
  if (!start_date) {
    start_date = new Date().toString();
  }
  if (!end_date) {
    end_date = new Date().toString();
  }

  // start_date 2024-2-8
  // end_date 2024-2-23
  const startTime = new Date(start_date).getTime();
  const endTime = new Date(end_date).getTime();

  const query = `SELECT * FROM WorkoutGroups WHERE for_date BETWEEN ${startTime} AND ${endTime};`;
  const res = await fetchSQL(query);

  return await Promise.all(
    getRows(res).map(async workoutGroup => {
      const wg = (await getFullWorkoutGroup(workoutGroup.id))!;
      return {
        ...wg['workout_group'],
        workouts: wg['workouts'],
      };
    }),
  );
}

async function fetchAPI(url, method, data) {
  // Switch on url to generate the query
  let query = '';
  if (!method) {
    method = 'GET';
  }
  if (!data) {
    data = {};
  }

  console.log('FetchAPI: ', method, url, data);
  // Figure out the query.

  /**
   *
   *  Write all the queries for this to work and we should be getting started!!!!
   *
   *
   *
   *
   */
  // Urls
  // profile/workout_groups
  // profile/profile/
  // workoutGroups/POST/
  // workoutGroups/${id}/user_workouts/
  // workoutNames/
  // workoutDualItems/items/POST/
  // workoutGroups/${data}/DELETE/
  // stats/${data.id}/user_workouts/?start_date=${data.startDate}&end_date=${data.endDate}

  // Class reflecting django
  console.log('Switching url: ', url);
  switch (true) {
    case /profile\/workout_groups/.test(url):
      return await getUserWorkouts();

    case /profile\/profile/.test(url):
      return await getProfile();

    case /workoutGroups\/POST/.test(url):
      return await createWorkoutGroup(data);

    case /workoutGroups\/\d+\/user_workouts/.test(url):
      // return await getWorkoutsForUsersWorkoutGroup(url);
      return await getWorkoutsForUsersWorkoutGroupJoined(url);

    case /workoutNames\//.test(url):
      return await getWorkoutNames();

    case /workouts\/POST\//.test(url):
      return await createWorkout(data);

    case /workoutItems\/items\/POST\//.test(url):
      return await createWorkoutItem(data);

    case /workouts\/\d+\/DELETE\//.test(url):
      return await deleteWorkout(url);

    case /workoutDualItems\/items\/POST\//.test(url):
      return await createDualWorkoutItem(data);

    case /workoutDualItems\/record_items\/POST\//.test(url):
      return await updateDualWorkoutItem(data);

    case /workoutGroups\/finish\/POST\//.test(url):
      return await finishGroupWorkout(data);

    case /workoutGroups\/\d+\/DELETE\//.test(url):
      return await deleteGroupWorkout(data);

    // stats/0/user_workouts/?start_date=2024-2-8&end_date=2024-2-23
    case /stats\/\d\/user_workouts\/.*start_date.*end_date.*/.test(url):
      return await getUserWorkoutsByDateRange(url);

    default:
      break;
  }

  // Execute Query
  try {
    return {};
  } catch (err) {
    console.log('Error with API: ', err);
  }
  return null;
}

export {fetchAPI};
