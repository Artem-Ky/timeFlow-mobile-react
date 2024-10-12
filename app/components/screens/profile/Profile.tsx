import Button from '@/components/ui/Button/Button'
import Layout from '@/components/ui/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { View, Text } from 'react-native'

export const Profile: FC = () => {
	const {setUser} = useAuth();

	return (
		<Layout title='Профиль'>
			<Button onPress={() => setUser(null)}>Выйти из аккаунта</Button>
		</Layout>
	)
}
