
export default function DeleteProjectConfirmationModal({enabled, setEnabled, post}) {

	return <>
		<h1>Delete Project?</h1>
		<p>This project, along with its issues, components, attachments, and versions will be permanently deleted immediately.</p>
		<p className="red">Deleted projects CANNOT be restored.</p>
		<div id='bottomButtonContainer'>
			<button>
				Cancel
			</button>
			<button>
				Delete
			</button>
		</div>
	</>
}