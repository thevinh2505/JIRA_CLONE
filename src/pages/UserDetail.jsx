import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
	getUserAction,
	updateUserDetailAction,
} from "redux/actions/userAction";
import * as yup from "yup";
import { string } from "yup";

const schema = yup.object().shape({
	email: string("*Sai định dạng email")
		.required("*Vui lòng nhập email")
		.email("*Sai định dạng email"),
	phoneNumber: string("*Sai định dạng số điện thoại")
		.required("*Vui lòng nhập")
		.matches(/^[0-9]+$/g, "*Sai định dạng số điện thoại")
		.min(10, "*Sai định dạng số điện thoại")
		.max(11, "*Sai định dạng số điện thoại"),
	name: string("*Sai định dạng họ tên")
		.required("*Vui lòng nhập")
		.matches(
			/[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
			"*Sai định dạng họ tên"
		),
	passWord: string("*Sai định dạng mật khẩu")
		.required("*Vui lòng nhập mật khẩu")
		.min(6, "*Tối thiểu 6 kí tự")
		.max(16, "*Tối đa 16 kí tự"),
});
const { Item } = Form;
function UserDetail() {
    const history=useHistory()
	const match = useRouteMatch();
	const id = +match.params.id;
	console.log("id", id);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserAction(id));
	}, []);
	const formik = useFormik({
		initialValues: {
			id: id,
			name: "",
			passWord: "",
			email: "",
			phoneNumber: 0,
		},
		onSubmit: (e) => {
			console.log(e, "value");
			dispatch(updateUserDetailAction(e));
            history.goBack()
		},
		validationSchema: schema,
	});
	return (
		<div className="px-10 w-full mx-auto">
			<h3 className="text-text-color text-center text-3xl mt-4 mb-2 font-semibold">
				Edit user
			</h3>
			<Form
				onSubmitCapture={formik.handleSubmit}
				// onSubmit={formik.handleSubmit}
				className="text flex justify-center flex-wrap "
				layout="horizontal"
				size="default"
			>
				<div className="form-group flex items-center w-full ">
					<label className="w-1/6">User ID</label>
					<input
						name="id"
						className="w-1/3  my-3"
						disabled
						value={formik.values.id}
					/>
				</div>
				<div className="form-group flex items-center w-full ">
					<label className="w-1/6">Name</label>
					<input
						className="w-1/3 my-3"
						name="name"
						type="text"
						onChange={formik.handleChange}
					/>
				</div>
				{formik.touched.name && formik.errors.name && (
					<p className="text-red-600 italic mt-2">
						{formik.errors.name}
					</p>
				)}
				<div className="form-group flex items-center w-full ">
					<label className="w-1/6">Email</label>
					<input
						className="w-1/3  my-3"
						name="email"
						type="email"
						onChange={formik.handleChange}
					/>
				</div>
				{formik.touched.email && formik.errors.email && (
					<p className="text-red-600 italic mt-2">
						{formik.errors.email}
					</p>
				)}
				<div className="form-group flex items-center w-full ">
					<label className="w-1/6">Password</label>
					<input
						className="w-1/3  my-3"
						name="passWord"
						type="password"
						onChange={formik.handleChange}
					/>
				</div>
				{formik.touched.passWord && formik.errors.passWord && (
					<p className="text-red-600 italic mt-2">
						{formik.errors.passWord}
					</p>
				)}
				<div className="form-group flex items-center w-full ">
					<label className="w-1/6">Phone number</label>
					<input
						className="w-1/3  my-3"
						name="phoneNumber"
						type="text"
						onChange={formik.handleChange}
					/>
				</div>
				{formik.touched.phoneNumber && formik.errors.phoneNumber && (
					<p className="text-red-600 italic mt-2">
						{formik.errors.phoneNumber}
					</p>
				)}
				<div className="flex items-center w-full justify-start ml-24">
					<button type='submit' className="submit-btn mr-4">Update</button>
                    <button className="cancel-btn" onClick={()=>history.push('/usermanagement')}>Cancel</button>
				</div>
			</Form>
		</div>
	);
}

export default UserDetail;
