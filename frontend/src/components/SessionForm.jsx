import { useState } from 'react'
import './SessionForm.css'

// eslint-disable-next-line react/prop-types
export default function SessionForm({type, flowStage, setFlowStage}) {


	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const handleClick = (e) => {
		if (flowStage === 0) {
			e.preventDefault()
			setFlowStage(1)
		}
	}

	const handleSubmit = (e) => {}
	return (<form>
		{type === 'register' && <h3>Sign up to continue</h3>
							|| <h3>Log in to continue</h3>}
		<label htmlFor="session-email" hidden={flowStage === 0}>
			Email address
		</label>
		<input type='email'
			placeholder='Enter your email'
			id='session-email'
			value={email}
			onChange={e => setEmail(e.target.value)}
			disabled={flowStage > 0} />
		<label htmlFor="session-username" hidden={flowStage === 0 || type === 'login'}>
			Full name <span className='red'>*</span>
			<input type='text'
				placeholder='Enter full name'
				id='session-username'
				value={username}
				onChange={e => setUsername(e.target.value)}/>
		</label>
		<label htmlFor="session-password" hidden={flowStage === 0}>
			Password <span className='red'>*</span>
			<input type="password" 
				placeholder={type==='register' ? 'Create password' :'Enter password'}
				id='session-password'
				value={password}
				onChange={e => setPassword(e.target.value)}/>
		</label>
		<button onClick={handleClick}>
			{(flowStage === 0 && type === 'login')
				|| 'Log In'
				&& 'Continue'}
		</button>
	</form>)
}