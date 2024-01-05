import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useRef, useState } from "react";
import EditAccountDialog from "./EditAccountDialog";
import AddAccountDialog from "./AddAccountDialog";
import { Toast } from "primereact/toast";

const AdminAccountsTable = ({ adminUsers, fetchAdminAccounts }) => {
  const adminUsersDataColumns = [
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "role", header: "Role" },
    { field: "status", header: "Status" },
    { field: "action", header: "Action" },
  ];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    role: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedAdminUser, setSelectedAdminUser] = useState(null);
  const [editAccountDialogVisible, setEditAccountDialogVisible] =
    useState(false);
  const [addAccountDialogVisible, setAddAccountDialogVisible] = useState(false);
  const toast = useRef(null);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const handleViewAccount = (rowData) => {
    setSelectedAdminUser(rowData);
    setEditAccountDialogVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      {/* <span className="text-xl text-900 font-bold">Admin Accounts</span> */}
      <Button
        icon="pi pi-plus"
        rounded
        raised
        onClick={() => setAddAccountDialogVisible(true)}
      />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <EditAccountDialog
        accountDialogVisible={editAccountDialogVisible}
        setAccountDialogVisible={setEditAccountDialogVisible}
        selectedAdminUser={selectedAdminUser}
        refetchAdminAccounts={fetchAdminAccounts}
        toast={toast}
      />
      <AddAccountDialog
        accountDialogVisible={addAccountDialogVisible}
        setAccountDialogVisible={setAddAccountDialogVisible}
        refetchAdminAccounts={fetchAdminAccounts}
        toast={toast}
      />
      <DataTable
        value={adminUsers}
        className="p-datatable-striped"
        header={header}
        dataKey="id"
        filters={filters}
        globalFilterFields={["name", "email", "role", "status"]}
      >
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column
          field="role"
          header="Role"
          body={(rowData) => (
            <>
              {rowData.role == "admin" ? (
                <Tag value="Admin" />
              ) : (
                <Tag severity="info" value="Staff" />
              )}
            </>
          )}
        />
        <Column
          field="status"
          header="Status"
          body={(rowData) => (
            <>
              {rowData.status == "active" ? (
                <Tag severity="success" value="Active" />
              ) : (
                <Tag className="bg-gray-600" value="Inactive" />
              )}
            </>
          )}
        />
        <Column
          field="action"
          header="Action"
          body={(rowData) => (
            <>
              {/* View */}
              <Button
                type="button"
                //glass ico
                icon="pi pi-search"
                text
                rounded
                onClick={() => handleViewAccount(rowData)}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};

export default AdminAccountsTable;
