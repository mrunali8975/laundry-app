import { View, Text } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        'https://picsum.photos/seed/picsum/200/300',
        'https://picsum.photos/200/300?grayscale',
        'https://picsum.photos/200/300.jpg'
    ];
  return (
    <View>
     <SliderBox
          images={images}
              autoPlay 
              circleLoop
              dotColor={'#13274F'}
              inactiveDotColor={'#90A4AE'}
              ImageComponentStyle={{
                  borderRadius: 6,
                width:'94%'  
              }}
        />
    </View>
  )
}

export default Carousel