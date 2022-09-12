import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    ScrollView,
    Alert,
    Platform
} from "react-native";
import useEffectIf from '../hooks/UseEffectIf'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import useFeed from "../data/hooks/useFeed";
import useUser from "../data/hooks/useUser";
import useEvent from "../data/hooks/useEvent";

export default props => {
    const [image, setImage] = useState(null)
    const [comment, setComment] = useState('')

    const { addPost } = useFeed()
    const { name: nickname, email } = useUser()
    const { uploading } = useEvent()

    const canEdit = () => (email != null && email.trim() != '') && !uploading


    const pickImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel) {
                setImage({ uri: res.assets[0].uri, base64: res.assets[0].base64 })
            }
        })
    }

    const pickPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            includeBase64: true,
            saveToPhotos: true,
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel) {
                setImage({ uri: res.assets[0].uri, base64: res.assets[0].base64 })
            }
        })
    }

    const save = () => {
        addPost({
            id: Math.random(),
            nickname,
            email,
            image,
            comments: [{nickname, comment}]
        })
    }

    useEffectIf(() => {
        setImage(null)
        setComment('')
        props.navigation.navigate('Feed')
    }, uploading, false)

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Compartilhe uma imagem</Text>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={pickPhoto} disabled={!canEdit()} style={[styles.button, canEdit()? {} : styles.buttonDisabled]}>
                        <Text style={styles.buttonText}>Tirar foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage} disabled={!canEdit()} style={[styles.button, canEdit()? {} : styles.buttonDisabled]}>
                        <Text style={styles.buttonText}>Galeria</Text>
                    </TouchableOpacity>
                </View>
                <TextInput placeholder="Comentários?" style={styles.input}
                    value={comment} onChangeText={setComment} editable={canEdit()} />
                <TouchableOpacity onPress={save} disabled={!canEdit()} style={[styles.button, canEdit()? {} : styles.buttonDisabled]}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        marginTop: 10,
        backgroundColor: '#EEE'
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    button: {
        width: '35%',
        maxHeight: '58%',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: "90%",
    },
    buttonDisabled: {
        backgroundColor: '#666'
    }
})