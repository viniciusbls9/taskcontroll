import React, { Component } from 'react'
import styled from 'styled-components/native'
import Sistema from '../Sistema'
import firebase from '../FirebaseConnection'

const Task = styled.View`
    background-color:#fff;
    border-left-width:3px;
    border-color:#5c8efe;
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
            task_concluded_register: '',
            lista: []
        }
    }

    render() {

        return (
            <Task>
                <TaskInfo>
                    <TaskTitle>{this.props.data.client + ' - ' + this.props.data.service}</TaskTitle>
                    <TaskDescription numberOfLines={2} >{this.props.data.task_desc}</TaskDescription>

                    <BodyFlex>
                        <BodyFlexStatus bgStatus="#ff8c00">
                            <FlexStatus>{this.props.data.task_status}</FlexStatus>
                        </BodyFlexStatus>
                        <BodyFlexRegister bgRegister="#c4c4c4">
                            <FlexRegister>Criado: {this.props.data.task_register}</FlexRegister>
                        </BodyFlexRegister>
                    </BodyFlex>
                </TaskInfo>
            </Task>
        )
    }
}