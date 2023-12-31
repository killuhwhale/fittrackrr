import {
  WorkoutCardProps,
  WorkoutCategoryProps,
  WorkoutItemProps,
} from '../src/app_components/Cards/types';
import {CalcWorkoutStats} from '../src/app_components/shared';

test('Stats are correct', () => {
  const items = [
    {
      constant: false,
      date: '2022-12-04T06:16:07.975565Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 17,
      name: {
        categories: [{title: 'Lowerbody'}],
        date: '2022-11-12T01:28:24.863962Z',
        desc: 'Back squat, if loaded. Parallel.',
        id: 1,
        media_ids: '[]',
        name: 'Squat',
        primary: {title: 'Lowerbody'} as WorkoutCategoryProps,
        secondary: {title: ''} as WorkoutCategoryProps,
      },
      order: 0,
      percent_of: '',
      reps: '[1]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[10,20,30]',
      workout: 10,
    },
    {
      constant: false,
      date: '2022-12-04T06:16:07.975599Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 18,
      name: {
        categories: [{title: 'Lowerbody'}],
        date: '2022-11-12T01:28:24.912252Z',
        desc: 'Floor to sholder',
        id: 6,
        media_ids: '[]',
        name: 'Clean',
        primary: {title: 'Lowerbody'},
        secondary: {title: 'Lowerbody'},
      },
      order: 1,
      percent_of: '',
      reps: '[2]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[15,25,35]',
      workout: 10,
    },
    {
      constant: true,
      date: '2022-12-04T06:16:07.975599Z',
      distance: '[400]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 18,
      name: {
        categories: [{title: 'Cardio'}],
        date: '2022-11-12T01:28:24.912252Z',
        desc: 'Runfaast',
        id: 6,
        media_ids: '[]',
        name: 'Sprint',
        primary: {title: 'Lowerbody'},
        secondary: {title: 'Lowerbody'},
      },
      order: 1,
      percent_of: '',
      reps: '[0]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[0]',
      workout: 10,
    },
  ] as WorkoutItemProps[];

  const calculator = new CalcWorkoutStats();
  calculator.setWorkoutParams('12 9 6', 1, items);
  calculator.calc();

  expect(calculator.tags.Lowerbody).toEqual({
    totalReps: 81,
    totalLbs: 3769.9001999999996,
    totalKgs: 1710,
    totalTime: 0,
    totalKgSec: 0,
    totalLbSec: 0,
    totalDistanceM: 1200,
    totalKgM: 0,
    totalLbM: 0,
    key: 'Lowerbody',
  });
});

test('Stats multiple stats are correct w/ constant distance', () => {
  const items = [
    {
      constant: false,
      date: '2022-12-04T06:16:07.975565Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 17,
      name: {
        categories: [{title: 'Lowerbody'}],
        date: '2022-11-12T01:28:24.863962Z',
        desc: 'Back squat, if loaded. Parallel.',
        id: 1,
        media_ids: '[]',
        name: 'Squat',
        primary: {title: 'Lowerbody'} as WorkoutCategoryProps,
        secondary: {title: ''} as WorkoutCategoryProps,
      },
      order: 0,
      percent_of: '',
      reps: '[1]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[10,20,30]',
      workout: 10,
    },
    {
      constant: false,
      date: '2022-12-04T06:16:07.975599Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 18,
      name: {
        categories: [{title: 'Lowerbody'}],
        date: '2022-11-12T01:28:24.912252Z',
        desc: 'Floor to sholder',
        id: 6,
        media_ids: '[]',
        name: 'Clean',
        primary: {title: 'Lowerbody'},
        secondary: {title: 'Lowerbody'},
      },
      order: 1,
      percent_of: '',
      reps: '[2]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[15,25,35]',
      workout: 10,
    },
    {
      constant: true,
      date: '2022-12-04T06:16:07.975599Z',
      distance: '[400]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 18,
      name: {
        categories: [{title: 'Cardio'}],
        date: '2022-11-12T01:28:24.912252Z',
        desc: 'Runfaast',
        id: 6,
        media_ids: '[]',
        name: 'Sprint',
        primary: {title: 'Lowerbody'},
        secondary: {title: 'Lowerbody'},
      },
      order: 1,
      percent_of: '',
      reps: '[0]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[0]',
      workout: 10,
    },
  ] as WorkoutItemProps[];

  const calculator = new CalcWorkoutStats();
  const workouts = [
    {
      date: '2022-12-04T06:16:07.697201Z',
      desc: 'B',
      group: {
        archived: false,
        caption: 'Ghj',
        date: '2022-12-04T02:35:12.356160Z',
        date_archived: '',
        finished: false,
        for_date: '2022-12-03T00:00:00Z',
        id: 12,
        media_ids: '[]',
        owned_by_class: false,
        owner_id: '1',
        title: 'Test duration',
      },
      id: 10,
      scheme_rounds: '12 9 6',
      scheme_type: 1,
      title: 'A',
      workout_items: items,
    },
    {
      date: '2022-12-04T06:16:07.697201Z',
      desc: 'B',
      group: {
        archived: false,
        caption: 'Ghj',
        date: '2022-12-04T02:35:12.356160Z',
        date_archived: '',
        finished: false,
        for_date: '2022-12-03T00:00:00Z',
        id: 12,
        media_ids: '[]',
        owned_by_class: false,
        owner_id: '1',
        title: 'Test duration',
      },
      id: 10,
      scheme_rounds: '12 9 6',
      scheme_type: 1,
      title: 'A',
      workout_items: items,
    },
  ] as WorkoutCardProps[];

  calculator.calcMulti(workouts);

  expect(calculator.tags.Lowerbody).toEqual({
    totalReps: 81 * 2,
    totalLbs: Math.round((3769.9001999999996 * 2 + Number.EPSILON) * 1e6) / 1e6,
    totalKgs: 1710 * 2,
    totalTime: 0,
    totalKgSec: 0,
    totalLbSec: 0,
    totalDistanceM: 2400,
    totalKgM: 0,
    totalLbM: 0,
    key: 'Lowerbody',
  });
});

