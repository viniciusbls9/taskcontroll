import React, { Component } from 'react'
import styled from 'styled-components/native'

const Add = styled.View`
    flex:1;
    flex-direction:row;
    justify-content:space-between;
    align-items:flex-end;
`
const FlexIcon = styled.Image`
    width:20px;
    height:20px;
`
const FlexAddButton = styled.TouchableHighlight`
    width:60px;
    height:60px;
    border-radius:30px;
    align-items:center;
    justify-content:center;
    background-color:#f0d018;
`


export default class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.addTask = this.addTask.bind(this)
    }

    addTask(props) {
        this.props.navigation.navigate('Todo')
    }

    render() {
        return (
            <Add>
                <FlexAddButton onPress={this.addTask} underlayColor="#dec10c">
                    <FlexIcon source={require('../uploads/more.png')} />
                </FlexAddButton>
            </Add>
        )
    }
}