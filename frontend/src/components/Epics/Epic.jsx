import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import EpicBody from './EpicBody'
import EpicHeader from './EpicHeader'
import { mockTasks } from '../../store/reducers/tasks.js'
import { selectTasksForEpic } from '../../store/selectors/tasks.js'
export default function Epic({epic}) {
	const tasks = useSelector(selectTasksForEpic(epic.id)) ?? []
	console.log(tasks)
	const [collapsed, setCollapsed] = useState(false)
	const dispatch = useDispatch()
	useEffect(() => {dispatch(mockTasks())}, [epic])

	return <>
		<EpicHeader epic={epic} collapsed={collapsed} setCollapsed={setCollapsed}/>
		<EpicBody collapsed={collapsed} tasks={tasks}/>
	</>
}