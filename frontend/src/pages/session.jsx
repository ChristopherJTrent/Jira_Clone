import Background from '../assets/login-background.svg?react'
import RegistrationLeft from '../assets/register-left.svg?react'
import RegistrationRight from '../assets/register-right.svg?react'
import SessionForm from '../components/SessionForm.jsx'
import { useState } from 'react'
import './session.css'


// eslint-disable-next-line react/prop-types
export default function Session({type}) {
	const [flowStage, setFlowStage] = useState(0)

	const shouldChangeBackground = () => {
		return flowStage === 0 && type !== 'login'
	}

	return (<div id='auth-container'>
		<div id='bg-container-1' className={'fullscreen' + (shouldChangeBackground() ? '' : ' transparent') }>
			<Background />
		</div>
		<div id='bg-container-2' className={'leftpanel' + (shouldChangeBackground() ? '' : ' visible') }>
			<RegistrationLeft />
		</div>
		<div id='bg-container-3' className={'rightpanel' + (shouldChangeBackground() ? '' : ' visible') }>
			<RegistrationRight />
		</div>
		<div id='whitebox-container'>
			<SessionForm type={type} flowStage={flowStage} setFlowStage={setFlowStage}/>
		</div>
	</div>
	)
}