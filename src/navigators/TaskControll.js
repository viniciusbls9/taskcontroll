import { createBottomTabNavigator } from 'react-navigation-tabs'

import ToDo from '../screens/ToDo'
import Doing from '../screens/Doing'
import Paused from '../screens/Paused'
import Concluded from '../screens/Concluded'
import Profile from '../screens/Profile'

const BottomNavigator = createBottomTabNavigator({
    ToDo,
    Doing,
    Paused,
    Concluded,
    Profile,

}, {
    tabBarOptions:{
        showLabel:false
    }
})

export default BottomNavigator