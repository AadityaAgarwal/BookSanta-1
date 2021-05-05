import * as React from 'react'
import { View, Text } from 'react-native'
import { DrawerItems, createDrawerNavigator } from 'react-navigation-drawer'
import { TabNavigator } from '../TabNavigator'
import CustomSideDrawer from './customSideDrawer'
import Settings from '../screens/Settings'

export const DrawerNavigator = createDrawerNavigator({
    Home: TabNavigator,
    Settings: Settings
}, {
    contentComponent: CustomSideDrawer
}, {
    initialRouteName: 'Home'
})