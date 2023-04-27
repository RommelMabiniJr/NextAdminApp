import React from 'react';
import Link from 'next/link';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const UserManagement = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'worker', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'employer', status: 'inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', role: 'worker', status: 'active' },
        { id: 4, name: 'Alice Lee', email: 'alicelee@example.com', role: 'employer', status: 'pending' },
        { id: 5, name: 'Sam Williams', email: 'samwilliams@example.com', role: 'worker', status: 'inactive' },
      ];
      
    const userColumns = [
        { field: 'id', header: 'User ID' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'status', header: 'Status' },
        {
            field: 'actions', header: 'Actions', body: (rowData) => (
                <>
                    {/* add a button to display user information */}
                    <Button label="View" className="p-button-info p-button-sm mr-2" />
                    <Button label="Validate" className="p-button-success p-button-sm mr-2" />
                    <Button label="Reject" className="p-button-danger p-button-sm" />
                </>
            )
        },
    ];

    return (
        <div className="p-d-flex p-jc-center p-ai-center">
            <DataTable paginator rows={10} value={users}>
                {userColumns.map((column) => (
                    <Column key={column.field} field={column.field} header={column.header} body={column.body} />
                ))}
            </DataTable>
        </div>
    );
};

export default UserManagement;
