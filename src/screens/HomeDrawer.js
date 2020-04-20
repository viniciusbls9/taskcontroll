import { createDrawerNavigator } from 'react-navigation-drawer'
import ToDo from './ToDo'
import Doing from './Doing'
import Paused from './Paused'
import Concluded from './Concluded'
import AddTask from './AddTask'

const DrawerNavigator = createDrawerNavigator({
    ToDo,
    Doing,
    AddTask,
    Paused,
    Concluded
})

export default DrawerNavigator