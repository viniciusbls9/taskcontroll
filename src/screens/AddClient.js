import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'

const Page = styled.SafeAreaView`
    flex:1;
    padding:20px;
`
const KeyboardArea = styled.KeyboardAvoidingView`
    
`
const Scroll = styled.ScrollView`

`
const TitleBar = styled.TouchableHighlight`
    margin-top:14px;
    margin-bottom:50px;
`
const Icon = styled.Image`
    width:20px;
    height:20px;
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
const Message = styled.Text`
    font-size:14px;
    text-align:center;
    color:#ff7575;
    padding:10px;
`
const FlexBtnAdd = styled.TouchableHighlight`
    align-items:center;
    background-color:#5c8efe;
    padding:15px;
    border-radius:5px;
`
const FlexTextBtn = styled.Text`
    color:#fff;
`

class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task_new_client: '',
            message:''
        }
        this.insertClient = this.insertClient.bind(this)
        this.back = this.back.bind(this)
    }

    insertClient() {
        if (this.state.task_new_client != '') {
            Sistema.getUserInfo(() => {

                /* PEGA INFORMAÇÕES DO USUÁRIO */
                let auth = firebase.auth().currentUser.uid
                let newClient = firebase.database().ref('clients').child(auth)

                /* CADASTRO DO CLIENTE */
                let keyClient = newClient.push().key
                newClient.child(keyClient).set({
                    name: this.state.task_new_client,
                })
                this.props.navigation.navigate('ToDo')
                alert('Cliente adicionado com sucesso')
                this.setState({ task_new_client:'' })
            })
        } else {
            this.setState({
                message:'Digite o nome do novo cliente.'
            })
        }
    }

    back() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Page>
                <Scroll>
                    <KeyboardArea behavior="padding" keyboardVerticalOffset={80}>

                        <TitleBar onPress={this.back} underlayColor="transparent">
                            <Icon source={require('../uploads/arrow.png')} />
                        </TitleBar>

                        <FlexLabel>Cliente</FlexLabel>
                        <FlexAddInput
                            onChangeText={(task_new_client) => this.setState({ task_new_client })}
                            value={this.state.task_new_client}
                            returnKeyType="done"
                        />

                        <Message>{this.state.message}</Message>

                        <FlexBtnAdd onPress={this.insertClient} underlayColor="#457bf6">
                            <FlexTextBtn>Adicionar</FlexTextBtn>
                        </FlexBtnAdd>

                    </KeyboardArea>
                </Scroll>
            </Page>
        )
    }
}

AddTask.navigationOptions = () => {
    return {
        title: 'Novo Cliente',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: () => null
    }
}

export default AddTask