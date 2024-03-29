import SessionForm from '../components/SessionForm.jsx'
import '../assets/login-background.svg'

// eslint-disable-next-line react/prop-types
export default function Session({type}) {
	return (

		<SessionForm type={type}/>
	)
}