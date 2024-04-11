import { useRef } from 'react'

export default function useFocus() {
	const reference = useRef(null)
	const setFocus = () => {reference.current && reference.current.focus()}
	return [reference, setFocus]
}