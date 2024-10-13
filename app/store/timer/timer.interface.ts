export enum EnumStatus {
	REST = 'Отдых',
	WORK = 'Работа',
	COMPLETED = 'Вы справились!'
}

export interface ITimerOptions {
	isPlaying: boolean
	status: EnumStatus
	currentSession: number
	key: number
}
