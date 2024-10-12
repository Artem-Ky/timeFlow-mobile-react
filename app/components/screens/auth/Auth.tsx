import Button from '@/components/ui/Button/Button'
import cn from 'clsx'
import Loader from '@/components/ui/Loader/Loader'
import { useAuth } from '@/hooks/useAuth'
import { IAuthFormData } from '@/types/auth.interface'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { View, Text, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native'
import AuthFields from './AuthFields'

export const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { setUser } = useAuth()

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		setUser({
			_id: '1',
			...data
		})
	}

	const isLoading = false;

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-white text-4xl font-bold text-center mb-5'>
						{isReg ? 'Вход' : 'Регистрация'}
					</Text>

					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} />

							<Button onPress={handleSubmit(onSubmit)}>Войти</Button>

							<Pressable
								onPress={() => setIsReg(!isReg)}
								className={cn('self-end', {
									['w-16']: !isReg,
									['w-30']: isReg
								})}
							>
								<Text className='text-opacity-60 text-white text-base mt-3 text-right'>
									{isReg ? 'Создать аккаунт' : 'Войти'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}
