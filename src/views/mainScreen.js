import React from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';

import IconButton from '../components/iconButton';
import ScaledImage from '../components/scaledImage';

const BUTTON_HEIGHT = 75;
const MAP_PADDING_VERTICAL = 10;
const IMAGE_HEIGHT = Dimensions.get('window').height - BUTTON_HEIGHT - (2*MAP_PADDING_VERTICAL) ;
const CAR_HEIGHT = IMAGE_HEIGHT/4;

export default function MainScreen() {

  const [direction,setDirection] = React.useState('E');

  const [isDisabled,setIsDisabled] = React.useState(false);
  const [isWaiting,setIsWaiting] = React.useState(false);

  const [degree,setDegree] = React.useState(0);

  const [locationX,setLocationX] = React.useState(0);
  const [locationY,setLocationY] = React.useState(0);

  const [indexX,setIndexX] = React.useState(0);
  const [indexY,setIndexY] = React.useState(0);

  const [rotateStylesForCar,setRotateStylesForCar] = React.useState({});
  const [locationStylesForCar,setLocationStylesForCar] = React.useState({});

  React.useEffect(()=>{
    if((indexY === 0 && direction === 'N') || (indexY === 3 && direction === 'S') || (indexX === 0 && direction === 'W' ) || (indexX === 6 && direction === 'E' )){
      setIsDisabled(true);
    }
    else{
      setIsDisabled(false);
    }
  },[direction,locationX,locationY]);

  function reset() {
    setDirection('E');
    setDegree(0);
    setLocationX(0);
    setLocationY(0);
    setIndexX(0);
    setIndexY(0);
    setRotateStylesForCar({});
    setLocationStylesForCar({});
  }

  function turnRight(){
    setIsWaiting(true);
    let animation = new Animated.Value(degree);
    const interpolationForTurnRight = animation.interpolate({
      inputRange:[degree, degree+90],
      outputRange:[`${degree}deg`,`${degree+90}deg`]
    });

    setRotateStylesForCar({
      transform : [{
        rotate: interpolationForTurnRight
      }]
    });

    Animated
      .timing(animation, {
        duration: 500,
        toValue: degree+90,
        useNativeDriver: true
      })
      .start(()=>{
        setDegree(degree+90);
        if(direction === 'E'){
          setDirection('S');
        }else if(direction ==='S'){
          setDirection('W');
        }else if(direction ==='W'){
          setDirection('N');
        }else if(direction ==='N'){
          setDirection('E');
        }
        setIsWaiting(false);
      });
  }

  function turnLeft(){
    setIsWaiting(true);
    let animation = new Animated.Value(degree);
    const interpolationForTurnLeft = animation.interpolate({
      inputRange:[degree, degree+90 ],
      outputRange:[`${degree}deg`,`${degree-90}deg`]
    });

    setRotateStylesForCar({
      transform : [{
        rotate: interpolationForTurnLeft
      }]
    });

    Animated
      .timing(animation, {
        duration: 500,
        toValue: degree+90,
        useNativeDriver: true
      })
      .start(()=>{
        setDegree(degree-90);
        if(direction === 'E'){
          setDirection('N');
        }else if(direction ==='N'){
          setDirection('W');
        }else if(direction ==='W'){
          setDirection('S');
        }else if(direction ==='S'){
          setDirection('E');
        }
        setIsWaiting(false);
      });
  }

  function go() {
    setIsWaiting(true);

    if(direction === 'E'){
      setIndexX(indexX+1)
    }else if(direction ==='S'){
      setIndexY(indexY+1)
    }else if(direction ==='W'){
      setIndexX(indexX-1)
    }else if(direction ==='N'){
      setIndexY(indexY-1)
    }

    if(direction === 'E' || direction === 'W'){
      let animation = new Animated.Value(locationX);
      setLocationStylesForCar({
        transform: [
          {
            translateX: animation,
            translateY: locationY,
          }
        ]
      });

      Animated
        .timing(animation, {
          toValue: direction === 'E' ? locationX+CAR_HEIGHT : locationX-CAR_HEIGHT,
          duration: 500,
          useNativeDriver: true
        })
        .start(()=>{
          direction === 'E' ? setLocationX(locationX+CAR_HEIGHT): setLocationX(locationX-CAR_HEIGHT);
          setIsWaiting(false);
        });
    }else if(direction === 'N' || direction === 'S'){
      let animation = new Animated.Value(locationY);
      setLocationStylesForCar({
        transform: [
          {
            translateX: locationX,
            translateY: animation
          }
        ]
      });

      Animated
        .timing(animation, {
          toValue: direction === 'S' ? locationY+CAR_HEIGHT : locationY-CAR_HEIGHT,
          duration: 500,
          useNativeDriver: true
        })
        .start(()=>{
          direction === 'S' ? setLocationY(locationY+CAR_HEIGHT): setLocationY(locationY-CAR_HEIGHT);
          setIsWaiting(false);
        });
    }

  }

    return (
      <View style={styles.screenContainer}>

        <View style={styles.body}>

          <View style={styles.playGround}>
            <View style={styles.map}>
              <ScaledImage
                source={require('../assets/maps/map1.png')}
                height={IMAGE_HEIGHT}
              />
            </View>
            <Animated.View style={[styles.car, locationStylesForCar ]} >
              <Animated.View style={[styles.car2, rotateStylesForCar]} >
                <ScaledImage
                  source={require('../assets/car.png')}
                  height={CAR_HEIGHT}
                />
              </Animated.View>
            </Animated.View>

          </View>

        </View>

        <View style={styles.buttons}>

            <IconButton
              iconName={'stop'}
              iconColor={'#b83a1e'}
              disabled={isWaiting}
              onPress={() => reset()}
            />

            <IconButton
              iconName={'rotate-left'}
              disabled={isWaiting}
              onPress={() => turnLeft()}
            />

            <IconButton
              iconName={'arrow-up'}
              disabled={isDisabled || isWaiting}
              onPress={() => go()}
            />

            <IconButton
              iconName={'rotate-right'}
              disabled={isWaiting}
              onPress={() => turnRight()}
            />

            <IconButton
              iconName={'play'}
              disabled={isWaiting}
              iconColor={'#2ea44f'}
            />

        </View>

      </View>
    );
}

const styles = StyleSheet.create({
  screenContainer:{
    flex:1,
  },
  body:{
    flex:1,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  buttons:{
    height: BUTTON_HEIGHT,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  playGround:{
    position: 'relative',
  },
  map:{
    paddingVertical:MAP_PADDING_VERTICAL,
  },
  car:{
    top:MAP_PADDING_VERTICAL,
    left:0,
    position:'absolute',
  },
  car2:{
    top:0,
    left:0,
    position:'absolute',
  }
});
