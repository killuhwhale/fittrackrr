import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';
import {WorkoutGroupCardProps} from '../app_components/Cards/types';

import FilterGrid from '../app_components/Grids/FilterGrid';
import {WorkoutGroupSquares} from '../app_components/Grids/GymClasses/WorkoutGroupSquares';
import {
  useGetProfileViewQuery,
  useGetProfileWorkoutGroupsQuery,
} from '../redux/api/apiSlice';
import {
  LargeText,
  TSParagrapghText,
  TSCaptionText,
} from '../app_components/Text/Text';
import {RegularButton} from '../app_components/Buttons/buttons';
import * as RootNavigation from '../navigators/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import BannerAddMembership from '../app_components/ads/BannerAd';

const UserWorkoutsScreen: FunctionComponent = props => {
  const theme = useTheme();

  const {
    data: dataWG,
    isLoading: isLoadingWG,
    isSuccess: isSuccessWG,
    isError: isErrorWG,
    error: errorWG,
  } = useGetProfileWorkoutGroupsQuery('');

  // Dont need since we dont need user id...
  // const {data, isLoading, isSuccess, isError, error} =
  //   useGetProfileViewQuery('');
  console.log('useGetProfileWorkoutGroupsQuery dataWG: ', dataWG);
  // console.log('UserWorkoutsScreen data: ', data);

  const _userWorkouts = dataWG ? dataWG : [];

  const userWorkouts = _userWorkouts?.sort((a, b) =>
    a.for_date > b.for_date ? -1 : 1,
  );
  console.log('_userWorkouts: ', _userWorkouts);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: theme.palette.backgroundColor,
      }}>
      <BannerAddMembership />
      {userWorkouts.length ? (
        <View style={{padding: 12, flex: 1, height: '100%', width: '100%'}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={0.69}
              onPress={() => {
                RootNavigation.navigate('CreateWorkoutGroupScreen', {
                  ownedByClass: false,
                  ownerID: 0,
                  // ownerID: data.user.id,
                });
              }}
              style={{
                backgroundColor: theme.palette.accent,
                padding: 4,
                borderRadius: 112,
              }}>
              <Icon
                name="add"
                color={theme.palette.text}
                style={{fontSize: 24}}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 10}}>
            <FilterGrid
              searchTextPlaceHolder="Search Workouts"
              uiView={WorkoutGroupSquares}
              items={userWorkouts}
              extraProps={{
                editable: true,
              }}
            />
          </View>
        </View>
      ) : (
        <View style={{height: '100%', width: '100%', justifyContent: 'center'}}>
          <TSCaptionText textStyles={{textAlign: 'center', marginBottom: 22}}>
            No workouts!
          </TSCaptionText>
          <View style={{width: '50%', alignSelf: 'center'}}>
            <RegularButton
              underlayColor="#cacacaFF"
              btnStyles={{
                backgroundColor: '#cacaca00',
                borderTopColor: '#cacaca92',
                borderBottomColor: '#cacaca92',
                borderWidth: 2,
                width: '100%',
              }}
              onPress={() => {
                RootNavigation.navigate('CreateWorkoutGroupScreen', {
                  ownedByClass: false,
                  ownerID: 1,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Icon
                  name="add"
                  color={theme.palette.text}
                  style={{fontSize: 32, marginRight: 16}}
                />
                <TSParagrapghText>New workout</TSParagrapghText>
              </View>
            </RegularButton>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserWorkoutsScreen;
