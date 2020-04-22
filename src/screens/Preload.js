import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import Sistema from '../Sistema'

const Page = styled.View`
    flex:1;
    width:null;
    justify-content:center;
    background-color:#fff;
`
const FlexDesc = styled.Text`
    font-size:13px;
    text-align:center;
    color:#8a8f9e;
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
                <ActivityIndicator size="large" color="#5c8efe" style={{marginBottom:20}} />
                <FlexDesc>Carregando...</FlexDesc>
            </Page>
        )
    }
}

Preload.navigationOptions = () => {
    return {
        title: 'FlexApp',
        headerShown:false
    }
}

export default Preload