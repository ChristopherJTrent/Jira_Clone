import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AppleIcon from '../assets/apple-logo.svg?react'
import { createUser } from '../store/reducers/user.js'
import JiraIcon from '../assets/jira-logo.svg?react'
import { logIn } from '../store/reducers/session.js'
import MicrosoftIcon from '../assets/microsoft-logo.svg?react'
import PasswordValidatorDisplay from './passwordValidatorDisplay.jsx'
import SlackIcon from '../assets/slack-logo.svg?react'
import {useDispatch} from 'react-redux'
import './SessionForm.css'
export default function SessionForm({type, flowStage, setFlowStage}) {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [passwordScore, setPasswordScore] = useState(0)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (password.length === 0) setPasswordScore(0)
		else if (password.length < 8) setPasswordScore(1)
		else {
			let total = 0
			total += Math.floor(password.length / 4) - 1
			if (/.*\d/.test(password)) total += 1
			if (/.*[a-z]/.test(password)) total += 1
			if (/.*[A-Z]/.test(password)) total += 1
			if (/.*[!@$#%^&*,.;:|]/.test(password)) total += 1
			setPasswordScore(total)
		}
	}, [password])

	const loginDemo = (e) => {
		e.preventDefault()
		dispatch(logIn({email: 'demo@example.com', password: '1Demonstration!'}))
			.then(()=> {
				navigate('/projects')
			})
	}

	const handleClick = (e) => {
		if (flowStage === 0) {
			if (document.getElementById('session-email')?.checkValidity()){
				e.preventDefault()
				setFlowStage(1)
			}
		} else {
			switch(type) {
			case 'register':
				if (!document.getElementById('session-username')
					?.checkValidity()){ 
					e.preventDefault()
				}
			// eslint-disable-next-line no-fallthrough
			case 'login':
				if (!document.getElementById('session-password')
					?.checkValidity()) {
					e.preventDefault()
				}
			}
		}
	}

	const ssoRescue = (e) => {
		e.preventDefault()
		e.stopPropagation()
		alert('SSO authentication is not implemented.')
	}
	const handleHelp = (e) => {
		e.preventDefault()
		alert('password reset isn\'t implemented yet, sorry.')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (type === 'login') {
			dispatch(logIn({email, password})).then(() => {
				navigate('/projects')
			}).catch(() => {
				setHasError(true)
			})
		} else {
			dispatch(createUser({
				username,
				email,
				password
			})).then(() => {
				navigate('/')
			})
		}
	}
	return (<form onSubmit={handleSubmit}>
		<Link to='/'>
			<JiraIcon />
		</Link>
		{type === 'register' && <h3>Sign up to continue</h3>
							|| <h3>Log in to continue</h3>}
		<section id='email'>
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
				Full name <span className='red'>*</span> <br />
				<input type='text'
					placeholder='Enter full name'
					id='session-username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					required={type === 'register'} />
			</label>
			<label htmlFor="session-password" hidden={flowStage === 0}>
				Password <span className='red'>*</span> <br />
				<input type="password" 
					placeholder={type==='register' ? 'Create password' :'Enter password'}
					id='session-password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required={true}/>
			</label>
			<p className={'red' + (hasError ? '' : ' hidden')}>
				Invalid email or password
			</p>
			{(type === 'register' && flowStage === 1) 
				&& <PasswordValidatorDisplay score={passwordScore} />}
			<button id='continue-button' onClick={handleClick}>
				{
					(
						flowStage === 0 && 'Continue'
					) 
					|| (
						type ==='login'
						&& 'Login'
						|| 'Register'
					) 
				}
			</button>
		</section>
		<section id='sso'>
			Or continue with:
			<button onClick={loginDemo}>
				Demo Login
			</button>
			<button onClick={ssoRescue}>
				<span className='svg-container'>
					<MicrosoftIcon />
				</span>
				Microsoft
			</button>
			<button onClick={ssoRescue}>
				<span className='svg-container'>
					<AppleIcon />
				</span>
				Apple
			</button> 
			<button onClick={ssoRescue}>
				<span className='svg-container'>
					<SlackIcon />
				</span>
				Slack
			</button>
		</section>
		<section id='help'>
			{type === 'login' && <><Link onClick={handleHelp}>Can&apos;t log in? </Link><p className='interpunct'>&middot;</p></>}
			{type === 'register' && <Link to='/login'>Already have an account? Log in</Link>
				|| <Link to='/register'>Create an account</Link>}
		</section>
		<section id='branding-footer'>
				
		</section>
				
	</form>)
}