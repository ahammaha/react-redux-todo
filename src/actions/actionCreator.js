import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './actionTypes'

let todoId=1;

export const addTodo = text => ({
	type: ADD_TODO,
	id:todoId++,
	text
})

export const deleteTodo = id => ({
	type: REMOVE_TODO,
	id:id
})

export const setVisibilityFilter = filter => ({
	type: SET_VISIBILITY_FILTER,
	filter
})

export const toggleTodo = id => ({
	type: TOGGLE_TODO,
	id
})