import { Col, Row } from "antd";
import React from "react";
import { useState } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// const array = [
// 	{ id: 1, taskName: "hello1" },
// 	{ id: 2, taskName: "hello2" },
// 	{ id: 3, taskName: "hello3" },
// 	{ id: 4, taskName: "hello4" },
// 	{ id: 5, taskName: "hello5" },
// 	{ id: 6, taskName: "hello6" },
// 	{ id: 7, taskName: "hello7" },
// ];
function DragDrop() {
	// const [taskList, SetTaskList] = useState(array);
	// const handleDragStart=(e,item,index)=>{
	//     console.log(e,item,index)
	// }
	// const handleDragOver=(e)=>{
	//     console.log(e.target);
	// }
	// const handleDragEnd=(e)=>{
	//     console.log(e.target,'drag end');
	// }
	const [state, setState] = useState({
		toDo: {
			id: "toDo",
			items: [
				{ id: "1", taskName: "task 1" },
				{ id: "2", taskName: "task 2" },
				{ id: "3", taskName: "task 3" },
				{ id: "4", taskName: "task 4" },
				{ id: "5", taskName: "task 5" },
			],
		},
		inProgress: {
			id: "inProgress",
			items: [
				{ id: "6", taskName: "task 6" },
				{ id: "7", taskName: "task 7" },
				{ id: "8", taskName: "task 8" },
				{ id: "9", taskName: "task 9" },
				{ id: "10", taskName: "task 10" },
			],
		},
		done: {
			id: "done",
			items: [
				{ id: "11", taskName: "task 11" },
				{ id: "12", taskName: "task 12" },
				{ id: "13", taskName: "task 13" },
				{ id: "14", taskName: "task 14" },
				{ id: "15", taskName: "task 15" },
			],
		},
	});
	const handleDragEnd = (e) => {
		const { destination, source } = e;
		console.log("destination", destination);
		console.log("source", source);
		if (!destination) {
			return;
		}
		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			return;
		}
        // item copy
		let itemCopy = { ...state[source.droppableId].items[source.index] };
		console.log(itemCopy, "item");

        // xoa phan tu dang drag
		let index = state[source.droppableId].items.findIndex(
			(item) => item.id === itemCopy.id
		);
		state[source.droppableId].items.splice(index, 1);

        // gia tri mang o noi tha ra
		let dropDestination = state[destination.droppableId].items;
		console.log("mảng giá trị ở vị trí kéo đến", dropDestination);
		dropDestination.splice(destination.index, 0, itemCopy);
		setState(state);
	};
	return (
		<div className="container mx-auto">
			<h3>BAI TAP DRAG DROP</h3>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="flex">
					{_.map(state, (statusTask, index) => {
						return (
							<Droppable
								droppableId={statusTask.id}
								key={statusTask.id}
							>
								{(provided) => {
									return (
										<div
											className="bg-black p-5 text-white w-1/3"
											key={index}
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{statusTask.items.map(
												(item, index) => {
													return (
														<Draggable
															key={item.id}
															index={index}
															draggableId={
																item.id
															}
														>
															{(provided) => {
																return (
																	<div
																		ref={
																			provided.innerRef
																		}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		className="mt-2 p-3 bg-white text-black text-center"
																	>
																		{
																			item.taskName
																		}
																	</div>
																);
													}}
																</Draggable>
													);
												}
											)}
											{provided.placeholder}
										</div>
									);
								}}
							</Droppable>
						);
					})}
				</div>
			</DragDropContext>
		</div>
	);
}

export default DragDrop;
