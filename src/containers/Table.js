import React from "react";
import { connect } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  setVisibilityFilter
} from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionTypes";
import { bindActionCreators } from "redux";

class Table extends React.Component{
	render(){
		return(
			<div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
				<nav className="marginTop">
					<ol className="breadcrumb">
						<li className={"breadcrumb-item "+(this.props.visibilityFilter===SHOW_ALL?'active':'')}
							onClick={()=>this.props.setVisibilityFilter(SHOW_ALL)} >
							All
						</li>
						<li className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_COMPLETED ? 'active' : '') } 
							onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)} >
							Completed
						</li>
						<li className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ACTIVE ? 'active' : '') } 
							onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)} >
							Active
						</li>
					</ol>
				</nav>
				{this.props.todos && this.props.todos.length > 0 ? (
					<table className="table table-hover marginTop">
						<thead>
							<tr>
								<th>Todos</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{this.props.todos.map(todo => (
								<tr key={todo.id}>
									<td className={todo.completed ? "strike-text" : ""}>
										<span>{todo.text} {todo.completed === true ? "(completed)" : ""}</span>
									</td>
									<td>
										<span className="glyphicon glyphicon-minus-sign glyphicon-size" 
										onClick={() => this.props.deleteTodo(todo.id)} />
										
										<span className="glyphicon glyphicon-ok-sign glyphicon-size"
										onClick={() => this.props.toggleTodo(todo.id)} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				): (
					<div style={{ marginTop: "50px" }} 
					className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1">
						<div className="alert alert-danger" role="alert">
							Todo List is empty or Filter results show no results
						</div>
					</div>
				)}{" "}
			</div>
		)
	}
}

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case SHOW_ALL:
			return todos;
		case SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
		default:
			throw new Error("Unknown filter: " + filter);
	}
};


//is responsible for getting the state from the Redux Store 
//and inject as Props to the React app
const mapStateToProps = state => {
	return { 
		todos: getVisibleTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter
	};
};

//is responsible to dispatch the actions creators
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{ deleteTodo, toggleTodo, setVisibilityFilter },
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);