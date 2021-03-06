import React, { useState, useEffect } from "react";

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
	const [userInput, setUserInput] = useState([""]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/camillavv")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				//Read the response as json.
				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(function(responseAsJson) {
				setList(responseAsJson);
				//
			})
			.catch(function(error) {
				//error handling
				console.log("Looks like there was a problem: \n", error); //this will print on the console the exact object received from the server
			});
	}, []);

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			setList(
				theList.concat({
					label: userInput,
					done: false
				})
			);
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/camillavv",
				{
					method: "PUT", // or 'Post'
					body: JSON.stringify(
						theList.concat({
							label: userInput,
							done: false
						})
					),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json(); //Read the response as json
				})
				.then(response => {
					console.log("Success:", response);
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/camillavv"
					)
						.then(function(response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							//Read the response as json.
							return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
						})
						.then(function(responseAsJson) {
							setList(responseAsJson);
							setUserInput("");
						})
						.catch(function(error) {
							//error handling
							console.log(
								"Looks like there was a problem: \n",
								error
							); //this will print on the console the exact object received from the server
						});
				})
				.catch(error => console.error("Error:", error));
		}
	};
	const itemDelete = index => {
		var updatedList = theList.filter(
			(task, taskIndex) => index != taskIndex
		);
		setList(updatedList);
		//this is the delete method
		fetch("https://assets.breatheco.de/apis/fake/todos/user/camillavv", {
			method: "PUT", // or 'Post'
			body: JSON.stringify(updatedList), //added updated list to JSON
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); //Read the response as json
			})
			.then(response => {
				console.log("Success:", response);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/camillavv"
				)
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						//Read the response as json.
						return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(function(responseAsJson) {
						setList(responseAsJson);
						// setUserInput(""); this is removed because we don't need it anymore
					})
					.catch(function(error) {
						//error handling
						console.log(
							"Looks like there was a problem: \n",
							error
						); //this will print on the console the exact object received from the server
					});
			})
			.catch(error => console.error("Error:", error));
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
									{value.label}
									{/* value is an object and you can only put text here */}
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
