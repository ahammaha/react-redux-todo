import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from '../actions/actionTypes';

const INITIAL_DATA=[];

const todoReducer = (state=INITIAL_DATA, action) => {
	switch(action.type){
		case ADD_TODO:
			return [
				...state,
				{
					id:action.id,
					text:action.text,
					completed:false
				}
			]
		case REMOVE_TODO:
			return state.filter(
				todo => (todo.id!==parseInt(action.id))
			)
		case TOGGLE_TODO:
			return state.map(
				todo => 
					(todo.id===parseInt(action.id))? {...todo, completed:!todo.completed} : todo
			)
		default:
			return state;
	}
}

export default todoReducer;