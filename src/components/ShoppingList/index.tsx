import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .doc("S4Zf2iymW6VbYhy6pWJ5")
  //     .get()
  //     .then(response => {
  //       console.log({
  //         id: response.id,
  //         ...response.data()
  //       })
  //     })
  // }, [])

  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .get()
  //     .then(response => {
  //       const data = response.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         } as ProductProps
  //       });
  //       setProducts(data);
  //     })
  //     .catch(error => console.log(error))
  // }, []);

  useEffect(() => {
    const subscripbe = firestore()
      .collection("products")
      // .limit(2)
      .orderBy("quantity")
      // .startAfter(2)
      // .endAt(4)
      // .where("quantity", ">=", 3)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          } as ProductProps
        });

        setProducts(data);
      });

    return () => subscripbe();

  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
