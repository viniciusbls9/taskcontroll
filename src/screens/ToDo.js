import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import TaskList from '../components/TaskList'
import firebase from '../FirebaseConnection'
// import HomeDrawer from './HomeDrawer'


const Page = styled.View`
    flex:1;
    padding:10px;
    background-color:#fff;
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

class ToDo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uid:'',
            lista:[],
            loading:true
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
                .equalTo('A fazer')
                .on('value', (snapshot) => {
                    let state = this.state
                    state.lista = []
                    
                    snapshot.forEach((childItem) => {

                        state.lista.push({
                            task_desc:childItem.val().task_desc,
                            client:childItem.val().client,
                            service:childItem.val().service,
                            task_status:childItem.val().task_status,
                            task_register:childItem.val().task_register,
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

ToDo.navigationOptions = () => {
    return {
        title: 'A Fazer',
        headerStyle: {
            backgroundColor: '#040E1F',
        },
        headerTitleStyle: {
            color: '#ffffff'
        },
        tabBarIcon: () => {
            return <FlexIcon source={require('../uploads/play.png')} />
        }
    }
}


export default ToDo