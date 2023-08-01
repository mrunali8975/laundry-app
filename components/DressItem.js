import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQty, decrementQty } from '../ProductReducer';
import { addToCart } from '../CartReducer';
import { incrementQuantity, decrementQuantity } from '../CartReducer';

const DressItem = ({ item ,index}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item));  //cart
    dispatch(incrementQty(item)); //product
  };
  return (
    <View key={index}>
      <Pressable
        style={{
          backgroundColor: '#F8F8F8',
          borderRadius: 8,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 14
        }}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: '500',
              marginBottom: 7
            }}
          >
            {item.name}
          </Text>
          <Text style={{ width: 80, color: 'gray', fontSize: 15 }}>
            ${item.price}
          </Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
            
          >
            <Pressable
              key={index}
              
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: '#BEBEBE',
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                dispatch(decrementQuantity(item));
                dispatch(decrementQty(item));
              }}
            >
              <Text
                style={{
                  color: '#088F8F',
                  textAlign: 'center',

                  fontSize: 20,
                  fontWeight: '600',
                  paddingHorizontal: 6
                }}
              >
                -
              </Text>
            </Pressable>
            <Pressable>
              <Text
                style={{
                  color: '#088F8F',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                  paddingHorizontal: 6
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>
            <Pressable
                 key={index}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: '#BEBEBE',
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                dispatch(incrementQuantity(item));
                dispatch(incrementQty(item));
              }}
            >
              <Text
                style={{
                  color: '#088F8F',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                  paddingHorizontal: 6
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
            <Pressable
                 key={index}
            style={{ width: 80 }}
            onPress={() => {
              addItemToCart();
            }}
          >
            <Text
              style={{
                borderColor: 'grey',
                borderWidth: 0.8,
                marginVertical: 10,
                color: '#088F8F',
                textAlign: 'center',
                borderRadius: 6,
                fontSize: 17,
                fontWeight: 'bold',
                padding: 5
              }}
            >
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default DressItem;
