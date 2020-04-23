import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/Login'
import Register from '../screens/Register'
import TaskControll from './TaskControll'
import AddTask from '../screens/AddTask'
import Preload from '../screens/Preload'
import AddClient from '../screens/AddClient'
import AddService from '../screens/AddService'

const MainNavigator = createStackNavigator({
    Preload,
    Login,
    Register,
    AddTask,
    AddClient,
    AddService,
    TaskControll
}, {
    defaultNavigationOptions:{
        title:'TaskControll',
        headerStyle: {
            backgroundColor:'#040E1F',
        },        
        headerTitleStyle: {
            color:'#ffffff'
        },
        headerLeft: () => null
    }
})

export default MainNavigator