import { AppConstants } from '@/app.constants'
import { Foundation } from '@expo/vector-icons'
import cn from 'clsx'
import { Pressable, View } from 'react-native'

interface Props {
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
export const PlayButton = ({ isPlaying, setIsPlaying }: Props) => {
	return (
		<View>
			<Pressable
				onPress={() => {
					setIsPlaying(prev => !prev)
				}}
				className={cn(
					'mx-7 bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
					{
						'pl-1.5': !isPlaying
					}
				)}
				style={playShadow}
			>
				<Foundation
					name={isPlaying ? 'pause' : 'play'}
					color='white'
					size={44}
				/>
			</Pressable>
		</View>
	)
}

const playShadow = {
	shadowColor: AppConstants.primary,
	shadowOffset: {
		width: 0,
		height: 3
	},
	shadowOpacity: 0.6,
	shadowRadius: 8,
	elevation: 20
}
