import cn from 'clsx'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from './email.rgx'

const AuthFields: FC<{ control: Control<IAuthFormData> }> = ({ control }) => {
	return (
		<>
			<Controller
				control={control}
				name='email'
				rules={{
					required: 'Email обязательное поле',
					pattern: {
						value: validEmail,
						message: 'Введите верный Email!'
					}
				}}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							className={cn(
								'rounded bg-[#272541] border pb-4 pt-2.5 px-4 my-2',
								!!error ? 'border-red-500' : 'border-transparent'
							)}
						>
							<TextInput
								placeholder='Введите Email'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								className='text-white text-lg'
							/>
						</View>
						{error && <Text className='text-red-500'>{error.message}</Text>}
					</>
				)}
			/>
			<Controller
				control={control}
				name='password'
				rules={{
					required: 'Password обязательное поле',
					minLength: {
						value: 6,
						message: 'Длина пароля должена быть от 6 символов'
					}
				}}
				render={({
					field: { value, onChange, onBlur },
					fieldState: { error }
				}) => (
					<>
						<View
							className={cn(
								'rounded bg-[#272541] border pb-4 pt-2.5 px-4 my-2',
								!!error ? 'border-red-500' : 'border-transparent'
							)}
						>
							<TextInput
								placeholder='Введите пароль'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								className='text-white text-lg'
								secureTextEntry
							/>
						</View>
						{error && <Text className='text-red-500'>{error.message}</Text>}
					</>
				)}
			/>
		</>
	)
}

export default AuthFields
