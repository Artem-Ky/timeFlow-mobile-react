import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	Keyboard,
	Pressable,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native'

import AuthFields from '@/components/screens/auth/AuthFields'
import Button from '@/components/ui/Button/Button'
import Loader from '@/components/ui/Loader/Loader'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { deleteItemAsync } from 'expo-secure-store'
import { IAuthFormData } from '@/types/auth.interface'

export const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { login, register } = useActions()
	const { isLoading } = useAuth()

	console.log(isLoading)

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		if (isReg) register(data)
		else login(data)

		reset()
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-white text-3xl font-bold text-center mb-5 w-full'>
						{isReg ? 'Создать аккаунт' : 'Войти'}
					</Text>

					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} />

							<Button onPress={handleSubmit(onSubmit)}>
								{isReg ? 'Создать аккаунт' : 'Войти'}
							</Button>

							<Pressable
								onPress={() => setIsReg(!isReg)}
								className='w-16 self-end w-full'
							>
								<Text className='text-opacity-60 text-white text-base mt-3 text-right'>
									{isReg ? 'Войти' : 'Зарегистрироваться'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}
