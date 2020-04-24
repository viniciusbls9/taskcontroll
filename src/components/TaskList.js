import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import { Alert } from 'react-native'
import TaskEdit from '../screens/TaskEdit'

const Task = styled.View`
    background-color:#fff;
    border-left-width:3px;
    border-color:#5c8efe;
    border-radius:5px;
    padding:13px;
    margin:7px;
`
const TaskInfo = styled.View`
    
`
const Header = styled.View`
    flex-direction:row;
    justify-content:space-between;
    border-bottom-width:1px;
    border-color:#ccc;
    margin-bottom:10px;
    padding-bottom:10px;
`
const TaskTitle = styled.Text`
    font-size:15px;
`
const TaskPriority = styled.View`
    width:10px;
    height:10px;
    border-radius:5px;
    background-color:${props => props.bgPriority}
`
const TaskDescription = styled.Text`
    font-size:13px;
`
const BodyFlex = styled.View`
    flex-direction:row;
    margin-top:10px;
`
const BodyFlexStatus = styled.View`
    background-color:${props => props.bgStatus};
    padding:5px;
    width:65px;
    margin-right:10px;
    align-items:center;
    justify-content:center;
`
const FlexStatus = styled.Text`
    font-size:9px;
    font-weight:bold;
    color:#fff;
    text-transform:uppercase;
`
const BodyFlexRegister = styled.View`
    background-color:#eee;
    padding:5px;
    width:190px;
    margin-right:10px;
    align-items:center;
`
const FlexRegister = styled.Text`
    font-size:11px;
    color:#191919;
`
const BodyFlexCountPause = styled.View`
    background-color:${props => props.bgCountPause};
    padding:5px;
    width:120px;
    margin-right:10px;
    align-items:center;
`

const FlexTaskBtn = styled.View`
    flex-direction:row;
`

const FlexBtn = styled.TouchableHighlight`
    flex-direction:row;
    flex:${props => props.flex};
    margin-right:10px;
    margin-top:10px;
    padding:8px;
    border-radius:20px;
`

const FlexIconBtn = styled.Image`
    width:20px;
    height:20px;
`


