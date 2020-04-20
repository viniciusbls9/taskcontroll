import React, { Component } from 'react'
import styled from 'styled-components/native'
import BtnAddTask from '../components/BtnAddTask'
import Sistema from '../Sistema'
import TaskList from '../components/TaskList'
import firebase from '../FirebaseConnection'

const Page = styled.View`
    flex:1;
    padding:10px;
`
const Message = styled.Text `
    font-size:15px;
    text-align:center;
`
const MessageClick = styled.Text `
    font-size:15px;
    text-align:center;
    font-weight:bold;
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

class Doing extends Component {

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
                .equalTo('Fazendo')
                .on('value', (snapshot) => {
                    let state = this.state
                    state.lista = []
                    
                    snapshot.forEach((childItem) => {

                        state.lista.push({
                            task_desc:childItem.val().task_desc,
                            client:childItem.val().client,
                            service:childItem.val().service,
                            task_status:childItem.val().task_status,
                            task_doing_register:childItem.val().task_doing_register,
                            key:childItem.key
                        })
                    })
                    this.setState(state)
                })
            }
        })
    }

    addTask(props) {
        this.props.navigation.navigate('AddTask')
    }

    render() {
        return (
            <Page>
                {this.state.lista == '' &&
                <>
                    <Message>Nenhuma tarefa cadastrada.</Message>
                    <MessageClick onPress={this.addTask}>Adicionar uma nova tarefa</MessageClick>
                </>
                }
                <Tasks
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

Doing.navigationOptions = () => {
    return {
        title:'Fazendo',
        headerStyle: {
            backgroundColor:'#040E1F',
        },
        headerTitleStyle: {
            color:'#ffffff'
        },
        headerLeft: () => null,
        tabBarIcon: () => {
            return <FlexIcon source={require('../uploads/time.png')} />
        }
    }
}

export default Doing