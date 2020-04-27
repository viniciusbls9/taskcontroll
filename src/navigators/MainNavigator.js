import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/Login'
import Register from '../screens/Register'
import AddTask from '../screens/AddTask'
import Preload from '../screens/Preload'
import AddClient from '../screens/AddClient'
import AddService from '../screens/AddService'
import HomeDrawer from './HomeDrawer'

const MainNavigator = createStackNavigator({
    Preload,
    Login,
    Register,
    AddTask,
    AddClient,
    AddService,
    HomeDrawer
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