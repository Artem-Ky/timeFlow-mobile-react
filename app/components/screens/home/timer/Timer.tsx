import { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { PlayButton } from './Actions/PlayButton'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Text } from 'react-native'
import cn from 'clsx'

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
	const sessionsCount = 7
	const brakeDuration = 1 * 60
	const isCompleted = currentSession === sessionsCount;

	useEffect(()=> {
		if(isPlaying) {
			setKey(prev => prev +1),
			setStatus(EnumStatus.WORK)
		}
		else {
			setStatus(EnumStatus.REST)
		}

		if(isCompleted) {
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
					duration={flowDuration}
					colors={['#3A3570', '#664FF3']}
					colorsTime={[flowDuration, 5]}
					trailColor='#2F2F4C'
					onComplete={() => {
						setIsPlaying(false),
						setCurrentSession(prev => prev + 1)

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
					{[1, 2, 3, 4, 5, 6, 7].map((_, i) => {
						return (
							<View className='flex-row items-center' key={i}>
								<View
									className={cn(
										'w-5 h-5 border-4 rounded-full',
										i === currentSession
											? 'border-primary bg-transparent'
											: 'border-transparent bg-inActive',
										{
											'bg-primary': i < currentSession
										}
									)}
								></View>
								{i !== sessionsCount - 1 && (
									<View
										className={cn('w-6 h-0.5 bg-inActive', {
											'bg-primary': currentSession >= i + 1
										})}
									></View>
								)}
							</View>
						)
					})}
				</View>

				<PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
			</View>
		</View>
	)
}

export default Timer