export default class TaskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: "",
            key: this.props.data.key,
            auth: firebase.auth().currentUser.uid,
            priority:'',
            task_register: '',
            task_count_pause: '',
            task_pause_register: '',
            task_doing_register: '',
            task_concluded_register: ''
        }

        this.doingTask = this.doingTask.bind(this)
        this.pauseTask = this.pauseTask.bind(this)
        this.continueTask = this.continueTask.bind(this)
        this.concludedTask = this.concludedTask.bind(this)
        this.editTask = this.editTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }


    doingTask() {

        Sistema.addAuthListener(() => {
            /* PEGA O UID DO USUÁRIO LOGADO */
            let auth = firebase.auth().currentUser.uid


            /* PEGA DATA DE REGISTRO DA TAREFA */
            let task_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_register')

            task_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_register = snapshot.val()
            })

            /* PEGA A QUANTIDADE DE PAUSA DA TAREFA */
            let task_count_pause_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_count_pause')

            task_count_pause_val.on('value', (snapshot) => {
                let state = this.state
                state.task_count_pause = snapshot.val()
                // alert(state.task_count_pause)
            })

            /* PEGA A DATA DE INICIO DA TAREFA */
            let task_doing_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_doing_register')

            task_doing_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_doing_register = snapshot.val()
                // alert(state.task_doing_register)
            })

            /* PEGA A PRIORIDADE DA TAREFA */
            let priority_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('priority')

            priority_val.on('value', (snapshot) => {
                let state = this.state
                state.priority = snapshot.val()
            })

            /* INFORMAÇÕES DA DATA DE CADASTRO DA TAREFA */

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
            // let hoursFormated = (hours + 1) + ':' + min + ':' + sec

            // let state = this.state
            // state.task_doing_register = dateFormated + ' às ' + hoursFormated
            if(!this.state.priority) {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    task_status: 'Fazendo',
                    task_pause_register: '',
                    task_continue_register: '',
                    task_concluded_register: '',
                    task_time_sum: '',
                    task_count_pause: 0,
                    task_doing_register: Date.now(),
                    task_register: this.state.task_register
                })
            } else {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    priority: this.props.data.priority,
                    task_status: 'Fazendo',
                    task_pause_register: '',
                    task_continue_register: '',
                    task_concluded_register: '',
                    task_time_sum: '',
                    task_count_pause: 0,
                    task_doing_register: Date.now(),
                    task_register: this.state.task_register
                })
            }
        })
    }

    pauseTask() {
        Sistema.addAuthListener(() => {
            /* PEGA O UID DO USUÁRIO LOGADO */
            let auth = firebase.auth().currentUser.uid


            /* PEGA DATA DE REGISTRO DA TAREFA */
            let task_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_register')

            task_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_register = snapshot.val()
            })

            /* PEGA O QUANTIDADE DE PAUSA DA TAREFA */
            let task_count_pause_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_count_pause')

            task_count_pause_val.on('value', (snapshot) => {
                let state = this.state
                state.task_count_pause = snapshot.val()
                // alert(state.task_count_pause)
            })

            /* PEGA A PRIORIDADE DA TAREFA */
            let priority_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('priority')

            priority_val.on('value', (snapshot) => {
                let state = this.state
                state.priority = snapshot.val()
            })

            // /* INFORMAÇÕES DA DATA DE CADASTRO DA TAREFA */
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
            // let hoursFormated = (hours + 1) + ':' + min + ':' + sec

            // let state = this.state
            // state.task_pause_register = dateFormated + ' às ' + hoursFormated

            if (this.state.task_count_pause == 0 && !this.state.priority) {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    task_status: 'Pausado',
                    task_pause_register: Date.now(),
                    task_continue_register: '',
                    task_concluded_register: '',
                    task_time_sum: '',
                    task_count_pause: 1,
                    task_doing_register: this.props.data.task_doing_register,
                    task_register: this.state.task_register
                })
            } else {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    priority: this.props.data.priority,
                    task_status: 'Pausado',
                    task_pause_register: Date.now(),
                    task_continue_register: '',
                    task_concluded_register: '',
                    task_time_sum: '',
                    task_count_pause: (this.state.task_count_pause) + 1,
                    task_doing_register: this.props.data.task_doing_register,
                    task_register: this.state.task_register
                })
            }
        })
    }

    editTask() {
        this.props.navigation.navigate('TaskEdit')
    }

    continueTask() {
        Sistema.addAuthListener(() => {
            firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_status').set('Fazendo')
        })
    }

    concludedTask() {
        Sistema.addAuthListener(() => {
            /* PEGA O UID DO USUÁRIO LOGADO */
            let auth = firebase.auth().currentUser.uid


            /* PEGA DATA DE REGISTRO DA TAREFA */
            let task_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_register')

            task_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_register = snapshot.val()
            })

            /* PEGA O QUANTIDADE DE PAUSA DA TAREFA */
            let task_count_pause_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_count_pause')

            task_count_pause_val.on('value', (snapshot) => {
                let state = this.state
                state.task_count_pause = snapshot.val()
                // alert(state.task_count_pause)
            })

            /* PEGA A DATA DE INICIO DA TAREFA */
            let task_doing_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_doing_register')

            task_doing_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_doing_register = snapshot.val()
                // alert(state.task_doing_register)
            })

            /* PEGA A DATA DA ÚLTIMA PAUSA DA TAREFA */
            let task_pause_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_pause_register')

            task_pause_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_pause_register = snapshot.val()
            })

            /* PEGA A PRIORIDADE DA TAREFA */
            let priority_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('priority')

            priority_val.on('value', (snapshot) => {
                let state = this.state
                state.priority = snapshot.val()
            })


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
            // let hoursFormated = (hours + 1) + ':' + min + ':' + sec

            // let state = this.state
            // state.task_concluded_register = dateFormated + ' ' + hoursFormated

            if(!this.state.priority) {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    task_status: 'Concluído',
                    task_pause_register: this.state.task_pause_register,
                    task_continue_register: '',
                    task_concluded_register: Date.now(),
                    task_time_sum: '',
                    task_count_pause: this.state.task_count_pause,
                    task_doing_register: this.state.task_doing_register,
                    task_register: this.state.task_register
                })
            } else {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    priority: this.props.data.priority,
                    task_status: 'Concluído',
                    task_pause_register: this.state.task_pause_register,
                    task_continue_register: '',
                    task_concluded_register: Date.now(),
                    task_time_sum: '',
                    task_count_pause: this.state.task_count_pause,
                    task_doing_register: this.state.task_doing_register,
                    task_register: this.state.task_register
                })
            }
        })
    }

    deleteTask() {
        Alert.alert(
            this.props.data.client + ' - ' + this.props.data.service,
            'Deseja excluir está tarefa?',
            [
                {
                    text: 'Sim',
                    onPress: () => firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).remove(),
                    style: 'cancel'
                },
                {
                    text: 'Cancel',
                    onPress: () => { }
                },
            ],
            { cancelable: false },
        );
    }

    render() {

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
        let hoursFormated = (hours + 1) + ':' + min + ':' + sec

        let allFormated = dateFormated + ' às ' + hoursFormated


        return (
            <Task>
                <TaskInfo>
                    <Header>
                        <TaskTitle>{this.props.data.client + ' - ' + this.props.data.service}</TaskTitle>

                        {this.props.data.priority == 'Baixa' &&
                            <TaskPriority bgPriority="#68f282"></TaskPriority>
                        }
                        {this.props.data.priority == 'Média' &&
                            <TaskPriority bgPriority="#ff98f5"></TaskPriority>
                        }
                        {this.props.data.priority == 'Alta' &&
                            <TaskPriority bgPriority="#ff7575"></TaskPriority>
                        }

                    </Header>
                    <TaskDescription numberOfLines={2} >{this.props.data.task_desc}</TaskDescription>
                    {this.props.data.task_status == 'A fazer' &&
                        <BodyFlex>
                            <BodyFlexStatus bgStatus="#ff8c00">
                                <FlexStatus>{this.props.data.task_status}</FlexStatus>
                            </BodyFlexStatus>
                            <BodyFlexRegister>
                                <FlexRegister>Criado: {allFormated}</FlexRegister>
                            </BodyFlexRegister>
                        </BodyFlex>
                    }
                    {this.props.data.task_status == 'Fazendo' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#5c8efe">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister>
                                    <FlexRegister>Iniciado: {allFormated}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>
                        </>
                    }
                    {this.props.data.task_status == 'Pausado' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#947bff">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister>
                                    <FlexRegister>Pausado: {allFormated}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>
                        </>
                    }
                    {this.props.data.task_status == 'Concluído' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#00a800">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister>
                                    <FlexRegister>Concluido: {allFormated}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>

                            <BodyFlex>
                                <BodyFlexCountPause bgCountPause="#eee">
                                    <FlexRegister>Qtd Pause: {this.props.data.task_count_pause}</FlexRegister>
                                </BodyFlexCountPause>
                                <BodyFlexCountPause bgCountPause="#eee">
                                    <FlexRegister>tempo de tarefa: {this.props.data.task_time_sum}</FlexRegister>
                                </BodyFlexCountPause>
                            </BodyFlex>
                        </>

                    }
                </TaskInfo>
                {
                    this.props.data.task_status == 'A fazer' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={5} underlayColor="#EBEBEB" onPress={this.doingTask}>
                            <FlexIconBtn source={require('../uploads/play.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.editTask}>
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
                {
                    this.props.data.task_status == 'Fazendo' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={5} underlayColor="#EBEBEB" onPress={this.pauseTask}>
                            <FlexIconBtn source={require('../uploads/pause.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.concludedTask} >
                            <FlexIconBtn source={require('../uploads/check.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.editTask}>
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
                {
                    this.props.data.task_status == 'Pausado' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={5} underlayColor="#EBEBEB" onPress={this.continueTask}>
                            <FlexIconBtn source={require('../uploads/refresh.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.concludedTask}>
                            <FlexIconBtn source={require('../uploads/check.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.editTask}>
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
                {
                    this.props.data.task_status == 'Concluído' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB">
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
            </Task>
        )
    }
}