import { currentUserSelector } from '../store/selectors/session.js'
import { useSelector } from 'react-redux'

export default function Home() {
	const user = useSelector(currentUserSelector)
	return <h1>Hello, {user.username}!</h1>
}