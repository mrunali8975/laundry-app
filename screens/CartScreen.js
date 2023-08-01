import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { addToCart ,cleanCart} from '../CartReducer';
import { incrementQty, decrementQty } from '../ProductReducer';
import { incrementQuantity, decrementQuantity } from '../CartReducer';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementQuantity(item));
  };
  const route = useRoute();

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const pickupDt = new Date(route.params.pickUpDate).toDateString()
  const userUid = auth.currentUser.uid;
  const placeOrder = async () => {
      navigation.navigate("Order");
      dispatch(cleanCart());
      await setDoc(
        doc(db, "users", `${userUid}`),
        {
          orders: { ...cart },
          pickUpDetails: route.params,
        },
        {
          merge: true,
        }
      );
    };
  return (
    <>
 <ScrollView style={{ marginTop: 50 }}>
      {total === 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <View
            style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
          >
            <MaterialIcons name="arrow-back" size={24} color="black" />
            <Text>Your Bucket</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              marginLeft: 10,
              marginRight: 10,
              padding: 14
            }}
          >
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 15
                }}
              >
                <Text style={{ width: 100, fontSize: 16, fontWeight: '500' }}>
                  {item.name}
                </Text>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderWidth: 0.7,
                    borderRadius: 12
                  }}
                >
                  <Pressable
                    style={{
                      width: 26,
                      height: 26,

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
                    style={{
                      width: 26,
                      height: 26,

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
                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                  ${item.price * item.quantity}
                </Text>
              </View>
            ))}
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 30 }}>
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 7,
                padding: 10,
                marginTop: 15
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Item Total
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '400' }}>
                  ₹{total}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Delivery Fee | 1.2KM
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F'
                  }}
                >
                  FREE
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                >
                  Free Delivery on Your order
                </Text>
              </View>

              <View
                style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                >
                  selected Date
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F'
                  }}
                >
                  {  pickupDt}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                >
                  No Of Days
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F'
                  }}
                >
                  {route.params.no_Of_days}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}
                >
                  selected Pick Up Time
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F'
                  }}
                >
                  {route.params.selectedTime}
                </Text>
              </View>
              <View
                style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>To Pay</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {total + 95}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={placeOrder}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
   
  );
};

export default CartScreen;
