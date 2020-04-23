import React, { Component } from 'react'
import styled from 'styled-components/native'
import firebase from '../FirebaseConnection'

const Page = styled.SafeAreaView`
    flex:1;
    padding:20px;
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
            // alert(state.clients)
        })
    }

    render() {

        let clientsItems = this.state.clients.map((v, k) => {
            return <FlexPicker.Item key={k} value={v.name} label={'v.name'} />
        })

        // let servicesItems = this.state.services.map((v, k) => {
        //     return <FlexPicker.Item key={k} value={v.name} label={v.name} />
        // })

        return (
            <Page>

                <FlexLabel>Cliente</FlexLabel>
                <FlexPicker
                    selectedValue={this.state.client}
                    onValueChange={(itemValue, itemIndex) => this.setState({ client: itemValue })}
                    value={this.state.client}
                >
                    {clientsItems}
                </FlexPicker>

                <FlexLabel>Serviço</FlexLabel>
                {/* <FlexPicker
                    selectedValue={this.state.service}
                    onValueChange={(itemValue, itemIndex) => this.setState({ service: itemValue })}
                    value={this.state.service}
                >
                    {servicesItems}

                </FlexPicker> */}
            </Page>
        )
    }
}