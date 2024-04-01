import { createSelector } from 'reselect'

export const userIdSelector = createSelector(
	state => state.session,
	session => session.currentUserId
)
