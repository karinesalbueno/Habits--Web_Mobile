import { NavigationContainer } from '@react-navigation/native';

import { View } from 'react-native'

import { Routes } from './routes'

export function AppRoutes() {
    return (
        <View className='flex-1 bg-background'>
            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </View>
    )
}