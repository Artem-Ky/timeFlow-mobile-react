import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable } from 'react-native'

interface IArrow {
	direction: 'left' | 'right'
}

export const Arrow: FC<IArrow> = ({ direction }) => {


	return (
		<Pressable
			onPress={() => {

			}}
			className='bg-primary w-[65px] h-[65px] rounded-full items-center justify-center'
		>
			<Entypo name={`chevron-${direction}`} size={34} color='white' />
		</Pressable>
	)
}
