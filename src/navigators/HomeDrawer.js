import { createDrawerNavigator } from 'react-navigation-drawer'
import AddClient from '../screens/AddClient'
import AddService from '../screens/AddService'
import Profile from '../screens/Profile'
import TaskControll from './TaskControll'

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen:TaskControll
    },
    AddClient,
    AddService,
    Profile
}, {
    drawerWidth:200,
    edgeWidth:250,
    contentOptions: {
        activeTintColor:'#457bf6',
        inactiveTintColor:'#aaa',
    }
})
export default DrawerNavigator



// , {
//     drawerType:'slide',
//     drawerWidth:100,
//     contentOptions: {
        
//     }
// }