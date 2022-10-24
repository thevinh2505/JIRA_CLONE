import { instance } from "api/instance";
import { notifyFunction } from "utils/Notification/Notification";
import { CLOSE_DRAWER } from "./drawerModalActions";
import { HIDE_LOADING, SHOW_LOADING } from "./LoadingAction";

export const SET_PROJECT_LIST = "project/SET_PROJECT_LIST";
export const GET_PROJECT_DETAIL = "project/GET_PROJECT_DETAIL";
// get all project
export const setProjectListAction = async (next) => {
	try {
		const res = await instance.get("/api/Project/getAllProject");
		next({
			type: SET_PROJECT_LIST,
			payload: res.data.content,
		});
		
	} catch (err) {
		console.log(err);
	}
};

// update PROJECT
export const updateProjectAction = (value, dispatch) => {
	console.log(value.id, "projectId");
	console.log("giá trị value form call API PUT", value);
	return async (next) => {
		try {
			const res = await instance.put(
				`/api/Project/updateProject?projectId=${value.id}`,
				value
			);
			notifyFunction("success", "Update project successfully!");
			dispatch(setProjectListAction);
			next({
				type: CLOSE_DRAWER,
			});
			
		} catch (err) {
			console.log(err);
			notifyFunction("error", "Update project failed!");
		}
	};
};

// delete PROJECT
export const deleteProjectAction = (id, dispatch) => {
	return async (next) => {
		try {
			next({
				type:SHOW_LOADING
			})
			const res = await instance.request({
				url: "/api/Project/deleteProject",
				method: "DELETE",
				params: {
					projectId: id,
				},
			});
			await dispatch(setProjectListAction);
			next({
				type:HIDE_LOADING
			})
			console.log(res);
			notifyFunction("success", "Delete project successfully", "");
		} catch (err) {
			console.log(err);
			notifyFunction("error", "Delete project failed", "");
			next({
				type:HIDE_LOADING
			})
		}
	};
};

// assign user project - thêm member vào project
export const assignUserProjectAction = (value, dispatch) => {
	return async (next) => {
		try {
			next({
				type:SHOW_LOADING
			})
			const res = await instance.post(
				"/api/Project/assignUserProject",
				value
			);
			await dispatch(setProjectListAction);
			next({
				type:HIDE_LOADING
			})
			notifyFunction("success", "Add user to project successfully!");
			console.log(res.data.content);
		} catch (err) {
			notifyFunction(
				"error",
				"You don't have permission to add this user to the project!"
			);
			console.log(err);
			next({
				type:HIDE_LOADING
			})
		}
	};
};

// remove user from project
export const removeUserFromProjectAction = (value, dispatch) => {
	return async (next) => {
		try {
			const res = await instance.post(
				"/api/Project/removeUserFromProject",
				value
			);
			dispatch(setProjectListAction);
			notifyFunction("success", "Remove user from project successfully!");
			console.log(res.data.content);
		} catch (err) {
			notifyFunction(
				"error",
				"You don't have permission to remove this user from the project!"
			);
			console.log(err);
		}
	};
};

// GET PROJECT DETAIL
export const getProjectDetailAction = (id) => {
	return async (next) => {
		try {
			const res = await instance.get(
				`/api/Project/getProjectDetail?id=${id}`
			);
			next({
				type: GET_PROJECT_DETAIL,
				payload: res.data.content,
			});
			console.log('project detail',res.data.content)
		} catch (err) {
			// notifyFunction("error", `${err.response.data?.message}`);
			 notifyFunction("error", 'This project is not existed');

		}
	};
};

// ADD TASK
export const createTaskAction = (value, dispatch) => {
	return async (next) => {
		try {
			next({
				type:SHOW_LOADING
			})
			const res = await instance.post("/api/Project/createTask", value);
			console.log("create", res.data.content);
			
			 dispatch(getProjectDetailAction(value.projectId));
			// next({
			// 	type: CLOSE_DRAWER,
			// });
			// next({
			// 	type:HIDE_LOADING
			// })
			notifyFunction("success", "Create task successfully!");
		} catch (err) {
			if (err.response.status === 403) {
				notifyFunction("error", "Please select project!");
			}
			if(err.response?.data?.content==='task already exists!'){
				notifyFunction("error", "Task name already exist!");
			}
			if (err.response.status === 500) {
				console.log(err);
				// notifyFunction("error", `${err.response.data?.message}`);
			}
			// next({
			// 	type:HIDE_LOADING
			// })
		}
	};
};
