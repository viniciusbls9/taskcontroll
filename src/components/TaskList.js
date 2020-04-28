import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'
import { Alert } from 'react-native'

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
            priority: '',
            task_time_sum: '',
            task_pause_sum: '',
            task_continue_register: '',
            task_pause_register: '',
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
            // this.setState(state)

            firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                task_desc: this.props.data.task_desc,
                client: this.props.data.client,
                priority: this.props.data.priority,
                service: this.props.data.service,
                task_status: 'Fazendo',
                task_pause_register: '',
                task_continue_register: '',
                task_concluded_register: '',
                task_time_sum: '',
                task_pause_sum: '',
                task_count_pause: 0,
                task_doing_register: Date.now(),
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

            /* PEGA A PRIORIDADE DA TAREFA */
            let priority_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('priority')

            priority_val.on('value', (snapshot) => {
                let state = this.state
                state.priority = snapshot.val()
            })

            /* PEGA A DATA E HORA DE CONTINUAÇÃO DA TAREFA */
            let time_continue_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_continue_register')

            time_continue_val.on('value', (snapshot) => {
                let state = this.state
                state.task_continue_register = snapshot.val()
            })

            /* PEGA A DATA E HORA DA ULTIMA PAUSA DA TAREFA */
            let task_pause_register_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_pause_register')

            task_pause_register_val.on('value', (snapshot) => {
                let state = this.state
                state.task_pause_register = snapshot.val()
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

            if (this.state.task_count_pause == 0) {
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
                    task_pause_sum: Date.now(),
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
                    task_continue_register: this.state.task_continue_register,
                    task_concluded_register: '',
                    task_time_sum: Math.abs(Date.now() - this.state.task_continue_register),
                    task_pause_sum: this.state.task_pause_register + this.state.task_continue_register,
                    task_count_pause: (this.state.task_count_pause) + 1,
                    task_doing_register: this.props.data.task_doing_register,
                    task_register: this.state.task_register
                })
            }
        })
    }

    continueTask() {
        // Sistema.addAuthListener(() => {
        //     firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_status').set('Fazendo')
        // })

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

            /* PEGA A DATA E HORA DA SOMA TOTAL DE TEMPO DA TAREFA */
            let time_sum_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_time_sum')

            time_sum_val.on('value', (snapshot) => {
                let state = this.state
                state.task_time_sum = snapshot.val()
            })

            let pause_sum_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_pause_sum')

            pause_sum_val.on('value', (snapshot) => {
                let state = this.state
                state.task_pause_sum = snapshot.val()
            })

            let task_doing_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_doing_register')

            task_doing_val.on('value', (snapshot) => {
                let state = this.state
                state.task_doing_register = snapshot.val()
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

            firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                task_desc: this.props.data.task_desc,
                client: this.props.data.client,
                service: this.props.data.service,
                priority: this.props.data.priority,
                task_status: 'Fazendo',
                task_pause_register: this.props.data.task_pause_register,
                task_continue_register: Date.now(),
                task_concluded_register: '',
                task_time_sum: this.state.task_time_sum,
                task_pause_sum: (this.props.data.task_pause_register) + Date.now(),
                task_count_pause: this.state.task_count_pause,
                task_doing_register: this.state.task_doing_register,
                task_register: this.state.task_register
            })
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

            /* PEGA A SOMA DAS PAUSAS DA TAREFA */
            let task_pause_sum_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_pause_sum')

            task_pause_sum_val.on('value', (snapshot) => {
                let state = this.state
                state.task_pause_sum = snapshot.val()
            })

            /* PEGA O TEMPO FINAL DA TAREFA */
            let task_time_sum_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_time_sum')

            task_time_sum_val.on('value', (snapshot) => {
                let state = this.state
                state.task_time_sum = snapshot.val()
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

            firebase.database().ref('tasks').child(auth).child(this.props.data.key).set({
                task_desc: this.props.data.task_desc,
                client: this.props.data.client,
                service: this.props.data.service,
                priority: this.props.data.priority,
                task_status: 'Concluído',
                task_pause_register: this.state.task_pause_register,
                task_continue_register: '',
                task_concluded_register: Date.now(),
                task_time_sum: Math.abs((this.state.task_doing_register - Date.now()) - this.state.task_pause_sum) ,
                task_pause_sum: this.state.task_pause_sum,
                task_count_pause: this.state.task_count_pause,
                task_doing_register: this.state.task_doing_register,
                task_register: this.state.task_register
            })
        })
    }

    editTask() {

        /* PEGA DATA DE REGISTRO DA TAREFA */
        // let task_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key)

        // task_val.on('value', (snapshot) => {
        //     let state = this.state
        //     state.task_desc = snapshot.val().task_desc,
        //     state.client = snapshot.val().client,
        //     state.service = snapshot.val().service,
        //     state.priority = snapshot.val().priority
        //     this.setState(state)
        // })
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

        /* FORMATA DATA E HORA DE REGISTRO DA TAREFA */
        let register = this.props.data.task_register
        let dateRegister = new Date(register)
        let dayRegister = dateRegister.getDate()
        let monthRegister = dateRegister.getMonth()
        let yearRegister = dateRegister.getFullYear()
        let hoursRegister = dateRegister.getHours()
        let minRegister = dateRegister.getMinutes()
        let secRegister = dateRegister.getSeconds()

        dayRegister = dayRegister < 10 ? '0' + dayRegister : dayRegister
        monthRegister = (monthRegister + 1) < 10 ? '0' + (monthRegister + 1) : (monthRegister + 1)
        minRegister = minRegister < 10 ? '0' + minRegister : minRegister

        let dateRegisterFormated = dayRegister + '/' + monthRegister + '/' + yearRegister
        let hoursRegisterFormated = hoursRegister + ':' + minRegister + ':' + secRegister

        let allRegisterFormated = dateRegisterFormated + ' às ' + hoursRegisterFormated

        /* FORMATA DATA E HORA DE REGISTRO DE INICIO DE TAREFA */
        let doingRegister = this.props.data.task_doing_register
        let dateDoing = new Date(doingRegister)
        let dayDoingRegister = dateDoing.getDate()
        let monthDoingRegister = dateDoing.getMonth()
        let yearDoingRegister = dateDoing.getFullYear()
        let hoursDoingRegister = dateDoing.getHours()
        let minDoingRegister = dateDoing.getMinutes()
        let secDoingRegister = dateDoing.getSeconds()

        dayDoingRegister = dayDoingRegister < 10 ? '0' + dayDoingRegister : dayDoingRegister
        monthDoingRegister = (monthDoingRegister + 1) < 10 ? '0' + (monthDoingRegister + 1) : (monthDoingRegister + 1)
        minDoingRegister = minDoingRegister < 10 ? '0' + minDoingRegister : minDoingRegister

        let dateDoingRegisterFormated = dayDoingRegister + '/' + monthDoingRegister + '/' + yearDoingRegister
        let hoursDoingRegisterFormated = hoursDoingRegister + ':' + minDoingRegister + ':' + secDoingRegister

        let allDoingRegisterFormated = dateDoingRegisterFormated + ' às ' + hoursDoingRegisterFormated

        /* FORMATA DATA E HORA DE REGISTRO DE PAUSE DE TAREGA */
        let pauseRegister = this.props.data.task_pause_register
        let datePause = new Date(pauseRegister)
        let dayPauseRegister = datePause.getDate()
        let monthPauseRegister = datePause.getMonth()
        let yearPauseRegister = datePause.getFullYear()
        let hoursPauseRegister = datePause.getHours()
        let minPauseRegister = datePause.getMinutes()
        let secPauseRegister = datePause.getSeconds()

        dayPauseRegister = dayPauseRegister < 10 ? '0' + dayPauseRegister : dayPauseRegister
        monthPauseRegister = (monthPauseRegister + 1) < 10 ? '0' + (monthPauseRegister + 1) : (monthPauseRegister + 1)
        minPauseRegister = minPauseRegister < 10 ? '0' + minPauseRegister : minPauseRegister

        let datePauseRegisterFormated = dayPauseRegister + '/' + monthPauseRegister + '/' + yearPauseRegister
        let hoursPauseRegisterFormated = hoursPauseRegister + ':' + minPauseRegister + ':' + secPauseRegister

        let allPauseRegisterFormated = datePauseRegisterFormated + ' às ' + hoursPauseRegisterFormated

        /* FORMATA DATA E HORA DE REGISTRO DE CONCLUSÃO DE TAREFA */
        let concludedRegister = this.props.data.task_concluded_register
        let dateConcluded = new Date(concludedRegister)
        let dayConcludedRegister = dateConcluded.getDate()
        let monthConcludedRegister = dateConcluded.getMonth()
        let yearConcludedRegister = dateConcluded.getFullYear()
        let hoursConcludedRegister = dateConcluded.getHours()
        let minConcludedRegister = dateConcluded.getMinutes()
        let secConcludedRegister = dateConcluded.getSeconds()

        dayConcludedRegister = dayConcludedRegister < 10 ? '0' + dayConcludedRegister : dayConcludedRegister
        monthConcludedRegister = (monthConcludedRegister + 1) < 10 ? '0' + (monthConcludedRegister + 1) : (monthConcludedRegister + 1)
        minConcludedRegister = minConcludedRegister < 10 ? '0' + minConcludedRegister : minConcludedRegister

        let dateConcludedRegisterFormated = dayConcludedRegister + '/' + monthConcludedRegister + '/' + yearConcludedRegister
        let hoursConcludedRegisterFormated = hoursConcludedRegister + ':' + minConcludedRegister + ':' + secConcludedRegister

        let allConcludedRegisterFormated = dateConcludedRegisterFormated + ' às ' + hoursConcludedRegisterFormated


        /* FORMATA DATA E HORA DE TEMPO LEVADO NA TAREFA */

        /* PEGA O TEMPO FINAL DA TAREFA */
        let task_time_sum_val = firebase.database().ref('tasks').child(this.state.auth).child(this.props.data.key).child('task_time_sum')

        task_time_sum_val.on('value', (snapshot) => {
            let state = this.state
            state.task_time_sum = snapshot.val()
        })


        let timeSumRegister = this.state.task_time_sum
        let dateTimeSumConcluded = new Date(timeSumRegister)
        let dayTimeSumRegister = dateTimeSumConcluded.getDate()
        let monthTimeSumRegister = dateTimeSumConcluded.getMonth()
        let yearTimeSumRegister = dateTimeSumConcluded.getFullYear()
        let hoursTimeSumRegister = dateTimeSumConcluded.getHours()
        let minTimeSumRegister = dateTimeSumConcluded.getMinutes()
        let secTimeSumRegister = dateTimeSumConcluded.getSeconds()

        dayTimeSumRegister = dayTimeSumRegister < 10 ? '0' + dayTimeSumRegister : dayTimeSumRegister
        monthTimeSumRegister = (monthTimeSumRegister + 1) < 10 ? '0' + (monthTimeSumRegister + 1) : (monthTimeSumRegister + 1)
        minTimeSumRegister = minTimeSumRegister < 10 ? '0' + minTimeSumRegister : minTimeSumRegister

        let hoursTimeSumRegisterFormated = hoursTimeSumRegister + ':' + minTimeSumRegister + ':' + secTimeSumRegister

        let allTimeSumRegisterFormated = hoursTimeSumRegisterFormated

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
                                <FlexRegister>Criado: {allRegisterFormated}</FlexRegister>
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
                                    <FlexRegister>Iniciado: {allDoingRegisterFormated}</FlexRegister>
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
                                    <FlexRegister>Pausado: {allPauseRegisterFormated}</FlexRegister>
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
                                    <FlexRegister>Concluido: {allConcludedRegisterFormated}</FlexRegister>
                                </BodyFlexRegister>
                            </BodyFlex>

                            <BodyFlex>
                                <BodyFlexCountPause bgCountPause="#eee">
                                    <FlexRegister>Qtd Pause: {this.props.data.task_count_pause}</FlexRegister>
                                </BodyFlexCountPause>
                                <BodyFlexCountPause bgCountPause="#eee">
                                    <FlexRegister>tempo de tarefa: {allTimeSumRegisterFormated}</FlexRegister>
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