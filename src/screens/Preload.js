import React, { Component } from 'react'
import styled from 'styled-components/native'
import firebase from '../FirebaseConnection'
import Sistema from '../Sistema'

const Page = styled.View`
    flex:1;
    width:null;
    justify-content:center;
`
// const FlexLogo = styled.Image`
//     width:100%;
//     height:50px;
//     margin-bottom:20px;
//     margin-top:50px;
// `
const FlexTitle = styled.Text`
    font-size:22px;
    text-align:center;
    margin-bottom:20px;

`
const FlexDesc = styled.Text`
    font-size:13px;
    text-align:center;
`


class Preload extends Component {

    constructor(props) {
        super(props)
        this.state = {}

        Sistema.addAuthListener((user) => {
            if (user) {
                this.props.navigation.navigate('ToDo')
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }

    render() {
        return (
            <Page>
                {/* <FlexLogo source={require('../uploads/logotipo-azul-min.png')} resizeMode="contain" /> */}
                <FlexTitle>Bem vindo ao TaskControll</FlexTitle>
                <FlexDesc>Carregando...</FlexDesc>
            </Page>
        )
    }
}

Preload.navigationOptions = () => {
    return {
        title: 'FlexApp'
    }
}

export default Preload