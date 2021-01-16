import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
//todo list fetch add
//create your first component
export const Home = () => {
	const [theList, setList] = useState([
		"do homework",
		"take out garbage",
		"go to the mall"
	]);
	const [userInput, setUserInput] = useState("");

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			setList(theList.concat(userInput));
			setUserInput("");
		}
	};
	const itemDelete = index => {
		var updatedList = theList.filter(
			(task, taskIndex) => index != taskIndex
		);
		setList(updatedList);
	};

	return (
		<div className="container">
			<div className="text-center">
				<h1>To Do List</h1>
				<div className="todoList">
					<input
						className="todoInput"
						onChange={event => setUserInput(event.target.value)}
						value={userInput}
						onKeyUp={handleKeyUp}
					/>
					<ul className="list-group list-group-flush">
						{theList.map((value, index) => {
							return (
								<li className="list-group-item" key={index}>
									{value}
									<button
										type="button"
										onClick={() => itemDelete(index)}
										className="btn btn-primary">
										X
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};
