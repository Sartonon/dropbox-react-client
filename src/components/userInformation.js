import React from 'react';

const UserInformation = ({ userInfo }) => {
	if (!userInfo) {
		return <div></div>;
	}

	return (
		<div className="tableDiv">
			<table className="table table-hover" style={{textAlign: "left"}}>
				<thead>
					<tr>
						<th>Key</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Account ID</td>
						<td>{userInfo.account_id}</td>
					</tr>
					<tr>
						<td>Disabled</td>
						<td>{userInfo.disabled.toString()}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{userInfo.email}</td>
					</tr>
					<tr>
						<td>Display name</td>
						<td>{userInfo.name.display_name}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default UserInformation