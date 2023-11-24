// Import the RTK Query methods from the React-specific entry point
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// import EncryptedStorage from 'react-native-encrypted-storage';
import RNSecureStorage, {ACCESSIBLE} from 'killuhwhal3-rn-secure-storage';

import {BASEURL} from '../../utils/constants';
import {
  authDelete,
  authGet,
  authPost,
  refreshAccessToken,
} from '../../utils/fetchAPI';
import auth from '../../utils/auth';
import {Member} from '../../app_components/modals/types';
import CREATE_WORKOUT_GROUPS from './workoutGroupsSQL';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

const readSqlFile = async filePath => {
  try {
    const sqlContent = await RNFS.readFile(filePath, 'utf8');
    return sqlContent;
  } catch (error) {
    console.error('Error reading SQL file:', error);
  }
};
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

function createWorkoutGroupTable(db) {
  db.transaction(tx => {
    tx.executeSql(
      CREATE_WORKOUT_GROUPS,
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error: ' + error);
      },
    );
  });
}

createWorkoutGroupTable(db);

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

const asyncBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string;
      method?: string;
      data?: object;
      params?: {contentType: string};
    },
    any,
    {
      status: number;
      data: string;
    }
  > =>
  async ({url, method, data, params}) => {
    try {
      if (!method) {
        method = 'get';
      }
      const contentType = params?.contentType || 'application/json';

      let options: {method: string; headers: any; body: any} = {
        method: method,
        headers: {
          'Content-Type': contentType, // This has been contentType since I created it and DELETE methods work. All of a sudden it stopped working... until changing it to 'Content-Type'
        },
        body: '',
      };
      console.log('ApiSlice');
      console.log('ApiSlice');
      console.log('Data: ', data);
      console.log('url/ method: ', baseUrl, url, method);
      console.log('BODY: ', baseUrl + url, options);

      /**
       *
       *
       * Still make use of redux...
       *
       * instead of fetching from api with url, we can create some local code that will mock our Djano backend and perform the same operations with local
       * SQL lite file....
       *
       *
       */

      // We make the first auth request using access token
      // Fetch from db...
      // const result = await fetch(baseUrl + url, options);
      // const jResult = await result.json();
      return {data: {}};
    } catch (err: any) {
      console.log('Errorzzzzzz: ', err);
      return {
        error: {
          status: 0,
          data: err.toString(),
        },
      };
    }
  };

