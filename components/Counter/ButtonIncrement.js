import React, {useContext} from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import {CountContext} from '../../App';

const ButtonIncrement = () => {
  const {setCount} = useContext(CountContext);
  return (
    <TouchableOpacity
      onPress={() => {
        setCount(prev => prev + 1);
      }}>
      <Text style={{color: 'green'}}>Increment</Text>
    </TouchableOpacity>
  );
};

export default ButtonIncrement;
