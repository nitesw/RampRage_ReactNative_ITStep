import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function AuthLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: Platform.select({
                    ios: {
                        backgroundColor: '#120513',
                        position: 'absolute',
                    },
                    default: {
                        backgroundColor: '#120513',
                    },
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    href: null
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Sing In',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="person.crop.circle" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Sign Up',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="person.badge.plus" color={color}/>,
                }}
            />
        </Tabs>
    );
}
