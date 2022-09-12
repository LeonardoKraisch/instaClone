import React, { useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Header from '../components/Header'
import Post from '../components/Post'

import useFeed from "../data/hooks/useFeed";

export default props => {
    const { posts, fetchPosts } = useFeed()

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={posts} keyExtractor={item => `${item.id}`}
                renderItem={({ item }) =>
                    <Post key={item.id} {...item} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})