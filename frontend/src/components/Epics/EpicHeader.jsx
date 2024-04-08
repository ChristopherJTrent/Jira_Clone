import { useState } from "react"

export default function EpicHeader({epic, collapsed, setCollapsed}) {


	return <>
	
		<button onClick={(e) => {
			e.preventDefault()
			setCollapsed(!collapsed)
		}}>{collapsed ? "﹀" : "〉"}</button>
		<button>
			{epic.title}
		</button>
	</>
}