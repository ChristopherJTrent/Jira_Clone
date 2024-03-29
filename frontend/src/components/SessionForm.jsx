import { useState } from 'react'
import './SessionForm.css'

// eslint-disable-next-line react/prop-types
export default function SessionForm({type}) {

	const [flowStage, setFlowStage] = useState(0)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleClick = (e) => {
		if (type === 'register') {
			
		}
	}

	const handleSubmit = (e) => {}
	return (<form>
		{type === 'register' && <h3>Sign up to continue</h3>
							|| <h3>Log in to continue</h3>}
		<input type='email'
			placeholder='Enter your email'
			id='session-email'
			value={email}
			onChange={e => setEmail(e.target.value)}
			disabled={flowStage > 0} />
		<input type="password" 
			placeholder='Enter password'
			id='session-password'
			value={password}
			onChange={e => setPassword(e.target.value)}
			className={flowStage === 0 ? 'hidden' : ''}/>
		<button onClick={handleClick}>
			{flowStage === 0 && 'Continue'
					|| 'Log In'}
		</button>
	</form>)
}