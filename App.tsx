import { queryClient } from '@/libs/config/react-query'
import { defaultTheme } from '@/libs/config/theme'
import { Navigation, navigationRef } from '@/navigation'
import Gate from '@/store/Gate'
import { NavigationContainer } from '@react-navigation/native'
import { StripeProvider } from '@stripe/stripe-react-native'
import { QueryClientProvider } from '@tanstack/react-query'
import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import { useRef } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ActivityIndicator, Provider as ThemeProvider } from 'react-native-paper'

global.__reanimatedWorkletInit = () => {}

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color="base.primary" />
      </View>
    )
  }

  const STRIPE_KEY =
    'pk_test_51OCfUJH0CBe8HDnMz61JfQrmv4IHvjIJfvdcQJNZn3SoD4iU0pM7jDe0eMoWUHyYG2UzT6ucu7ULbx3ETY4seIeH00OdsgGGUt'

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer
            onReady={() => {
              routeNameRef.current = navigationRef.getCurrentRoute()?.name
            }}
            ref={navigationRef}
          >
            <Gate>
              <StripeProvider publishableKey={STRIPE_KEY}>
                <Navigation />
              </StripeProvider>
            </Gate>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

registerRootComponent(App)
