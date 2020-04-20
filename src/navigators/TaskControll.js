import { createBottomTabNavigator } from 'react-navigation-tabs'

import React, { Component } from 'react'
import styled from 'styled-components/native'

import ToDo from '../screens/ToDo'
import Doing from '../screens/Doing'
import Paused from '../screens/Paused'
import Concluded from '../screens/Concluded'

import Profile from '../screens/Profile'

const FlexIcon = styled.Image`
    width:20px;
    height:20px;
`

const BottomNavigator = createBottomTabNavigator({
    ToDo,
    Doing,
    Paused,
    Concluded,
    Profile
}, {
    tabBarOptions:{
        activeTintColor:'#031026',
        activeBackgroundColor:'#F0D018',
        labelStyle: {
            fontSize:9
        },
        tabStyle:{
            height:50
        }
    }
})

export default BottomNavigator