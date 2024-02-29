import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {
  COMPLETED_WORKOUT_MEDIA,
  Container,
  MEDIA_CLASSES,
  WORKOUT_MEDIA,
  CalcWorkoutStats,
  formatLongDate,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  lightRed,
  red,
  green,
  darkRed,
} from '../app_components/shared';
import {
  TSCaptionText,
  TSParagrapghText,
  LargeText,
  TSTitleText,
} from '../app_components/Text/Text';

import {useTheme} from 'styled-components';
import {WorkoutCardFullList} from '../app_components/Cards/cardList';

import {RootStackParamList} from '../navigators/RootStack';
import {StackScreenProps} from '@react-navigation/stack';
import {
  WorkoutCardProps,
  WorkoutDualItemProps,
  WorkoutGroupProps,
} from '../app_components/Cards/types';
import {ScrollView} from 'react-native-gesture-handler';
import {
  FlexAlignType,
  Switch,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  useDeleteCompletedWorkoutGroupMutation,
  useDeleteWorkoutGroupMutation,
  useFinishWorkoutGroupMutation,
  useGetCompletedWorkoutByWorkoutIDQuery,
  useGetCompletedWorkoutQuery,
  useGetUserInfoQuery,
  useGetWorkoutsForGymClassWorkoutGroupQuery,
  useGetWorkoutsForUsersWorkoutGroupQuery,
} from '../redux/api/apiSlice';

import Icon from 'react-native-vector-icons/Ionicons';

import {MediaURLSliderClass} from '../app_components/MediaSlider/MediaSlider';
import ActionCancelModal from '../app_components/modals/ActionCancelModal';
import {StatsPanel} from '../app_components/Stats/StatsPanel';
import {RegularButton} from '../app_components/Buttons/buttons';
import {TestIDs} from '../utils/constants';
import BannerAddMembership from '../app_components/ads/BannerAd';
import FinishDualWorkoutItems from '../app_components/modals/finishDualWorkoutItems';
export type Props = StackScreenProps<RootStackParamList, 'WorkoutScreen'>;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const hasUnfinsihedDualItems = (workouts: WorkoutCardProps[]) => {
  let found = false;
  console.log('Checking hasUnfinsihedDualItems', workouts);
  if (!workouts) return found;
  workouts?.forEach(workout => {
    if (workout.scheme_type > 2) {
      //  Check dualItems
      workout.workout_items?.forEach((item: WorkoutDualItemProps) => {
        console.log('Checking item: ', item.finished);

        if (item.finished === 0) {
          console.log('Checking item: ', item.finished);
          found = true;
        }
      });
    }
  });
  return found;
};

const TitleHeader: FunctionComponent<{groupID: number; title: string}> = ({
  groupID,
  title,
}) => {
  return (
    <Row style={{}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          marginTop: 16,
        }}>
        <View style={{flex: 3}}>
          <TSTitleText textStyles={{textAlign: 'center', marginVertical: 8}}>
            {title} ({groupID}){' '}
          </TSTitleText>
        </View>
      </View>
    </Row>
  );
};

