import { createBottomTabNavigator } from 'react-navigation-tabs'

import ToDo from '../screens/ToDo'
import Doing from '../screens/Doing'
import Paused from '../screens/Paused'
import Concluded from '../screens/Concluded'

const BottomNavigator = createBottomTabNavigator({
    ToDo,
    Doing,
    Paused,
    Concluded
}, {
    tabBarOptions:{
        showLabel:false
    }
})

export default BottomNavigator