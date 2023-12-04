import { queryClient } from '@/libs/config/react-query'
import { defaultTheme } from '@/libs/config/theme'
import { Navigation, navigationRef } from '@/navigation'
import Gate from '@/store/Gate'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import { useRef } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Provider as ThemeProvider } from 'react-native-paper'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function App() {
  const routeNameRef = useRef<string>()

  const [fontLoaded] = useFonts({
    'Itim-Regular': require('@/assets/fonts/Itim-Regular.ttf'),
  })

  if (!fontLoaded) {
    return (
      <View>
        <ActivityIndicator animating={true} color="base.primary" />
      </View>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <NavigationContainer
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute()?.name
          }}
          ref={navigationRef}
        >
          <Gate>
            <Navigation />
          </Gate>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
