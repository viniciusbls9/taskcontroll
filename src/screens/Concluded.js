import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import TaskList from '../components/TaskList'
import firebase from '../FirebaseConnection'

const Page = styled.SafeAreaView`
    flex:1;
    padding:10px;
    background-color:#f6f4fd;
`
const MessageBoby = styled.View `
    align-items:center;
    margin-top:50px;
`
const Icon = styled.Image`
    width:60px;
    height:60px;
`
const Message = styled.Text `
    font-size:15px;
    text-align:center;
    color:#aaa;
`
const FlexIcon = styled.Image`
    width:20px;
    height:20px;
`
const Tasks = styled.FlatList`

`
const Add = styled.View`
    flex:1;
    flex-direction:row-reverse;
    justify-content:space-between;
    align-items:flex-end;
`
const FlexAddButton = styled.TouchableHighlight`
    width:60px;
    height:60px;
    border-radius:30px;
    align-items:center;
    justify-content:center;
    background-color:#f0d018;
`

class Concluded extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lista:[]
        }

        this.addTask = this.addTask.bind(this)

        Sistema.addAuthListener((user) => {
            if(user) {
                let state = this.state
                state.uid = user.uid
                this.setState(state)
                firebase.database().ref('tasks')
                .child(user.uid)
                .orderByChild('task_status')
                .equalTo('Concluído')
                .on('value', (snapshot) => {
                    let state = this.state
                    state.lista = []
                    
                    snapshot.forEach((childItem) => {

                        state.lista.push({
                            task_desc:childItem.val().task_desc,
                            client:childItem.val().client,
                            service:childItem.val().service,
                            task_status:childItem.val().task_status,
                            task_concluded_register:childItem.val().task_concluded_register,
                            task_count_pause:childItem.val().task_count_pause,
                            key:childItem.key
                        })
                    })
                    this.setState(state)
                })
            }
        })
    }

    addTask() {
        this.props.navigation.navigate('AddTask')
    }

    render() {
        return (
            <Page>
                {this.state.lista == '' &&
                    <>
                        <MessageBoby>
                            <Icon source={require('../uploads/test.png')} />
                            <Message>Nenhuma tarefa a fazer.</Message>
                        </MessageBoby>
                    </>
                }
                <Tasks
                    showsVerticalScrollIndicator={false}
                    data={this.state.lista}
                    renderItem={({item}) => <TaskList data={item} />}
                />
                <Add>
                    <FlexAddButton onPress={this.addTask} underlayColor="#dec10c">
                        <FlexIcon source={require('../uploads/more-task.png')} />
                    </FlexAddButton>
                </Add>
            </Page>
        )
    }
}

Concluded.navigationOptions = () => {
    return {
        title:'Concluidos',
        headerTitleStyle: {
            color:'#ffffff'
        },
        headerLeft: () => null,
        tabBarIcon: ({focused}) => {
            if(focused) {
                return <FlexIcon source={require('../uploads/check-active.png')} />
            } else {
                return <FlexIcon source={require('../uploads/check.png')} />
            }
        }
    }
}

export default Concluded