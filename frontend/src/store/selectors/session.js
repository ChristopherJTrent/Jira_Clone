import { createSelector } from 'reselect'
import { usersSelector } from './user.js'


export const userIdSelector = ( state ) => state.session.currentUserId


export const currentUserSelector = createSelector(
	[usersSelector, userIdSelector],
	(users, userId) => users[userId]
)