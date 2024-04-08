import { useState } from "react"

export default function EpicHeader({epic}) {

	const [collapsed, setCollapsed] = useState(false)

	return <>
	
		<button>{collapsed ? "﹀" : "〉"}</button>
		<button>
			{epic.title}
		</button>
	</>
}