test('Stats multiple stats are correct w/ constant duration', () => {
  const items = [
    {
      constant: false,
      date: '2022-12-04T06:16:07.975565Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 17,
      name: {
        categories: [{title: 'Lowerbody'}],
        date: '2022-11-12T01:28:24.863962Z',
        desc: 'Back squat, if loaded. Parallel.',
        id: 1,
        media_ids: '[]',
        name: 'Squat',
        primary: {title: 'Lowerbody'} as WorkoutCategoryProps,
        secondary: {title: ''} as WorkoutCategoryProps,
      },
      order: 0,
      percent_of: '',
      reps: '[1]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[10,20,30]',
      workout: 10,
    },
    {
      constant: false,
      date: '2022-12-04T06:16:07.975599Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[0]',
      duration_unit: 0,
      id: 18,
      name: {
        categories: [{title: 'Lowerbody'}],
        date: '2022-11-12T01:28:24.912252Z',
        desc: 'Floor to sholder',
        id: 6,
        media_ids: '[]',
        name: 'Clean',
        primary: {title: 'Lowerbody'},
        secondary: {title: 'Lowerbody'},
      },
      order: 1,
      percent_of: '',
      reps: '[2]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[15,25,35]',
      workout: 10,
    },
    {
      constant: true,
      date: '2022-12-04T06:16:07.975599Z',
      distance: '[0]',
      distance_unit: 0,
      duration: '[400]',
      duration_unit: 0,
      id: 18,
      name: {
        categories: [{title: 'Cardio'}],
        date: '2022-11-12T01:28:24.912252Z',
        desc: 'Runfaast',
        id: 6,
        media_ids: '[]',
        name: 'Sprint',
        primary: {title: 'Lowerbody'},
        secondary: {title: 'Lowerbody'},
      },
      order: 1,
      percent_of: '',
      reps: '[0]',
      rest_duration: 0,
      rest_duration_unit: 0,
      sets: 0,
      pause_duration: 0,
      ssid: -1,
      weight_unit: 'kg',
      weights: '[0]',
      workout: 10,
    },
  ] as WorkoutItemProps[];

  const calculator = new CalcWorkoutStats();
  const workouts = [
    {
      date: '2022-12-04T06:16:07.697201Z',
      desc: 'B',
      group: {
        archived: false,
        caption: 'Ghj',
        date: '2022-12-04T02:35:12.356160Z',
        date_archived: '',
        finished: false,
        for_date: '2022-12-03T00:00:00Z',
        id: 12,
        media_ids: '[]',
        owned_by_class: false,
        owner_id: '1',
        title: 'Test duration',
      },
      id: 10,
      scheme_rounds: '12 9 6',
      scheme_type: 1,
      title: 'A',
      workout_items: items,
    },
    {
      date: '2022-12-04T06:16:07.697201Z',
      desc: 'B',
      group: {
        archived: false,
        caption: 'Ghj',
        date: '2022-12-04T02:35:12.356160Z',
        date_archived: '',
        finished: false,
        for_date: '2022-12-03T00:00:00Z',
        id: 12,
        media_ids: '[]',
        owned_by_class: false,
        owner_id: '1',
        title: 'Test duration',
      },
      id: 10,
      scheme_rounds: '12 9 6',
      scheme_type: 1,
      title: 'A',
      workout_items: items,
    },
  ] as WorkoutCardProps[];

  calculator.calcMulti(workouts);

  expect(calculator.tags.Lowerbody).toEqual({
    totalReps: 81 * 2,
    totalLbs: Math.round((3769.9001999999996 * 2 + Number.EPSILON) * 1e6) / 1e6,
    totalKgs: 1710 * 2,
    totalTime: 2400,
    totalKgSec: 0,
    totalLbSec: 0,
    totalDistanceM: 0,
    totalKgM: 0,
    totalLbM: 0,
    key: 'Lowerbody',
  });
});
