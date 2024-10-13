import { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Text } from 'react-native'
import cn from 'clsx'
import { AntDesign } from '@expo/vector-icons'
import Actions from './Actions/Actions'

export enum EnumStatus {
	REST = 'Отдых',
	WORK = 'Работа',
	Complete = 'Вы справились!'
}
const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState<number>(5)
	const [key, setKey] = useState<number>(0)
	const flowDuration = 1 * 10
	const sessionsCount = 10
	const breakDuration = 1 * 10
	const isCompleted = currentSession === sessionsCount
	const isSmallIndicator = sessionsCount > 7

	useEffect(() => {
		if (isPlaying) {
			setKey(prev => prev + 1), setStatus(EnumStatus.WORK)
		} else {
			setStatus(EnumStatus.REST)
		}

		if (isCompleted) {
			setStatus(EnumStatus.Complete)
		}
	}, [isPlaying])

	const formatTime = (number: number) => (number < 10 ? '0' + number : number)
	return (
		<View className='justify-center flex-1'>
			<View className='self-center items-center'>
				<CountdownCircleTimer
					key={key}
					isPlaying={isPlaying}
					duration={status === EnumStatus.REST ? breakDuration : flowDuration}
					colors={['#3A3570', '#664FF3']}
					colorsTime={[
						status === EnumStatus.REST ? breakDuration : flowDuration,
						0
					]}
					trailColor='#2F2F4C'
					onComplete={() => {
						setIsPlaying(false), setCurrentSession(prev => prev + 1)

						return {
							shouldRepeat: true
						}
					}}
					size={300}
					strokeWidth={15}
				>
					{({ remainingTime }) => {
						const minutes = Math.floor(remainingTime / 60)
						const seconds = remainingTime % 60
						return (
							<View style={{ alignItems: 'center' }}>
								<Text className='text-white text-6xl font-semibold'>{`${formatTime(
									minutes
								)}:${formatTime(seconds)}`}</Text>
								<Text className='text-center text-2xl text-white mt-0.5'>
									{status}
								</Text>
							</View>
						)
					}}
				</CountdownCircleTimer>

				<View className='mt-14 flex-row items-center'>
					{[1, 2, 3, 4, 5, 6, 7,8,9,10].map((_, i) => {
						return (
							<View className='flex-row items-center' key={i}>
								<View
									className={cn(
										'border-4 rounded-full',
										i === currentSession
											? 'border-primary bg-transparent'
											: 'border-transparent bg-inActive',
										{
											'bg-primary': i < currentSession
										},
										isSmallIndicator ? 'w-3 h-3' : 'w-5 h-5'
									)}
								></View>

								{i !== 0 && (
									<View
										className={cn(
											'absolute -top-6',
											isSmallIndicator ? '-left-4' : '-left-5'
										)}
									>
										<AntDesign
											name='rest'
											size={isSmallIndicator ? 16 : 18}
											color={i <= currentSession ? '#523FC0' : '#3c3c5d'}
										/>
									</View>
								)}

								{i !== sessionsCount - 1 && (
									<View
										className={cn(
											' h-0.5 bg-inActive',
											{
												'bg-primary': currentSession >= i + 1
											},
											isSmallIndicator ? 'w-4' : 'w-6'
										)}
									></View>
								)}
							</View>
						)
					})}
				</View>

				<Actions isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
			</View>
		</View>
	)
}

export default Timer