// Define our single API slice object

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: asyncBaseQuery({baseUrl: BASEURL}),
  tagTypes: [
    'Gyms',
    'UserGyms',
    'User',
    'UserAuth',
    'GymClasses',
    'GymClassWorkoutGroups',
    'UserWorkoutGroups',
    'WorkoutGroupWorkouts',
    'Coaches',
    'Members',
    'GymFavs',
    'GymClassFavs',
    'StatsQuery',
    'DailySnapshot',
  ],
  endpoints: builder => ({
    // Users, Coaches and Members
    createUser: builder.mutation({
      query: (data = {}) => ({
        url: 'users/',
        method: 'post',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
    }),
    updateUsername: builder.mutation({
      query: (data = {}) => ({
        url: 'users/update_username/',
        method: 'POST',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => {
        return {url: 'users/'};
      },
    }),
    createCoach: builder.mutation({
      query: (data = {}) => ({
        url: 'coaches/',
        method: 'POST',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, err, arg) => [
        {type: 'Coaches', id: arg.gym_class},
      ],
    }),
    getCoachesForGymClass: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: id => {
        return {url: `coaches/${id}/coaches/`};
      },
      providesTags: (result, err, arg) => [{type: 'Coaches', id: arg}],
    }),
    deleteCoach: builder.mutation({
      query: (data = {}) => ({
        url: 'coaches/remove/',
        method: 'DELETE',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Coaches', id: result.gym_class},
      ],
    }),

    createMember: builder.mutation({
      query: (data = {}) => ({
        url: 'classMembers/',
        method: 'POST',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, err, arg) => [
        {type: 'Members', id: arg.gym_class},
      ],
    }),
    getMembersForGymClass: builder.query<Member[], string>({
      // The URL for the request is '/fakeApi/posts'
      query: id => {
        return {url: `classMembers/${id}/members/`};
      },
      providesTags: (result, err, arg) => [{type: 'Members', id: arg}],
    }),
    deleteMember: builder.mutation({
      query: (data = {}) => ({
        url: 'classMembers/remove/',
        method: 'DELETE',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Members', id: result.gym_class},
      ],
    }),

    // Gyms
    getGyms: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => {
        return {url: 'gyms/'};
      },
      providesTags: ['Gyms'],
    }),
    getUserGyms: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => {
        return {url: 'gyms/user_gyms/'};
      },
      providesTags: ['UserGyms'],
    }),
    createGym: builder.mutation({
      query: (data = {}) => ({
        url: 'gyms/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: ['Gyms', 'UserGyms'],
    }),

    favoriteGym: builder.mutation({
      query: data => ({
        url: 'gyms/favorite/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: ['GymFavs'],
    }),
    unfavoriteGym: builder.mutation({
      query: data => ({
        url: 'gyms/unfavorite/',
        method: 'DELETE',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: ['GymFavs'],
    }),
    deleteGym: builder.mutation({
      query: id => ({
        url: `gyms/${id}/`,
        method: 'DELETE',
        data: {nonemptystupidandroid: 1},
        params: {contentType: 'application/json'},
      }),
      invalidatesTags: ['Gyms', 'GymFavs', 'UserGyms'],
    }),
    getGymDataView: builder.query({
      query: id => {
        return {url: `gyms/${id}/gymsclasses/`};
      },
      //
      providesTags: (result, error, arg) => {
        return [{type: 'GymClasses', id: result?.id}];
      },
    }),

    // GymClass
    createGymClass: builder.mutation({
      query: (data = {}) => ({
        url: 'gymClasses/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: 'GymClasses', id: arg.gym}];
      },
    }),

    getGymClassDataView: builder.query({
      query: id => {
        return {url: `gymClasses/${id}/workouts/`};
      },
      providesTags: (result, error, arg) => {
        return [{type: 'GymClassWorkoutGroups', id: result.id}];
      },
    }),

    favoriteGymClass: builder.mutation({
      query: data => ({
        url: 'gymClasses/favorite/',
        method: 'POST',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: ['GymClassFavs'],
    }),
    unfavoriteGymClass: builder.mutation({
      query: data => ({
        url: 'gymClasses/unfavorite/',
        method: 'DELETE',
        data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: ['GymClassFavs'],
    }),
    deleteGymClass: builder.mutation({
      query: data => ({
        url: `gymClasses/${data.gymClassID}/`,
        method: 'DELETE',
        data: {nonemptystupidandroid: 1},
        params: {contentType: 'application/json'},
      }),
      invalidatesTags: (result, err, arg) => [
        {type: 'GymClasses', id: arg.gymID},
        'GymClassFavs',
      ], // Currently, favorites are fetched all at once and search in various places.
    }),

    // Workouts
    getWorkoutNames: builder.query({
      query: () => {
        return {url: 'workoutNames/'};
      },
    }),

    // Workout screen, returns workouts for WorkoutGroup
    // Create workoutItems also needs to invalidate this query
    getWorkoutsForGymClassWorkoutGroup: builder.query({
      query: id => {
        return {url: `workoutGroups/${id}/class_workouts/`};
      },
      providesTags: (result, error, arg) => {
        return [{type: 'WorkoutGroupWorkouts', id: arg}, 'UserWorkoutGroups'];
      },
    }),

    // WorkoutScreen
    getWorkoutsForUsersWorkoutGroup: builder.query({
      query: id => {
        return {url: `workoutGroups/${id}/user_workouts/`};
      },
      providesTags: (result, error, arg) => {
        console.log('Provides tag, WorkoutGroupWorkouts: ', arg);
        return [{type: 'WorkoutGroupWorkouts', id: arg}];
      },
    }),
    createWorkoutGroup: builder.mutation({
      query: (data = {}) => ({
        url: 'workoutGroups/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, err, arg) => {
        const data = new Map<string, string>(arg._parts);

        return data.get('owned_by_class')
          ? [{type: 'GymClassWorkoutGroups', id: data.get('owner_id')}]
          : ['UserWorkoutGroups'];
      },
    }),
    finishWorkoutGroup: builder.mutation({
      query: (data = {}) => ({
        url: 'workoutGroups/finish/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (result, error, arg) => {
        // inavlidates query for useGetWorkoutsForGymClassWorkoutGroupQuery
        const data = new Map<string, string>(arg._parts);

        return [
          {type: 'WorkoutGroupWorkouts', id: data.get('group')},
          'DailySnapshot',
        ];
      },
    }),
    deleteWorkoutGroup: builder.mutation({
      query: data => {
        const mapData = new Map<string, string>(data._parts);

        return {
          url: `workoutGroups/${mapData.get('id')}/`,
          method: 'DELETE',
          data,
          params: {contentType: 'multipart/form-data'},
        };
      },
      invalidatesTags: (result, err, arg) => {
        const data = new Map<string, string>(arg._parts);

        return data.get('owned_by_class')
          ? [
              {type: 'GymClassWorkoutGroups', id: data.get('owner_id')},
              'DailySnapshot',
            ]
          : ['UserWorkoutGroups', 'DailySnapshot'];
      },
    }),

    createWorkout: builder.mutation({
      query: (data = {}) => ({
        url: 'workouts/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      // When creating a workout, we create it and then create the items immediately after.
      // So we will invalidate on createWorkoutTtems
      // invalidatesTags: (result, error, arg) => {
      //   if (error) {
      //     return [];
      //   }
      //   const data = new Map<string, string>(arg._aprts);
      //   return [{type: 'WorkoutGroupWorkouts', id: data.get('group')}];
      // },
    }),
    deleteWorkout: builder.mutation({
      query: arg => {
        const data = new Map<string, string>(arg._parts);

        return {
          url: `workouts/${data.get('id')}/`,
          method: 'DELETE',
          data: {nonemptystupidandroid: 1},
          params: {contentType: 'multipart/form-data'},
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }
        const data = new Map<string, string>(arg._parts);

        return [{type: 'WorkoutGroupWorkouts', id: data.get('group')}];
      },
    }),

    createWorkoutItems: builder.mutation({
      query: (data = {}) => ({
        url: 'workoutItems/items/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (resut, error, arg) => {
        const data = new Map<string, string>(arg._parts);
        console.log(
          'Invalidating create normal Item: ',
          data.get('workout_group'),
          data,
        );
        return [
          {type: 'WorkoutGroupWorkouts', id: data.get('workout_group')},
          {type: 'UserWorkoutGroups'},
          {type: 'StatsQuery'},
          {type: 'DailySnapshot'},
        ];
      },
    }),

    createWorkoutDualItems: builder.mutation({
      query: (data = {}) => ({
        url: 'workoutDualItems/items/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (resut, error, arg) => {
        const data = new Map<string, string>(arg._parts);
        console.log(
          'Invalidating create Dual Item: ',
          data.get('workout_group'),
          data,
        );
        return [
          {type: 'WorkoutGroupWorkouts', id: data.get('workout_group')},
          {type: 'UserWorkoutGroups'},
          {type: 'StatsQuery'},
          {type: 'DailySnapshot'},
        ];
      },
    }),

    updateWorkoutDualItems: builder.mutation({
      query: (data = {}) => ({
        url: 'workoutDualItems/record_items/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      invalidatesTags: (resut, error, arg) => {
        const data = new Map<string, string>(arg._parts);

        return [
          {type: 'WorkoutGroupWorkouts', id: data.get('workout_group')},
          {type: 'UserWorkoutGroups'},
          {type: 'StatsQuery'},
          {type: 'DailySnapshot'},
        ];
      },
    }),

    // Completed Workouts
    createCompletedWorkout: builder.mutation({
      query: (data = {}) => ({
        url: 'completedWorkoutGroups/',
        method: 'POST',
        data: data,
        params: {contentType: 'multipart/form-data'},
      }),
      // IF user completes Class workout, Invalidate both UserWorkoutGroups and  classWorkoutGroups/classID
      // If user complete non class workout, just invaldiate UserWorkoutGroups

      // Should also invalidate WorkoutScreen so that it shows the new completedworkout so user can toggle back and forth.

      // From GymClass -> completed workout screen we get:
      /**
       * title
       * caption
       * for_date
       * workouts: []
       * workout_group: id
       */
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        const data = new Map<string, string>(arg._parts);
        // Cases:
        // 1. A user completes a WorkoutGroup from a gym Class
        // 2. A user completes a WorkoutGroup from another User.
        //      - TODO() We do not have a search feature, to find other users workouts yet.
        return [
          {type: 'WorkoutGroupWorkouts', id: data.get('workout_group')}, // Reset WorkoutScreen
          'UserWorkoutGroups', // Reset Profile workout list
          {type: 'GymClassWorkoutGroups', id: data.get('owner_id')},
          {type: 'StatsQuery'},
          {type: 'DailySnapshot'},
        ];
      },
    }),
    getCompletedWorkout: builder.query({
      query: id => ({
        url: `completedWorkoutGroups/${id}/completed_workout_group/`,
      }),
    }),
    getCompletedWorkoutByWorkoutID: builder.query({
      query: id => ({
        url: `completedWorkoutGroups/${id}/completed_workout_group_by_og_workout_group/`,
      }),
      providesTags: (result, error, arg) => {
        return [{type: 'WorkoutGroupWorkouts', id: arg}];
      },
    }),
    deleteCompletedWorkoutGroup: builder.mutation({
      query: data => {
        const mappedData = new Map<string, string>(data._parts);
        return {
          url: `completedWorkoutGroups/${mappedData.get('id')}/`,
          method: 'DELETE',
          data: {nonemptystupidandroid: 1},
          params: {contentType: 'application/json'},
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        const data = new Map<string, string>(arg._parts);

        // Cases:
        // 1. A user completes a WorkoutGroup from a gym Class
        // 2. A user completes a WorkoutGroup from another User.
        //      - TODO() We do not have a search feature, to find other users workouts yet.
        return [
          {type: 'WorkoutGroupWorkouts', id: data.get('workout_group')}, // Reset WorkoutScreen
          'UserWorkoutGroups', // Reset Profile workout list
          {type: 'GymClassWorkoutGroups', id: data.get('owner_id')},
        ];
      },
    }),

    deleteCompletedWorkout: builder.mutation({
      query: id => ({
        url: `completedWorkouts/${id}/`,
        method: 'DELETE',
        data: {nonemptystupidandroid: 1},
        params: {contentType: 'application/json'},
      }),
    }),

    // User and Profile
    getProfileView: builder.query({
      query: () => {
        return {url: 'profile/profile/'};
      },
      providesTags: ['User'],
    }),
    // Expanded Profile data view
    getProfileWorkoutGroups: builder.query({
      query: () => {
        return {url: 'profile/workout_groups/'};
      },
      providesTags: ['UserWorkoutGroups'],
    }),
    getProfileGymFavs: builder.query({
      query: () => {
        return {url: 'profile/gym_favs/'};
      },
      providesTags: ['GymFavs'],
    }),
    getProfileGymClassFavs: builder.query({
      query: () => {
        return {url: 'profile/gym_class_favs/'};
      },
      providesTags: ['GymClassFavs'],
    }),

    getUserInfo: builder.query({
      query: id => {
        return {url: 'users/user_info/'};
      },
      providesTags: ['User'],
    }),

    validateUserToken: builder.query({
      query: id => {
        return {url: 'users/user_info/'};
      },
      providesTags: ['UserAuth'],
    }),

    // Stats
    getCompletedWorkoutGroupsForUserByDateRange: builder.query({
      query: (data = {}) => {
        return {
          url: `stats/${data.id}/user_workouts/?start_date=${data.startDate}&end_date=${data.endDate}`,
        };
      },
      providesTags: (result, error, arg) => {
        return [{type: 'StatsQuery', id: arg}];
      },
    }),

    getDailySnapshot: builder.query({
      query: id => {
        return {url: 'snapshot/user_daily/'};
      },
      providesTags: ['DailySnapshot'],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useCreateUserMutation,
  useUpdateUsernameMutation,
  useCreateCoachMutation,
  useGetCoachesForGymClassQuery,
  useDeleteCoachMutation,

  useCreateMemberMutation,
  useDeleteMemberMutation,
  useGetMembersForGymClassQuery,

  useGetUsersQuery,
  useGetGymsQuery,
  useGetGymDataViewQuery,

  useGetGymClassDataViewQuery,

  useGetUserInfoQuery,
  useValidateUserTokenQuery,
  useGetUserGymsQuery,
  useGetProfileViewQuery,
  useGetProfileWorkoutGroupsQuery,
  useGetProfileGymFavsQuery,
  useGetProfileGymClassFavsQuery,

  useGetWorkoutNamesQuery,

  useGetWorkoutsForGymClassWorkoutGroupQuery,
  useGetWorkoutsForUsersWorkoutGroupQuery,

  useGetCompletedWorkoutQuery,
  // usesTagLabelsByWorkoutIDQuery,
  useGetCompletedWorkoutByWorkoutIDQuery,
  useDeleteCompletedWorkoutGroupMutation,
  useDeleteCompletedWorkoutMutation,

  useCreateGymMutation,
  useDeleteGymMutation,
  useFavoriteGymMutation,
  useUnfavoriteGymMutation,

  useCreateGymClassMutation,
  useFavoriteGymClassMutation,
  useUnfavoriteGymClassMutation,
  useDeleteGymClassMutation,

  useFinishWorkoutGroupMutation,

  useDeleteWorkoutMutation,
  useCreateWorkoutGroupMutation,
  useDeleteWorkoutGroupMutation,
  useCreateWorkoutMutation,
  useCreateWorkoutItemsMutation,
  useCreateWorkoutDualItemsMutation,
  useUpdateWorkoutDualItemsMutation,
  useCreateCompletedWorkoutMutation,
  useGetCompletedWorkoutGroupsForUserByDateRangeQuery,
  useGetDailySnapshotQuery,
  // usesTagLabelsGroupsForUserByDateRangeQuery,
} = apiSlice;
