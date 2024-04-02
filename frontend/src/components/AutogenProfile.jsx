import './AutogenProfile.css'

// eslint-disable-next-line react/prop-types
export default function AutogenProfile({name}) {
	// eslint-disable-next-line react/prop-types
	const initials = name.split(' ')
		.map((v) => v[0])
		.slice(0, 2)
		.join('')
	
	return <span className='autogen-profile'>
		{initials}
	</span>
}