import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';
import {useTheme} from 'styled-components';
import {TSCaptionText, TSParagrapghText} from '../Text/Text';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../shared';
import {WorkoutGroupCardProps} from './types';
import bluish from './../../../assets/bgs/bluish.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Props as GymClassScreenProps} from '../../app_pages/GymClassScreen';
import {dateFormat} from '../../app_pages/StatsScreen';

const CardBG = styled.ImageBackground`
  height: ${SCREEN_HEIGHT * 0.25}px;
  width: ${SCREEN_WIDTH * 0.92}px;
  border-radius: 25px;
  marginbottom: 12px;
  resize-mode: cover;
  overflow: hidden;
  background-color: linear-gradient(90deg, #0700b8 0%, #00ff88 100%);
`;

const CardFooterBG = styled.ImageBackground`
  resize-mode: cover;
  border-radius: 25px;
  background-color: ${props => props.theme.palette.transparent};
  flex: 1;
  overflow: hidden;
`;

const CardTouchable = styled.TouchableHighlight`
  height: 100%;
  border-radius: 25px;
`;

const TouchableView = styled.View`
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
const CardContainer = styled.View`
  background-color: linear-gradient(90deg, #0700b8 0%, #00ff88 100%);
  height: ${SCREEN_HEIGHT * 0.25}px;
  width: ${SCREEN_WIDTH * 0.92}px;
  border-radius: 25px;
  marginbottom: 12px;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 80%;
  resize-mode: contain;
`;

const LogoImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  flex: 1;
`;

const WorkoutGroupCard: FunctionComponent<{
  card: WorkoutGroupCardProps;
  editable: boolean;
  closeParentModal(): undefined;
}> = props => {
  const theme = useTheme();

  const navigation = useNavigation<GymClassScreenProps['navigation']>();
  const handlePress = () => {
    props.closeParentModal();
    navigation.navigate('WorkoutScreen', {
      data: props.card,
      editable: props.editable ? true : false,
    });
  };

  return (
    <CardBG
      source={bluish}
      style={{
        borderWidth: 3,
        borderColor: props.card.completed ? '#00fff29c' : 'white',
      }}>
      <CardTouchable
        underlayColor={theme.palette.transparent}
        activeOpacity={0.9}
        onPress={handlePress}>
        <TouchableView>
          <View
            style={{
              width: '100%',
              height: '65%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 16,
            }}>
            <TSParagrapghText>{props.card.caption}</TSParagrapghText>
            <TSCaptionText>
              {dateFormat(new Date(props.card.for_date))}
            </TSCaptionText>
          </View>

          <CardRow style={{height: '25%'}}>
            <CardFooterBG source={bluish}>
              <CardRow style={{height: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 5}}>
                    <TSParagrapghText
                      textStyles={{textAlign: 'left', marginLeft: 16}}>
                      {props.card.title}
                    </TSParagrapghText>
                  </View>
                  {props.card.owned_by_class === true ? (
                    <></>
                  ) : (
                    <View style={{flex: 2}}>
                      <TSCaptionText
                        textStyles={{textAlign: 'right', marginRight: 14}}>
                        created by:{' '}
                        {props.card.owned_by_class === false ? 'you' : 'class'}
                      </TSCaptionText>
                    </View>
                  )}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="checkmark-circle-outline"
                      color={
                        props.card.completed
                          ? theme.palette.primary.main
                          : theme.palette.text
                      }
                      style={{fontSize: 32, marginRight: 8}}
                    />
                  </View>
                </View>
              </CardRow>
            </CardFooterBG>
          </CardRow>
        </TouchableView>
      </CardTouchable>
    </CardBG>
  );
};
