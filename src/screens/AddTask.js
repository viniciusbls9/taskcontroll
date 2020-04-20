import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Alert } from 'react-native'
import { Platform } from 'react-native'
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
    flex-direction:row;
    justify-content:space-between;
    margin-top:14px;
    margin-bottom:30px;
`
const Icon = styled.Image`
    width:20px;
    height:20px;
`

// const FlexLogo = styled.Image`
//     width:200px;
//     height:100px;
//     align-items:center;
// `
const FlexTitle = styled.Text`
    font-size:22px;
    text-align:center;
    margin-top:30px;
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
const FlexPicker = styled.Picker`

`
const FlexBtnAdd = styled.TouchableHighlight`
    align-items:center;
    background-color:#041938;
    padding:15px;
    border-radius:5px;
`
const FlexTextBtn = styled.Text`
    color:#fff;
`
const FlexIcon = styled.Image`
    width:30px;
    height:30px;
    justify-content:center;
`

class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task_desc: '',
            task_status: 'A fazer',
            task_register: '',
            task_pause_register: '',
            task_continue_register: '',
            task_concluded_register: '',
            task_doing_register: '',
            client: 0,
            clients: [
                { name: 'Selecione' },
                { name: 'Iphome' },
                { name: 'Santos Global' },
                { name: 'Cristina Corretora' },
                { name: 'Vinicius' }
            ],
            service: 0,
            services: [
                { name: 'Selecione' },
                { name: 'Criação de site' },
                { name: 'Acompanhamento Campnhas Google ADS' },
                { name: 'Aplicativo' }
            ]
        }
        

        this.insertTask = this.insertTask.bind(this)
        this.back = this.back.bind(this)
    }

    insertTask() {
        if (this.state.task_desc != '' && this.state.service != '') {
            Sistema.getUserInfo((snapshot) => {
                /* PEGA INFORMAÇÕES DO USUÁRIO */
                let auth = firebase.auth().currentUser.uid
                let task = firebase.database().ref('tasks').child(auth)

                /* INFORMAÇÕES DA DATA DE CADASTRO DA TAREFA */
                let date = new Date()
                let day = date.getDate()
                let month = date.getMonth()
                let year = date.getFullYear()
                let hours = date.getHours()
                let min = date.getMinutes()
                let sec = date.getSeconds()

                day = day < 10 ? '0' + day : day
                month = (month + 1) < 10 ? '0' + (month + 1) : (month + 1)
                min = min < 10 ? '0' + min : min

                let dateFormated = day + '/' + month + '/' + year
                let hoursFormated = hours + ':' + min + ':' + sec

                let state = this.state
                state.task_register = dateFormated + ' às ' + hoursFormated

                /* CADASTRO DA TAREFA COM AS INFORMAÇÕES INSERIDAS NOS FORMULÁRIOS */
                let keyTask = task.push().key
                task.child(keyTask).set({
                    task_desc: this.state.task_desc,
                    client: this.state.client,
                    service: this.state.service,
                    task_status: this.state.task_status,
                    task_pause_register: '',
                    task_continue_register: '',
                    task_concluded_register: '',
                    task_doing_register: '',
                    task_time_sum: '',
                    task_count_pause: 0,
                    task_register: this.state.task_register
                })
                this.props.navigation.navigate('ToDo')
                this.setState({
                    task_desc: '',
                    client: '',
                    service: ''

                })
            })
        } else {
            alert('Não foi possível cadastrar a tarefa.')
        }
    }

    back() {
        this.props.navigation.goBack()
    }


    render() {
        let clientsItems = this.state.clients.map((v, k) => {
            return <FlexPicker.Item key={k} value={v.name} label={v.name} />
        })
        let servicesItems = this.state.services.map((v, k) => {
            return <FlexPicker.Item key={k} value={v.name} label={v.name} />
        })

        return (
            <Page>
                <Scroll>
                    <KeyboardArea behavior="padding" keyboardVerticalOffset={80}>
                        <TitleBar onPress={this.back} underlayColor="transparent">
                            <Icon source={require('../uploads/arrow.png')} />
                        </TitleBar>
                        {/* <FlexLogo source={require('../uploads/logotipo-azul-min.png')} resizeMode="contain" /> */}
                        <FlexTitle>Adicione uma nova Tarefa</FlexTitle>
                        <FlexLabel>Descrição</FlexLabel>
                        <FlexAddInput
                            onChangeText={(task_desc) => this.setState({ task_desc })}
                            value={this.state.task_desc}
                            returnKeyType="done"
                        />

                        <FlexLabel>Cliente</FlexLabel>
                        <FlexPicker
                            selectedValue={this.state.client}
                            onValueChange={(itemValue, itemIndex) => this.setState({ client: itemValue })}
                            value={this.state.client}
                        >
                            {clientsItems}

                        </FlexPicker>

                        <FlexLabel>Serviço</FlexLabel>
                        <FlexPicker
                            selectedValue={this.state.service}
                            onValueChange={(itemValue, itemIndex) => this.setState({ service: itemValue })}
                            value={this.state.service}
                        >
                            {servicesItems}

                        </FlexPicker>

                        <FlexBtnAdd onPress={this.insertTask} underlayColor="#031126">
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
        title: 'Adicionar',
        headerStyle: {
            backgroundColor: '#040E1F',
        },
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: () => null,
        tabBarIcon: () => {
            return <FlexIcon source={require('../uploads/more.png')} />
        }
    }
}

export default AddTask