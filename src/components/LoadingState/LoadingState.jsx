import React from "react";
import styleLoading from "components/Loading/Loading.module.css";
import { useSelector } from "react-redux";

export default function LoadingState(props) {
	const isLoading = useSelector((state) => state.loading.isLoading);

	if (isLoading) {
		return (
			<div className={styleLoading.bgLoading}>
				<img
					src="https://res.cloudinary.com/fpt-food/image/upload/v1639790730/ReactJS_Jira_Bugs_Clone/Curve-Loading_xkidcm.gif"
					alt="curve-loading.gif"
				/>
			</div>
		);
	} else {
		return "";
	}
}
