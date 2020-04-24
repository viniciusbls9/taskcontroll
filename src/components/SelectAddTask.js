import React, { Component } from 'react'
import styled from 'styled-components/native'
import firebase from '../FirebaseConnection'

const Page = styled.SafeAreaView`

`
const FlexLabel = styled.Text`
    font-size:10px;
    color:#8a8f9e;
    text-transform:uppercase;
    margin-bottom:5px;
`
const FlexPicker = styled.Picker`
    margin-bottom:20px;
`
export default class SelectAddTask extends Component {

    constructor(props) {
        super(props)
        this.state = {
            client: 0,
            clients: [],
            service:0,
            services:[]
        }

        /* BUSCA CLIENTES INSERIDOS PELO USUÁRIO NO BANCO */
        let auth = firebase.auth().currentUser.uid
        let client_val = firebase.database().ref('clients').child(auth)

        client_val.on('value', (snapshot) => {
            let state = this.state
            state.clients = []

            snapshot.forEach((childItem) => {
                state.clients.push({
                    new_client:childItem.val().name,
                    key:childItem.key
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
                    new_service:childItem.val().name,
                    key:childItem.key
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

        return (
            <Page>

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
            </Page>
        )
    }
}