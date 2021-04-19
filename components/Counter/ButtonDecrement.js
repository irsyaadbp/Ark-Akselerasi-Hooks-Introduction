import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import useCount from '../../hooks/useCount';

const ButtonDecrement = () => {
  const {setCount} = useCount();
  return (
    <TouchableOpacity
      onPress={() => {
        setCount(prev => prev - 1);
      }}>
      <Text style={{color: 'red'}}>Decrement</Text>
    </TouchableOpacity>
  );
};

export default ButtonDecrement;
