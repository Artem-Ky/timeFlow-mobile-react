import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store/store'

import Navigation from '@/navigation/Navigation'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<SafeAreaProvider>
						<Navigation />
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
			<StatusBar style='auto' />
		</QueryClientProvider>
	)
}
