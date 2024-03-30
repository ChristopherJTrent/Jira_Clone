import Background from '../assets/login-background.svg?react'
import RegistrationLeft from '../assets/register-left.svg?react'
import RegistrationRight from '../assets/register-right.svg?react'
import SessionForm from '../components/SessionForm.jsx'
import { useState } from 'react'
import './session.css'

// eslint-disable-next-line react/prop-types
export default function Session({type}) {
	const [flowStage, setFlowStage] = useState(0)

	return (<div id='auth-container'>
		<div id='bg-container-1' className={'fullscreen' + (flowStage === 0 ? '' : ' transparent') }>
			<Background />
		</div>
		<div id='bg-container-2' className={'leftpanel' + (flowStage === 0 ? '' : ' visible') }>
			<RegistrationLeft />
		</div>
		<div id='bg-container-3' className={'rightpanel' + (flowStage === 0 ? '' : ' visible') }>
			<RegistrationRight />
		</div>
		<SessionForm type={type} flowStage={flowStage} setFlowStage={setFlowStage}/>
	</div>
	)
}