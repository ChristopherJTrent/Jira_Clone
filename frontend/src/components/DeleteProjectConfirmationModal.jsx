import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../store/reducers/projects.js'

export default function DeleteProjectConfirmationModal({enabled, setEnabled, post}) {
	
	console.log(post)

	const dispatch = useDispatch()
	const currentUserId = useSelector(state => state.session.currentUserId)

	const handleDelete = () => {
		if(! (currentUserId === post.ownerId)) {
			setEnabled(false)
			alert('You cannot delete another user\'s project')
		} else {
			dispatch(deleteProject(post.id))
			setEnabled(false)
		}
	}

	return <div className='modalContainer' hidden={!enabled}>
		<div className='modalBody'>
			<h1>Delete Project?</h1>
			<p>This project, along with its issues, components, attachments, and versions will be permanently deleted immediately.</p>
			<p className="red">Deleted projects CANNOT be restored.</p>
			<div id='bottomButtonContainer'>
				<button onClick={() => setEnabled(false)}>
					Cancel
				</button>
				<button className='dangerButton' onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	</div>
}