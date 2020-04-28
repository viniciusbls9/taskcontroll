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
            task_new_service: '',
            message:''
        }
        this.insertClient = this.insertClient.bind(this)
        this.back = this.back.bind(this)

        let timestamp = 176441
        let time = new Date(timestamp)
        // let hours = time.getHours() + 1
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        // let month = time.getMonth() + 1
        // let year = time.getFullYear()
        // let date = time.getDate()
        // console.log(hours)
        console.log(minutes)
        console.log(seconds)


    }

    insertClient() {
        if (this.state.task_new_service != '') {
            Sistema.getUserInfo(() => {

                /* PEGA INFORMAÇÕES DO USUÁRIO */
                let auth = firebase.auth().currentUser.uid
                let newService = firebase.database().ref('services').child(auth)

                /* CADASTRO DO SERVIÇO */
                let keyService = newService.push().key
                newService.child(keyService).set({
                    name: this.state.task_new_service,
                })
                this.props.navigation.navigate('ToDo')
                alert('Serviço adicionado com sucesso')
                this.setState({ task_new_service: '' })
            })
        } else {
            this.setState({ message:'Digite o novo serviço.' })
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

                        <FlexLabel>Serviço</FlexLabel>
                        <FlexAddInput
                            onChangeText={(task_new_service) => this.setState({ task_new_service })}
                            value={this.state.task_new_service}
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
        title: 'Novo Serviço',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: () => null
    }
}

export default AddTask