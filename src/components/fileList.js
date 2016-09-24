import React from 'react';

const FileList = ({ files }) => {

	if (files.length === 0) {
		return <div></div>;
	}

	return (
		<div className="tableDiv">
			<table className="table table-hover" style={{textAlign: "left"}}>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Size</th>
						<th>Path in DropBox</th>
					</tr>
				</thead>
				<tbody>
				{
					files.map((file, index) => {
						return (
							<tr key={file.id}>
								<th>{index + 1}</th>
								<td>{file.name}</td>
								<td>{file.size}</td>
								<td>{file.path_display}</td>
							</tr>
						);
					})
				}
				</tbody>
			</table>
		</div>
	);
};

export default FileList;
