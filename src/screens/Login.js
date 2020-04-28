import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import Sistema from '../Sistema'
import AsyncStorage from '@react-native-community/async-storage'

const Scroll = styled.ScrollView`
    background-color:#fff;
`
const FlexBg = styled.ImageBackground`

`
const Page = styled.SafeAreaView`
    flex:1;
    padding:20px;
    margin-top:180px;
`
const KeyboardArea = styled.KeyboardAvoidingView`

`
const FlexTitleBody = styled.View `
    align-items:center;

`
const FlexTitle = styled.Text`
    font-size:20px;
    margin-top:30px;
    font-weight:200;
`
const FlexColorTitle = styled.Text`
    color:#5c8efe;
    font-size:26px;
    margin-bottom:50px;
    font-weight:bold;
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
const ErrorMessage = styled.View`
`
const ErrorText = styled.Text`
    font-size:14px;
    margin-bottom:10px;
    text-align:center;
    color:#ff7575;
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
const FlexBtnRegister = styled.TouchableHighlight`
    align-items:center;
    padding:15px;
`
const FlexRegister = styled.Text`
    color:#aaa;
`
const FlexTextBtnRegister = styled.Text`
    color:#5c8efe;
    font-weight:bold;
`

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
        // PEGA AS INFOS DE LOGIN E JOGA NO INPUT
        AsyncStorage.getItem("@email").then((e) => {
            this.setState({ email: e })
            // alert(this.setState({email:e}))
        })
        // PEGA AS INFOS DE LOGIN E JOGA NO INPUT
        AsyncStorage.getItem("@password").then((p) => {
            this.setState({ password: p })
            // alert(this.setState({password:p}))
        })

        this.logar = this.logar.bind(this)
        this.registrar = this.registrar.bind(this)

        Sistema.logout()
    }

    logar() {
        Sistema.addAuthListener((user) => {
            if (user) {
                // SALVA LOGIN E SENHA DO USUÁRIO NO ASYNCSTORAGE
                AsyncStorage.setItem("@email", this.state.email)
                AsyncStorage.setItem("@password", this.state.password)

                this.props.navigation.navigate('ToDo')
            } else if (this.state.email == '' && this.state.password == '') {
                this.setState({ errorMessage: 'Preencha campo de e-mail e senha!' })
            }
        })
        Sistema.login(this.state.email, this.state.password)
            .catch((error => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        this.setState({ errorMessage: 'Ops, senha inválida!' })
                        break;
                    case 'auth/user-not-found':
                        this.setState({ errorMessage: 'Ops, usuário inválido!' })
                        break;
                }
            }))
    }

    registrar() {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <Scroll>
                <FlexBg source={require('../uploads/background.jpg')} resizeMode="cover" >
                    <Page>
                        <KeyboardArea behavior={Platform.OS == 'ios' ? 'padding' : null} keyboardVerticalOffset={80}>

                            <FlexTitleBody>
                                <FlexTitle>Bem vindo ao</FlexTitle>
                                <FlexColorTitle>TaskControll</FlexColorTitle>
                            </FlexTitleBody>

                            <FlexLabel>E-mail:</FlexLabel>
                            <FlexAddInput
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <FlexLabel>Senha:</FlexLabel>
                            <FlexAddInput
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry={true}
                                autoCapitalize="none"
                            />

                            <ErrorMessage>
                                {this.state.errorMessage &&
                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                }
                            </ErrorMessage>

                            <FlexBtnLogin onPress={this.logar} underlayColor="#457bf6">
                                <FlexTextBtn>Entrar</FlexTextBtn>
                            </FlexBtnLogin>

                            <FlexBtnRegister underlayColor="transparent">
                                <Text>
                                    <FlexRegister>Novo por aqui?</FlexRegister> <FlexTextBtnRegister onPress={this.registrar} underlayColor="#457bf6">Registrar</FlexTextBtnRegister>
                                </Text>
                            </FlexBtnRegister>
                        </KeyboardArea>
                    </Page>
                </FlexBg>
            </Scroll>
        )
    }
}

Login.navigationOptions = () => {
    return {
        title: 'FlexApp',
        headerShown: false
    }
}

export default Login