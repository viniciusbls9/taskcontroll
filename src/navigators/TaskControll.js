import { createBottomTabNavigator } from 'react-navigation-tabs'

import ToDo from '../screens/ToDo'
import Doing from '../screens/Doing'
import Paused from '../screens/Paused'
import Concluded from '../screens/Concluded'
import Profile from '../screens/Profile'
// import SelectAddTask from '../components/SelectAddTask'


const BottomNavigator = createBottomTabNavigator({
    ToDo,
    Doing,
    Paused,
    Concluded,
    Profile,
    // SelectAddTask

}, {
    tabBarOptions:{
        showLabel:false
    }
})

export default BottomNavigator