import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
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
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="person.circle" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'Categories',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="category.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="createCategory"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}
