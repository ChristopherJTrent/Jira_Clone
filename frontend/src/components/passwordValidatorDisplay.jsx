import './passwordValidatorDisplay.css'
export default function PasswordValidatorDisplay({score}) {
	const getClassForScore = () => {
		if (score >= 6) return 'darkGreen'
		switch(score){
		case 5:
			return 'green'
		case 4:
			return 'yellow'
		case 3:
			return 'orange'
		case 2:
			return 'red'
		case 1:
		default:
			return 'gray'
		}
	}

	const getDisplayText = () => {
		if (score >= 6) return 'Very strong'
		switch(score) {
		case 5: 
			return 'Strong'
		case 4: 
			return 'Good'
		case 3:
			return 'Fair'
		case 2:
			return 'Weak'
		case 1:
			return 'Password must have at least 8 characters'
		default:
			return ''
		}

	}

	return (
		<>
			<div id='passwordValidationDisplayContainer'>
				<div className={getClassForScore()}>
					<span className="ticks"></span>
				</div>
			</div>
			<div role='status'>
				<p>
					{getDisplayText()}
				</p>
			</div>
		</>
	)
}