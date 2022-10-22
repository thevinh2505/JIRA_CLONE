import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Popconfirm, Table } from "antd";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserAction, getUserAction } from "redux/actions/userAction";
import Search from "antd/lib/transfer/search";
import { useRef } from "react";

function UserManagement() {
	const dispatch = useDispatch();
	const searchRef = useRef(null);
	useEffect(() => {
		dispatch(getUserAction());
	}, []);
	const { userList } = useSelector((state) => state.user);
	const data = userList;
	const columns = [
		{
			title: "User ID",
			dataIndex: "userId",
			value: (text, object) => {
				return <span>{text}</span>;
			},
			sorter: (a, b) => a.userId - b.userId,
		},

		{
			title: "Avatar",
			dataIndex: "avatar",
			defaultSortOrder: "descend",
			render: (text, object) => {
				return (
					<img
						className="w-8 h-8  rounded-full"
						src={object.avatar}
						alt="avatar user"
						onError={(e) => {
							e.target.onError = null;
							e.target.src =
								"https://lh3.googleusercontent.com/fTUn7tJC6yNwO2CzZ-rjFqc-HuFfktNHNNnRH7JlrTuekvYrZeh9BK_0J-OW_SawvRzmTvyLh_QA1eZVYJZESJe-msFqDsjV-UwblUXYcs2wTVVbzAKC7TYdEYLgu4GY64H-Z7ziJIBNjDnYNFACg1PZtHGOXW9J-X4fZhkrEXYn1LCoOSFsjiPZZ7eebnwN-NCt6eBtJO5QIGbNhQreNiHjEyf0sY4MV1VN-8AwlgRNuGcL-GouA4AoP4Bv0cPn3bSKbQFzAJrryeW6XMi7eiDlHe6xhrvHOYcYfvc0RMh4CBmlH2Atu8Hw-1O5ok1LSKcSbLt7SnuJMI64Jd5y8_DSfNyd1bXrSAIfCHqKCf0pItkngwChFgoZT58nGXlKJp2HNcM5ToBDbqMivtJDZOWNwVtScs1bEINAKv7tTLLw9e043J1t5YDPs3hQVmNFkcG-JiX_PvXpqfC9KafI34RjpRvI1oqF23daC71qA_96m2y8jAq0sBC-6vklck06K5v3WSH-tqSaKRDYVe-aFiJrnVPJiV9ebGzwfVfoSWZ8AECjTXeL5IVKu3UYfHaXuNtMlS92NZRaoMjB_6kZm8_QKBwNcyaga30mScheYUiC6r5poaFBRo66kyZniqcvSsVXB4eaMZa4O-Dt6M5nCxmV4wybBn_umZlvA7Qn2NPgCY-yILsmrGgbMjhAvLEkw1dgT2oZ9I6aX2nCm-R13Pnfa0ZewcBM_8Fp2LeX6m9s5VJmFvJMxeRRJ4F6p38Al_dMd4jbo6uXaOejQ2q277ikUWRhg606zshlztTHSEEl4YkC0rgEKTjZfDvDDJ3V3h7AfnFB0M9QH0AnX3yxGZOnKV74adB1HA3E_BvejbdbQw-R5bQUfMHpqJqQ50V_PCFOViWM5vEcx7gMc0LZ98iUCueDGf2MxXUqqqrdbhmyB3D6PqQZnUgsEq7QoLCiqrki0RmQ_D4=w700-h933-no?authuser=1";
						}}
					/>
				);
			},
		},
		{
			title: "Name",
			dataIndex: "name",
			// onFilter: (value, record) => record.address.indexOf(value) === 0,
			// sort từ A-Z
			sorter: (a, b) => {
				let nameA = a.name.toLowerCase().trim();
				let nameB = b.name.toLowerCase().trim();
				if (nameA > nameB) {
					return 1;
				} else {
					return -1;
				}
			},
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Email",
			dataIndex: "email",
			// onFilter: (value, record) => record.address.indexOf(value) === 0,
			// sort từ A-Z
			sorter: (a, b) => {
				let emailA = a.name.toLowerCase().trim();
				let emailB = b.name.toLowerCase().trim();
				if (emailA > emailB) {
					return 1;
				} else {
					return -1;
				}
			},
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			value: (text, object) => {
				return <span>{text}</span>;
			},
			sorter: (a, b) => a.phoneNumber - b.phoneNumber,
		},
		{
			title: "Action",
			dataIndex: "hanhDong",
			render: (text, film) => {
				return (
					<div className="flex justify-around items-center">
						<NavLink
							to={`/userDetail/${film.userId}`}
							key={1}
							className="inline-block text-emerald-500  hover:text-cyan-500 duration-500 text-lg "
						>
							{" "}
							<AiOutlineEdit />{" "}
						</NavLink>
						<Popconfirm
							title="Are you sure to delete this user?"
							onConfirm={() => {
								confirm(film.userId);
							}}
							okText="Yes"
							cancelText="No"
						>
							<span
								key={2}
								className="inline-block cursor-pointer text-red-600 hover:text-yellow-500 duration-500  text-lg "
							>
								{" "}
								<AiOutlineDelete />{" "}
							</span>
						</Popconfirm>
					</div>
				);
			},
		},
	];
	const onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};
	const onSearch = (e) => {
		console.log(e.target.value, "hello");
		if (searchRef !== null) {
			clearTimeout(searchRef.current);
		}
		searchRef.current = setTimeout(() => {
			dispatch(getUserAction(e.target.value));
		}, 400);
	};
	const confirm = (e) => {
		console.log(e, "e");
		dispatch(deleteUserAction(e, dispatch));
	};
	return (
		<div className="px-10 w-full user-management">
			<h3 className="text-text-color text-center text-3xl mt-4 mb-2 font-semibold">
				User Dashboard
			</h3>
			<Search
				className="my-4 text-text-color search-button"
				placeholder="Search user"
				allowClear
				onChange={onSearch}
				onSearch={(e) => {
					console.log(e);
				}}
				size="medium"
			/>
			<Table
				className="text-text-color mt-4"
				columns={columns}
				dataSource={data}
				onChange={onChange}
				pagination={{ pageSize: 7 }}
				rowKey={"maPhim"}
			/>
		</div>
	);
}

export default UserManagement;
