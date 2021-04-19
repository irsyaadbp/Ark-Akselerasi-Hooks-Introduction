import React, {useState, createContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Counter from './components/Counter';
import api from './helper/api';
// function useState(defaultValue) {
// // logic dari tim react
// return [state, setState]
// }
// const App = () => {
//   // const [state, setState] = useState("Irsyaad");
//   const [name, setName] = useState('Irsyaad');
//   // const myState = useState("Irsyaad") // [state, setState];
//   // const name = myState[0] // state
//   // const setName = myState[1]
//   return (
//     <View>
//       <Text>Hello {name}</Text>
//       <TouchableOpacity onPress={() => setName('Budi')}>
//         <Text>Click</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const App = () => {
//   return (
//     <View style={[styles.container]}>
//       <View style={[{flex: 1, backgroundColor: 'blue'}, styles.bgPurple]} />
//       <View style={{flex: 3, backgroundColor: 'green', position: 'relative'}}>
//         <View
//           style={{
//             position: 'absolute',
//             backgroundColor: 'purple',
//             width: 200,
//             height: 200,
//             top: -100,
//             left: 50,
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {backgroundColor: 'red', flex: 1},
//   bgPurple: {backgroundColor: 'white'},
// });

// START CONTEXT
// export const CountContext = createContext();

// const App = () => {
//   const [count, setCount] = useState(1);
//   return (
//     <CountContext.Provider
//       value={{
//         count,
//         setCount,
//       }}>
//       <View style={{flex: 1}}>
//         <Counter />
//       </View>
//     </CountContext.Provider>
//   );
// };
// END CONTEXT\

// Start INfinite scroll
const dummy = [
  {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

const App = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({page: 1, maxPage: 0});
  const [loadMore, setLoadMore] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getFirtsData = async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    };

    getFirtsData();
  }, []);

  const getData = async (page = 1) => {
    try {
      const resp = await api.get('character', {params: {page}});

      setDataCharacter(prev => {
        const resultData =
          page === 1
            ? Array.from(resp.data.results)
            : [...prev, ...resp.data.results];
        return resultData;
      });
      setPagination(prev => ({...prev, maxPage: resp.data.info.pages}));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = pagination.page + 1;

    if (nextPage <= pagination.maxPage) {
      setLoadMore(true);
      await getData(nextPage);
      setLoadMore(false);
    }
  };

  const renderFooter = () => {
    if (!loadMore) return null;

    return (
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size={48} color="red" />
      </View>
    );
  };

  const handleRefresh = async () => {
    setRefresh(true);
    const page = 1;

    await getData(page);
    setPagination(prev => ({...prev, page}));

    setRefresh(false);
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={48} color="red" />
        </View>
      ) : (
        <FlatList
          data={dataCharacter}
          onRefresh={handleRefresh}
          refreshing={refresh}
          renderItem={value => {
            const {item, index} = value;
            return <CardItem item={item} />;
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => {
            return `${item.id}-${index}`;
          }}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const CardItem = ({item}) => {
  return (
    <View style={{flexDirection: 'row', marginBottom: 8}}>
      <Image style={{width: 80, height: 80}} source={{uri: item.image}} />
      <View style={{marginLeft: 16}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
        <Text style={{color: '#aaa'}}>{item.gender}</Text>
      </View>
    </View>
  );
};
// END INFINTE SCROLL

export default App;
