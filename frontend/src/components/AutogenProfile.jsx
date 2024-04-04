import './AutogenProfile.css'

export default function AutogenProfile({name, onClick}) {
	const initials = name.split(' ')
		.map((v) => v[0])
		.slice(0, 2)
		.join('')
	
	return <span className='autogen-profile'
		onClick={onClick}>
		<p>
			{initials}
		</p>
	</span>
}