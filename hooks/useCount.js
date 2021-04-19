import {useContext} from 'react';
import {CountContext} from '../App';

const useCount = () => {
  const {count, setCount} = useContext(CountContext);
  return {count, setCount};
};

export default useCount;
