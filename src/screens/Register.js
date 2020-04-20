import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = RNFetchBlob.polyfill.Blob

const Page = styled.View`
    flex:1;
    padding:20px;
`
// const FlexLogo = styled.Image`
//     width:200px;
//     height:100px;
//     align-items:center;
// `
const FlexTitle = styled.Text`
    font-size:22px;
    text-align:center;
    margin-top:20px;
    margin-bottom:50px;
`

const FlexLabel = styled.Text`
    font-size:10px;
    color:#8a8f9e;
    text-transform:uppercase;
    margin-bottom:5px;
`
const FlexAddInput = styled.TextInput`
    height:40px;
    border-bottom-width:1px;
    border-color:#ccc;
    margin-bottom:20px;
`
const FlexBtnLogin = styled.TouchableHighlight`
    align-items:center;
    background-color:#041938;
    padding:15px;
    border-radius:5px;
`
const FlexTextBtn = styled.Text`
    color:#fff;
`
const Text = styled.Text`
    color:#414959;
`
const FlexIcon = styled.Image`
    width:20px;
    height:20px;
`
const FlexBtnAvatar = styled.TouchableHighlight`
    width:50px;
    height:50px;
    background-color:#ddd;
    border-radius:25px;
    align-items:center;
    padding:15px;
    margin-bottom:20px;
    margin-top:20px;
`

const FlexBtnRegister = styled.TouchableHighlight`
    align-items:center;
    padding:15px;
`
const FlexTextBtnRegister = styled.Text`
    color:#414959;
    font-weight:bold;
`
const KeyboardArea = styled.KeyboardAvoidingView`

`

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            image: null,
            userUid: 0
        }

        this.saveImage = this.saveImage.bind(this)
        this.backLogin = this.backLogin.bind(this)
        this.register = this.register.bind(this)
        this.getImage = this.getImage.bind(this)

        Sistema.logout()

        Sistema.addAuthListener((user) => {
            if (user) {
                firebase.database().ref('task_users')
                    .child(user.uid)
                    .set({
                        name: this.state.name
                    })
            }
        })
    }

    getImage() {
        let options = { title: 'Selecione uma imagem' }
        ImagePicker.showImagePicker(options, (r) => {
            if (r.uri) {
                let state = this.state;
                state.image = { uri: r.uri };
                this.setState(state);
            }
        });
    }

    saveImage() {

        let uri = this.state.image.uri.replace('file://', '')
        let uid = this.state.userUid
        let photo = firebase.storage().ref().child('userAvatar').child(uid + '.jpg')
        let mime = 'image/jpeg'

        RNFetchBlob.fs.readFile(uri, 'base64')
            .then((data) => {
                return RNFetchBlob.polyfill.Blob.build(data, { type: mime + ';BASE64' })
            })
            .then((blob) => {
                photo.put(blob, { contentType: mime })
                    .on('state_changed', (snapshot) => {
                        let pct = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        let state = this.state
                        state.pct = pct
                        this.setState(state)
                    }, (error) => {
                        alert(error.code)
                    }, () => {

                        alert('Imagem carregada com sucesso!')
                    })
            })

    }

    register() {
        if (this.state.name != '' && this.state.email != '' && this.state.password != '') {
            Sistema.addAuthListener((user) => {
                if (user) {
                    let state = this.state
                    state.userUid = user.uid
                    this.setState(state)

                    this.saveImage()
                    this.props.navigation.navigate('ToDo')
                }
            })
            Sistema.registerConfirme(this.state.email, this.state.password)
        }
    }

    backLogin() {
        this.props.navigation.navigate('Login')
    }

    render() {

        return (
            <Page>
                <KeyboardArea behavior={Platform.OS == 'ios' ? 'padding' : null}>
                    {/* <FlexLogo source={require('../uploads/logotipo-azul-min.png')} resizeMode="contain" /> */}
                    <FlexTitle>Crie sua conta e comece e monitorar suas tarefas</FlexTitle>

                    <FlexLabel>Nome:</FlexLabel>
                    <FlexAddInput
                        onChangeText={(name) => this.setState({ name })}
                    />

                    <FlexLabel>E-mail:</FlexLabel>
                    <FlexAddInput
                        onChangeText={(email) => this.setState({ email })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <FlexLabel>Senha:</FlexLabel>
                    <FlexAddInput
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />

                    <FlexLabel>Avatar:</FlexLabel>
                    <FlexBtnAvatar onPress={this.getImage} underlayColor="#ccc">
                        <FlexIcon source={require('../uploads/camera.png')} />
                    </FlexBtnAvatar>

                    <FlexBtnLogin onPress={this.register} underlayColor="#031126">
                        <FlexTextBtn>Registrar</FlexTextBtn>
                    </FlexBtnLogin>

                    <FlexBtnRegister underlayColor="transparent">
                        <Text>
                            Já tem conta? <FlexTextBtnRegister onPress={this.backLogin}>Faça Login</FlexTextBtnRegister>
                        </Text>
                    </FlexBtnRegister>
                </KeyboardArea>
            </Page>
        )
    }
}

Register.navigationOptions = () => {
    return {
        title: 'FlexApp'
    }
}

export default Register