const DateHeader: FunctionComponent<{forDate: string}> = ({forDate}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'flex-end',
      }}>
      <TSCaptionText>{forDate}</TSCaptionText>
    </View>
  );
};
const CaptionHeader: FunctionComponent<{caption: string}> = ({caption}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'flex-start',
        padding: 6,
        marginBottom: 12,
      }}>
      <TSCaptionText>{caption}</TSCaptionText>
    </View>
  );
};
const AddFinishWorkoutPanel: FunctionComponent<{
  openCreateWorkoutScreenForStandard(): void;
  openCreateWorkoutScreenForReps(): void;
  openCreateWorkoutScreenForRounds(): void;
  openCreateWorkoutScreenCreative(): void;
  setShowFinishWorkoutGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  openCreateWorkoutScreenForStandard,
  openCreateWorkoutScreenForReps,
  openCreateWorkoutScreenForRounds,
  openCreateWorkoutScreenCreative,
  setShowFinishWorkoutGroupModal,
}) => {
  const theme = useTheme();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <View
      style={{
        flex: 2,
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
      }}>
      <View
        style={{
          display: showCreate ? 'flex' : 'none',
          flexDirection: 'column',
        }}>
        <RegularButton
          onPress={openCreateWorkoutScreenForStandard.bind(this)}
          testID={TestIDs.CreateRegularWorkoutBtn.name()}
          btnStyles={{
            backgroundColor: '#4285F4',
          }}
          text="Standard"
        />
        <RegularButton
          onPress={openCreateWorkoutScreenForReps.bind(this)}
          btnStyles={{
            backgroundColor: '#DB4437',
          }}
          text="Reps"
        />
        <RegularButton
          onPress={openCreateWorkoutScreenForRounds.bind(this)}
          btnStyles={{
            backgroundColor: '#F4B400',
          }}
          text="Rounds"
        />
        <RegularButton
          onPress={openCreateWorkoutScreenCreative.bind(this)}
          btnStyles={{
            backgroundColor: '#0F9D58',
          }}
          text="Creative"
        />
        {/* <RegularButton
        onPress={openCreateWorkoutScreenForTimeScore.bind(this)}
        btnStyles={{
          backgroundColor: '#2dd4bf',
        }}
        text="Scored Time"
        />
        <RegularButton
        onPress={openCreateWorkoutScreenForTimeLimit.bind(this)}
        btnStyles={{
          backgroundColor: '#38bdf8',
        }}
        text="Time Limit"
      /> */}
      </View>
      <View
        style={{
          flexDirection: showCreate ? 'column' : 'row',
          justifyContent: 'center',
          height: '100%',
        }}>
        <RegularButton
          onPress={() => setShowCreate(!showCreate)}
          testID={TestIDs.ToggleShowCreateWorkoutBtns.name()}
          btnStyles={{
            backgroundColor: showCreate ? theme.palette.gray : green,
          }}
          text={showCreate ? 'X' : 'Add Workout'}
        />

        <RegularButton
          onPress={() => setShowFinishWorkoutGroupModal(true)}
          textStyles={{marginHorizontal: 12}}
          btnStyles={{
            backgroundColor: theme.palette.primary.main,
            display: !showCreate ? 'flex' : 'none',
          }}
          text="Finish"
        />
      </View>
    </View>
  );
};

