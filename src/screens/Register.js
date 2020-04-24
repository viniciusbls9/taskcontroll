import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = RNFetchBlob.polyfill.Blob


const Scroll = styled.ScrollView`
    background-color:#fff;
`
const FlexBg = styled.ImageBackground`
    
`
const Page = styled.SafeAreaView`
    flex:1;
    padding:20px;
`
const KeyboardArea = styled.KeyboardAvoidingView`

`
const FlexTitle = styled.Text`
    font-size:22px;
    text-align:center;
    margin-top:30px;
    margin-bottom:100px;
    color:#fff;
`
const FlexAvatarBody = styled.View`
    align-items:center;
`
const FlexBtnAvatar = styled.TouchableHighlight`
    width:100px;
    height:100px;
    background-color:#eee;
    border-radius:50px;
    align-items:center;
    justify-content:center;
    padding:15px;
    margin-top:30px;
`
const FlexIcon = styled.Image`
    width:30px;
    height:30px;
`
const ErrorMessage = styled.View`
`
const ErrorText = styled.Text`
    font-size:14px;
    margin-bottom:10px;
    text-align:center;
    color:#8a8f9e;
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
    background-color:#5c8efe;
    padding:15px;
    border-radius:5px;
`
const FlexTextBtn = styled.Text`
    color:#fff;
`
const Text = styled.Text`
    
`
const FlexRegister = styled.Text`
    color:#aaa;
`
const FlexBtnRegister = styled.TouchableHighlight`
    align-items:center;
    padding:15px;
`
const FlexTextBtnRegister = styled.Text`
    color:#5c8efe;
    font-weight:bold;
`

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            messageAvatar: '',
            ErrorMessage: '',
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
                state.messageAvatar = 'Imagem escolhida com sucesso!'
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
                .catch((error => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            this.setState({ errorMessage: 'E-mail já cadastrado no aplicativo' })
                        break;
                        case 'auth/invalid-email':
                            this.setState({ errorMessage: 'É obrigatório inserir um e-mail válido' })
                        break;
                        case 'auth/weak-password':
                            this.setState({ errorMessage: 'Sua senha deve ter ao menos 6 digitos' })
                        break;
                    }
                }))
        }
    }

    backLogin() {
        this.props.navigation.navigate('Login')
    }

    render() {

        return (
            <Scroll>
                <FlexBg source={require('../uploads/background2.jpg')} resizeMode="cover" >
                    <Page>
                        <KeyboardArea behavior={Platform.OS == 'ios' ? 'padding' : null}>

                            <FlexTitle>Crie sua conta no TaskControll e comece a controlar suas tarefas</FlexTitle>

                            <FlexAvatarBody>
                                <FlexBtnAvatar onPress={this.getImage} underlayColor="#ccc">
                                    <FlexIcon source={require('../uploads/camera.png')} />
                                </FlexBtnAvatar>
                            </FlexAvatarBody>

                            <ErrorMessage>
                                <ErrorText>{this.state.messageAvatar}</ErrorText>
                            </ErrorMessage>

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

                            <ErrorMessage>
                                {this.state.errorMessage &&
                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                }
                            </ErrorMessage>

                            <FlexBtnLogin onPress={this.register} underlayColor="#457bf6">
                                <FlexTextBtn>Criar conta</FlexTextBtn>
                            </FlexBtnLogin>

                            <FlexBtnRegister underlayColor="transparent">
                                <Text>
                                    <FlexRegister>Já tem conta?</FlexRegister><FlexTextBtnRegister onPress={this.backLogin}> Faça Login</FlexTextBtnRegister>
                                </Text>
                            </FlexBtnRegister>
                        </KeyboardArea>
                    </Page>
                </FlexBg>
            </Scroll>
        )
    }
}

Register.navigationOptions = () => {
    return {
        title: 'FlexApp',
        headerShown: false
    }
}

export default Register