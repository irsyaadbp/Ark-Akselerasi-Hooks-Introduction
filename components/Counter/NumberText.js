import React, {useContext} from 'react';
import {Text} from 'react-native';
import {CountContext} from '../../App';

const NumberText = () => {
  const {count} = useContext(CountContext);
  return <Text style={{fontSize: 36}}>{count}</Text>;
};

export default NumberText;
