import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'

const Page = styled.SafeAreaView`
    flex:1;
    padding:20px;
    background-color:#fff;
`
const KeyboardArea = styled.KeyboardAvoidingView``
const Scroll = styled.ScrollView``
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
const FlexPicker = styled.Picker`
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
            message: '',
            task_desc: '',
            task_status: 'A fazer',
            task_register: '',
            task_pause_register: '',
            task_continue_register: '',
            task_concluded_register: '',
            task_doing_register: '',
            priority: 0,
            prioritys: [
                { name: 'Selecione...' },
                { name: 'Baixa' },
                { name: 'Média' },
                { name: 'Alta' }
            ],
            client: 0,
            clients: [],
            service: 0,
            services: []
        }
        this.insertTask = this.insertTask.bind(this)
        this.back = this.back.bind(this)

        /* BUSCA CLIENTES INSERIDOS PELO USUÁRIO NO BANCO */
        let auth = firebase.auth().currentUser.uid
        let client_val = firebase.database().ref('clients').child(auth)

        client_val.on('value', (snapshot) => {
            let state = this.state
            state.clients = []

            snapshot.forEach((childItem) => {
                state.clients.push({
                    new_client: childItem.val().name,
                    key: childItem.key
                })
            })
            this.setState(state)
        })

        /*BUSCA SERVIÇOS INSERIDOS PELO USUÁRIO NO BANCO*/
        let service_val = firebase.database().ref('services').child(auth)

        service_val.on('value', (snapshot) => {
            let state = this.state
            state.services = []

            snapshot.forEach((childItem) => {
                state.services.push({
                    new_service: childItem.val().name,
                    key: childItem.key
                })
            })
            this.setState(state)
        })

    }

    insertTask() {
        if (this.state.task_desc != '' && this.state.service != '') {
            Sistema.getUserInfo(() => {
                /* PEGA INFORMAÇÕES DO USUÁRIO */
                let auth = firebase.auth().currentUser.uid
                let task = firebase.database().ref('tasks').child(auth)

                let timestamp = Date.now()

                /* INFORMAÇÕES DA DATA DE CADASTRO DA TAREFA */
                // let date = new Date()
                // let day = date.getDate()
                // let month = date.getMonth()
                // let year = date.getFullYear()
                // let hours = date.getHours()
                // let min = date.getMinutes()
                // let sec = date.getSeconds()

                // day = day < 10 ? '0' + day : day
                // month = (month + 1) < 10 ? '0' + (month + 1) : (month + 1)
                // min = min < 10 ? '0' + min : min

                // let dateFormated = day + '/' + month + '/' + year
                // let hoursFormated = hours + ':' + min + ':' + sec

                // let state = this.state
                // state.task_register = dateFormated + ' às ' + hoursFormated

                /* CADASTRO DA TAREFA COM AS INFORMAÇÕES INSERIDAS NOS FORMULÁRIOS */
                let keyTask = task.push().key
                task.child(keyTask).set({
                    task_desc: this.state.task_desc,
                    client: this.state.client,
                    service: this.state.service,
                    priority: this.state.priority,
                    task_status: this.state.task_status,
                    task_pause_register: '',
                    task_continue_register: '',
                    task_concluded_register: '',
                    task_doing_register: '',
                    task_time_sum: '',
                    task_count_pause: 0,
                    task_register: timestamp
                })
                this.props.navigation.navigate('ToDo')
                this.setState({
                    task_desc: '',
                    client: '',
                    service: ''
                })
            })
        } else {
            this.setState({ message: 'Adicione um cliente ou serviço para cadastrar a tarefa' })
        }
    }

    back() {
        this.props.navigation.goBack()
    }

    render() {
        let clientsItems = this.state.clients.map((v, k) => {
            return <FlexPicker.Item key={k.key} value={v.new_client} label={v.new_client} />
        })
        let servicesItems = this.state.services.map((v, k) => {
            return <FlexPicker.Item key={k.key} value={v.new_service} label={v.new_service} />
        })
        let priorityItems = this.state.prioritys.map((v, k) => {
            return <FlexPicker.Item key={k} value={v.name} label={v.name} />
        })

        return (
            <Page>
                <Scroll>
                    <KeyboardArea behavior="padding" keyboardVerticalOffset={80}>

                        <TitleBar onPress={this.back} underlayColor="transparent">
                            <Icon source={require('../uploads/arrow.png')} />
                        </TitleBar>

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
                            <FlexPicker.Item key={0} value={'Selecione...'} label={'Selecione...'} />
                            {clientsItems}
                        </FlexPicker>

                        <FlexLabel>Serviço</FlexLabel>
                        <FlexPicker
                            selectedValue={this.state.service}
                            onValueChange={(itemValue, itemIndex) => this.setState({ service: itemValue })}
                            value={this.state.service}
                        >
                            <FlexPicker.Item key={0} value={'Selecione...'} label={'Selecione...'} />
                            {servicesItems}

                        </FlexPicker>

                        <FlexLabel>Prioridade</FlexLabel>
                        <FlexPicker
                            selectedValue={this.state.priority}
                            onValueChange={(itemValue, itemIndex) => this.setState({ priority: itemValue })}
                            value={this.state.priority}
                        >
                            {priorityItems}
                        </FlexPicker>

                        <Message>{this.state.message}</Message>

                        <FlexBtnAdd onPress={this.insertTask} underlayColor="#457bf6">
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
        title: 'Nova tarefa',
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: () => null
    }
}

export default AddTask