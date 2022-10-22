import Menu from "components/Menu/Menu";
import Modal from "components/Modal/Modal";
import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function HomeTemplate(props) {
	let { Component, ...restRoute } = props;
	if (!localStorage.getItem("user")) {
		return <Redirect to="/signin" />;
	}
	return (
		<Route
			{...restRoute}
			render={(propsRoute) => {
				return (
					<div className="jira">
						{/* Sider Bar  */}
						<Sidebar />
						{/* Menu */}
						<Menu />
						<Component {...propsRoute} />
						<Modal />
					</div>
				);
			}}
		/>
	);
}

export default HomeTemplate;