const DeleteWorkoutToggle: FunctionComponent<{
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
}> = ({editable, setEditable}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <TouchableWithoutFeedback onPress={() => setEditable(!editable)}>
        <View style={{alignItems: 'flex-end'}}>
          <Switch
            value={editable}
            onValueChange={v => {
              setEditable(!editable);
            }}
            trackColor={{
              true: theme.palette.primary.contrastText,
              false: theme.palette.primary.contrastText,
            }}
            thumbColor={editable ? red : theme.palette.gray}
          />
          <TSCaptionText textStyles={{color: editable ? red : 'white'}}>
            Delete mode
            {editable ? ': hold title of workout below to remove.' : ''}
          </TSCaptionText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const WorkoutScreen: FunctionComponent<Props> = ({
  navigation,
  route: {params},
}) => {
  const theme = useTheme();

  const [showFinishDualWorkoutItems, setShowFinishDualWorkoutItems] =
    useState(false);

  const {
    id,
    title,
    caption,
    owned_by_class,
    owner_id,
    media_ids,
    user_id,
    completed,
    finished,
    workout_group,
  } = params.data || {}; // Workout group

  let {
    data,
    isLoading: isDataLoading,
    isSuccess,
    isError,
    refetch,

    error: dataError,
  } = useGetWorkoutsForUsersWorkoutGroupQuery(id);

  const [finishWorkoutGroup, isLoading] = useFinishWorkoutGroupMutation();

  const finishwokoutGroupFunction = async () => {
    const res = await finishWorkoutGroup(id).unwrap();
  };

  // const workoutGroup: WorkoutGroupProps = (
  //   data ? data.workout_group : {}
  // ) as WorkoutGroupProps;
  const workoutGroup = params.data as WorkoutGroupProps;

  console.log('params.data: ', params.data);
  console.log('workoutGroup data: ', data?.workout_group);
  console.log('workoutGroup: ', workoutGroup);

  const [editable, setEditable] = useState(false);
  const [showFinishWorkoutGroupModal, setShowFinishWorkoutGroupModal] =
    useState(false);

  const [deleteWorkoutGroupMutation, {isLoading: isDeleteOGWorkoutGroup}] =
    useDeleteWorkoutGroupMutation();

  const [deleteWorkoutGroupModalVisible, setDeleteWorkoutGroupModalVisible] =
    useState(false);

  const [tags, names] = useMemo(() => {
    if (data?.workouts && data?.workouts.length) {
      const calc = new CalcWorkoutStats();
      // console.log('Calculationg workouts: ', data);
      calc.calcMulti(data?.workouts, false);

      return calc.getStats();
    }
    console.log('Not Calculationg workouts: ');
    return [{} as any, []];
  }, [data]);

  const openCreateWorkoutScreenForStandard = () => {
    navigation.navigate('CreateWorkoutScreen', {
      workoutGroupID: workoutGroup.id.toString(),
      workoutGroupTitle: title,
      schemeType: 0,
    });
  };
  const openCreateWorkoutScreenForReps = () => {
    navigation.navigate('CreateWorkoutScreen', {
      workoutGroupID: workoutGroup.id.toString(),
      workoutGroupTitle: title,
      schemeType: 1,
    });
  };
  const openCreateWorkoutScreenForRounds = () => {
    navigation.navigate('CreateWorkoutScreen', {
      workoutGroupID: workoutGroup.id.toString(),
      workoutGroupTitle: title,
      schemeType: 2,
    });
  };
  const openCreateWorkoutScreenCreative = () => {
    navigation.navigate('CreateWorkoutScreen', {
      workoutGroupID: workoutGroup.id.toString(),
      workoutGroupTitle: title,
      schemeType: 3,
    });
  };
  const openCreateWorkoutScreenForTimeScore = () => {
    navigation.navigate('CreateWorkoutScreen', {
      workoutGroupID: workoutGroup.id.toString(),
      workoutGroupTitle: title,
      schemeType: 4,
    });
  };

  const openCreateWorkoutScreenForTimeLimit = () => {
    navigation.navigate('CreateWorkoutScreen', {
      workoutGroupID: workoutGroup.id.toString(),
      workoutGroupTitle: title,
      schemeType: 5,
    });
  };

  const onConfirmDelete = () => {
    setDeleteWorkoutGroupModalVisible(true);
  };

  const onDelete = async () => {
    // TODO()
    // const delData = new FormData();
    // delData.append('owner_id', oGData.owner_id);
    // delData.append('owned_by_class', oGData.owned_by_class);
    // delData.append('id', oGData.id);
    // console.log('Deleteing workout GORUP', delData);
    const deletedWorkoutGroup = await deleteWorkoutGroupMutation(id).unwrap();
    console.log('Deleting result: ', deletedWorkoutGroup);
    setDeleteWorkoutGroupModalVisible(false);
    navigation.goBack();
  };

  const promptUpdateDualItems = () => {
    const shouldShow = hasUnfinsihedDualItems(data.workouts);
    if (shouldShow) {
      console.log('User needs to submit their results');
      console.log('Workouts length: ', workoutGroup.workouts?.length);
      // Show a modal to allow the user to enter the information for the workouts
      setShowFinishDualWorkoutItems(true);
    }

    console.log('Should prompt user to complete dual items: ', shouldShow);
    return shouldShow;
  };

  const _finishGroupWorkout = async () => {
    // Allow user to submit finish to WorkoutGroup for class.
    const data = new FormData();
    data.append('group', workoutGroup.id);
    try {
      const res = await finishWorkoutGroup(id).unwrap();
      console.log('res finsih', res);
      setShowFinishWorkoutGroupModal(false);
    } catch (err) {
      console.log('Error finishing workout without dual items', err);
    }
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT + 4,
        minHeight: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}>
      <BannerAddMembership />

      <ScrollView
        style={{
          backgroundColor: theme.palette.backgroundColor,
          height: SCREEN_HEIGHT,
          marginBottom: SCREEN_HEIGHT * 0.15,
        }}
        testID={TestIDs.WorkoutScreenScrollView.name()}
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TitleHeader groupID={workoutGroup.id} title={workoutGroup.title} />
        <DateHeader forDate={formatLongDate(new Date(workoutGroup.for_date))} />
        <CaptionHeader caption={workoutGroup.caption} />

        {!data?.workout_group.finished ? (
          <>
            <AddFinishWorkoutPanel
              openCreateWorkoutScreenCreative={openCreateWorkoutScreenCreative}
              openCreateWorkoutScreenForReps={openCreateWorkoutScreenForReps}
              openCreateWorkoutScreenForRounds={
                openCreateWorkoutScreenForRounds
              }
              openCreateWorkoutScreenForStandard={
                openCreateWorkoutScreenForStandard
              }
              setShowFinishWorkoutGroupModal={setShowFinishWorkoutGroupModal}
              key={'testingAFWP'}
            />

            {data?.workouts.length > 0 ? (
              <DeleteWorkoutToggle
                setEditable={setEditable}
                editable={editable}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <View
            style={{
              width: '100%',
              marginRight: 12,
              alignItems: 'flex-end' as FlexAlignType,
            }}>
            <TouchableHighlight onPress={onConfirmDelete}>
              <Icon name="trash" color={darkRed} style={{fontSize: 24}} />
            </TouchableHighlight>
          </View>
        )}

        <Row style={{width: '100%', borderRadius: 8}} />

        {data?.workouts.length ? (
          <>
            <Row style={{width: '100%'}}>
              <TSTitleText textStyles={{marginLeft: 6}}>Stats</TSTitleText>
            </Row>

            <View
              style={{
                flex: 4,
                width: '100%',
                borderRadius: 8,
                // backgroundColor: theme.palette.gray,
                paddingVertical: 20,
                paddingLeft: 10,
              }}>
              <Row>
                <StatsPanel tags={tags} names={names} />
              </Row>
            </View>
            <Row style={{width: '100%', borderRadius: 8}} />

            <Row style={{width: '100%'}}>
              <TSTitleText textStyles={{marginLeft: 6}}>Workouts</TSTitleText>
            </Row>

            <Row style={{width: '100%'}}>
              {isDataLoading ? (
                <TSCaptionText>Loading....</TSCaptionText>
              ) : isSuccess ? (
                <WorkoutCardFullList
                  data={data.workouts}
                  editable={editable}
                  group={workoutGroup}
                />
              ) : isError ? (
                <TSCaptionText>Error.... {dataError?.toString()}</TSCaptionText>
              ) : (
                <TSCaptionText>No Data</TSCaptionText>
              )}
            </Row>
          </>
        ) : (
          <></>
        )}

        <ActionCancelModal
          actionText="Delete Workout Group"
          closeText="Close"
          modalText={`Delete ${title}?`}
          onAction={onDelete}
          modalVisible={deleteWorkoutGroupModalVisible}
          onRequestClose={() => setDeleteWorkoutGroupModalVisible(false)}
        />

        <ActionCancelModal
          actionText="Finish"
          closeText="Close"
          modalText={`Finish ${title}? \n \t cannot be undone`}
          onAction={() => {
            setShowFinishWorkoutGroupModal(false);
            if (!promptUpdateDualItems()) {
              _finishGroupWorkout()
                .then(res => {
                  console.log('workout group finished', res);
                })
                .catch(err => console.log('Failed to finish workout: ', err));
            }
          }}
          modalVisible={showFinishWorkoutGroupModal}
          onRequestClose={() => setShowFinishWorkoutGroupModal(false)}
        />
      </ScrollView>

      <FinishDualWorkoutItems
        bodyText="How many did you do?"
        workoutGroup={{
          ...data?.workout_group,
          workouts: data?.workouts,
        }}
        finishWorkoutGroup={finishwokoutGroupFunction}
        key={'showFinishedDualItems'}
        closeText="Close"
        modalVisible={showFinishDualWorkoutItems}
        onRequestClose={() => setShowFinishDualWorkoutItems(false)}
        setShowFinishWorkoutGroupModal={() =>
          setShowFinishWorkoutGroupModal(false)
        }
      />
    </View>
  );
};

export default WorkoutScreen;
