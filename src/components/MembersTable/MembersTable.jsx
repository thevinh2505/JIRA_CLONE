import { Avatar, Button, Table } from "antd";
import React from "react";

function MembersTable(props) {
    console.log(props.data)
	const data = props.data;
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Avatar",
			key: "avatar",
			// render: (record) => {
			// 	<Avatar src={record.avatar} />;
			// },
		},
		{
			title: "Name:",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Action",
			key: "id",
			render: () => {
				<Button>X</Button>;
			},
		},
	];
	// return <Table dataSource={data} columns={columns} />;
    return <div>1</div>
}

export default MembersTable;
