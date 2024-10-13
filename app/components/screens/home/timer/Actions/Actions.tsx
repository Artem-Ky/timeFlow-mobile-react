import { FC } from 'react'
import { View } from 'react-native'

import {Arrow} from './Arrow'
import { PlayButton } from './PlayButton'

interface Props {
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
const Actions = ({isPlaying, setIsPlaying}: Props) => {
	return (
		<View className='flex-row items-center justify-center mt-14 relative'>
			<Arrow direction='left' />

			<PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

			<Arrow direction='right' />
		</View>
	)
}

export default Actions
