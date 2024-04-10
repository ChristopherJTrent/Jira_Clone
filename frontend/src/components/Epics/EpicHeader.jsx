import Collapse from '../../assets/collapse-image.svg?react'
import { useState } from "react"
import './EpicHeader.css'


export default function EpicHeader({epic, collapsed, setCollapsed, tasks}) {


	return <div className='kanbanHeader'>
	
		<button onClick={(e) => {
			e.preventDefault()
			setCollapsed(!collapsed)
		}} className={'collapseButton' + (collapsed ? ' collapsed' : '')}>
			<Collapse />
		</button>
		<button className='titleButton'>
			{epic.title} 
			<span className='issueDisplay'>
				({`${tasks.length === 0 ? 
					'no' : 
					tasks.length} issue${tasks.length === 1 ? '' : 's'}`})
			</span>
			<span className='todoMarker'>TO DO</span>
		</button>
	</div>
}