import { FlatList, Image, View, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { plantsData, plantIds } from "./valuesWiki";

// Logica para hacer que las imagesnes que aparecen en carouselData se muestren
// una tras de otra

const Carousel = ({name}) => {
    const flatListRef = useRef();
    const screeWidth = Dimensions.get("window").width;
    const screenHeigth = Dimensions.get("window").height;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            if(Math.round(activeIndex) === carouselData.length-1){
                
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animation: true,
                })
            } else{   
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animation: true,
                })
            }
        }, 2000);
        return () => clearInterval(interval);
    });

    const getItemLayout = (data, index) => ({
        length: screeWidth,
        offset: screeWidth*index,
        index: index,
    });
    
    const carouselData = plantsData[plantIds[name]-1].carouselData;
    const renderItem = ({item, index}) => {
        return(
            <View>
                <Image source={item.image} style={{height: (screenHeigth*0.5), width: screeWidth, }}/>
            </View>
        )
    }

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = scrollPosition / screeWidth;
        setActiveIndex(index);
    };

    return(
        <View>
            <FlatList 
            data={carouselData}
            ref={flatListRef}
            getItemLayout={getItemLayout}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={true}
            pagingEnabled={true}
            onScroll={handleScroll}
            />
        </View>
    );
};

export default Carousel;