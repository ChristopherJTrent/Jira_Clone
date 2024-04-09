import EpicBody from './EpicBody'
import EpicHeader from './EpicHeader'
import { useState } from 'react'

export default function Epic({epic}) {

	const [collapsed, setCollapsed] = useState(false)


	return <>
		<EpicHeader epic={epic} collapsed={collapsed} setCollapsed={setCollapsed}/>
		<EpicBody epic={epic} collapsed={collapsed} />
	</>
}