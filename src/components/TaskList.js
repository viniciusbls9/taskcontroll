import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import { Alert } from 'react-native'
const Task = styled.View`
    background-color:#f1f1f1;
    border:2px solid #ccc;
    border-radius:5px;
    padding:10px;
    margin:7px;

`
const TaskInfo = styled.View`
    
`
const TaskTitle = styled.Text`
    font-size:15px;
    border-bottom-width:1px;
    border-color:#ccc;
    padding-bottom:10px;
    margin-bottom:10px;
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
`
const FlexStatus = styled.Text`
    font-size:9px;
    font-weight:bold;
    color:#fff;
    text-transform:uppercase;
`
const BodyFlexRegister = styled.View`
    background-color:${props => props.bgRegister};
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
            let hoursFormated = (hours + 1) + ':' + min + ':' + sec

            let state = this.state
            state.task_doing_register = dateFormated + ' às ' + hoursFormated

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
                task_doing_register: this.state.task_doing_register,
                task_register: this.state.task_register
            })
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
            let hoursFormated = (hours + 1) + ':' + min + ':' + sec

            let state = this.state
            state.task_pause_register = dateFormated + ' às ' + hoursFormated

            if (this.state.task_count_pause == 0) {
                firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                    task_desc: this.props.data.task_desc,
                    client: this.props.data.client,
                    service: this.props.data.service,
                    task_status: 'Pausado',
                    task_pause_register: this.state.task_pause_register,
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
                    task_status: 'Pausado',
                    task_pause_register: this.state.task_pause_register,
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
            let hoursFormated = (hours + 1) + ':' + min + ':' + sec
            
            let state = this.state
            state.task_concluded_register = dateFormated + ' ' + hoursFormated

            firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                task_desc: this.props.data.task_desc,
                client: this.props.data.client,
                service: this.props.data.service,
                task_status: 'Concluído',
                task_pause_register: this.state.task_pause_register,
                task_continue_register: '',
                task_concluded_register: this.state.task_concluded_register,
                task_time_sum: '',
                task_count_pause: this.state.task_count_pause,
                task_doing_register: this.state.task_doing_register,
                task_register: this.state.task_register
            })
        })
    }


    deleteTask() {
        Alert.alert(
            this.props.data.client +' - '+ this.props.data.service,
            'Deseja excluir está tarefa?',
            [
                { 
                    text: 'Sim', 
                    onPress: () => firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).remove(),
                    style:'cancel'
                },
                {
                    text: 'Cancel',
                    onPress: () => {}
                },
            ],
            { cancelable: false },
        );
    }

    render() {

        return (
            <Task>
                <TaskInfo>
                    <TaskTitle>{this.props.data.client + ' - ' + this.props.data.service}</TaskTitle>
                    <TaskDescription numberOfLines={2} >{this.props.data.task_desc}</TaskDescription>
                    {this.props.data.task_status == 'A fazer' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#ff8c00">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister bgRegister="#c4c4c4">
                                    <FlexRegister>Criado: {this.props.data.task_register}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>
                        </>
                    }
                    {this.props.data.task_status == 'Fazendo' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#1e90ff">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister bgRegister="#c4c4c4">
                                    <FlexRegister>Iniciado: {this.props.data.task_doing_register}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>
                        </>
                    }
                    {this.props.data.task_status == 'Pausado' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#800080">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister bgRegister="#c4c4c4">
                                    <FlexRegister>Pausado: {this.props.data.task_pause_register}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>
                        </>
                    }
                    {this.props.data.task_status == 'Concluído' &&
                        <>
                            <BodyFlex>
                                <BodyFlexStatus bgStatus="#008000">
                                    <FlexStatus>{this.props.data.task_status}</FlexStatus>
                                </BodyFlexStatus>
                                <BodyFlexRegister bgRegister="#c4c4c4">
                                    <FlexRegister>Concluido: {this.props.data.task_concluded_register}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>

                            <BodyFlex>
                                <BodyFlexCountPause bgCountPause="#c4c4c4">
                                    <FlexRegister>Qtd Pause: {this.props.data.task_count_pause}
                                    </FlexRegister>
                                </BodyFlexCountPause>
                            </BodyFlex>
                        </>

                    }
                </TaskInfo>
                {this.props.data.task_status == 'A fazer' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={5} underlayColor="#EBEBEB" onPress={this.doingTask}>
                            <FlexIconBtn source={require('../uploads/play.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB">
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
                {this.props.data.task_status == 'Fazendo' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={5} underlayColor="#EBEBEB" onPress={this.pauseTask}>
                            <FlexIconBtn source={require('../uploads/pause.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.concludedTask} >
                            <FlexIconBtn source={require('../uploads/check.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB">
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
                {this.props.data.task_status == 'Pausado' &&
                    <FlexTaskBtn>
                        <FlexBtn flex={5} underlayColor="#EBEBEB" onPress={this.continueTask}>
                            <FlexIconBtn source={require('../uploads/refresh.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.concludedTask}>
                            <FlexIconBtn source={require('../uploads/check.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB">
                            <FlexIconBtn source={require('../uploads/pencil.png')} />
                        </FlexBtn>
                        <FlexBtn flex={1} underlayColor="#EBEBEB" onPress={this.deleteTask}>
                            <FlexIconBtn source={require('../uploads/bin.png')} />
                        </FlexBtn>
                    </FlexTaskBtn>
                }
                {this.props.data.task_status == 'Concluído' &&
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