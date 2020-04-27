import React, { Component } from 'react'
import styled from 'styled-components/native'
import firebase from '../FirebaseConnection'

const Page = styled.View`
    flex:1;
`
const ModalEdit = styled.Modal`

`
const ViewModal = styled.View`
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.5);
    justify-content:center;
    align-items:center;
`
const InputViewModal = styled.View `
    width:90%;
    height:auto;
    background-color:#fff;
    padding:20px 15px 20px 15px;
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

export default class TaskLimit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            task_desc: '',
            task_status: 'A fazer',
            task_register: '',
            task_count_pause:'',
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
            client: '',
            clients: [],
            service: 0,
            services: [],
            modalVisible: true
        }

        /* BUSCA CLIENTES INSERIDOS PELO USUÁRIO NO BANCO */
        let auth = firebase.auth().currentUser.uid
        let task_val = firebase.database().ref('tasks').child(auth).child('-M5fyQecZsLmqTR8-Zvu')

        task_val.on('value', (snapshot) => {
            let state = this.state
            state.task_desc = snapshot.val().task_desc,
            state.client = snapshot.val().client,
            state.service = snapshot.val().service,
            state.priority = snapshot.val().priority
            this.setState(state)
            // alert(state.task_count_pause)
        })

        /* BUSCA CLIENTES INSERIDOS PELO USUÁRIO NO BANCO */
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
                <ModalEdit
                    visible={this.state.modalVisible}
                    animationType="fade"
                    transparent={true}
                >
                    <ViewModal>
                       <InputViewModal>
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
                            <FlexTextBtn>Atualizar</FlexTextBtn>
                        </FlexBtnAdd>

                        <FlexBtnAdd onPress={() => this.setState({modalVisible: false}) } underlayColor="#457bf6">
                            <FlexTextBtn>X</FlexTextBtn>
                        </FlexBtnAdd>

                       </InputViewModal>
                    </ViewModal>
                </ModalEdit>
            </Page>
        )
    }
}