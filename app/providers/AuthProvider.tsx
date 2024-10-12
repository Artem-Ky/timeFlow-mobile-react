import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useState
} from 'react'
import * as Splash from 'expo-splash-screen'
import { Text, View } from 'react-native'
import { IUser } from '../types/user.interface'

export type TypeUserState = IUser | null
interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
}
export const AuthContext = createContext({} as IContext)

Splash.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
	const [user, setUser] = useState<TypeUserState>({} as IUser)

    useEffect(() => {
        let isMounted = true;

        const getUserFromStorage = async () => {

            // if(isMounted) {

            // }

            Splash.hideAsync()
            
        }

        getUserFromStorage();

        return () => {
            isMounted = false;
        }
    },[])

	return (
		<AuthContext.Provider value={{user, setUser}}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthProvider
