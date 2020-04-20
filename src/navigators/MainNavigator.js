import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/Login'
import Register from '../screens/Register'
import TaskControll from './TaskControll'
import AddTask from '../screens/AddTask'
import Preload from '../screens/Preload'

const MainNavigator = createStackNavigator({
    Preload,
    Login,
    Register,
    AddTask,
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