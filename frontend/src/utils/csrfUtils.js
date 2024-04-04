/**
 * Restores the current session by requesting information from the server.
 */
export const restoreSession = async () => {
	const res = await fetch('/api/session')
	if (res.ok){
		const token = res.headers.get('X-Csrf-Token')
		sessionStorage.setItem('X-CSRF-Token', token)
	
		sessionStorage.setItem('currentUser', 
			JSON.stringify((await res.json()).user))
	}
}
/**
 * 
 * @param {RequestInfo | URL} url 
 * @param {RequestInit!} options
 */
export const csrfFetch = async (url, options) => {
	
	options.method ??= 'GET'
	options.headers ??= {}
	//Method being case-insensitive isn't universally accepted.
	options.method = options.method.toUpperCase()

	if (options.method!== 'GET') {
		options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')
		if (!(options.body instanceof FormData)) {
			options.headers['Content-Type'] = 'application/json'
		}
	}
	return await fetch(url, options)
}