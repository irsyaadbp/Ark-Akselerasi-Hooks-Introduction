import React from 'react';
import {View} from 'react-native';
import NumberText from './NumberText';
import ButtonIncrement from './ButtonIncrement';
import ButtonDecrement from './ButtonDecrement';
const Counter = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <NumberText />
      <ButtonIncrement />
      <ButtonDecrement />
    </View>
  );
};

export default Counter;
