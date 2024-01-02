import { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import DocumentDialog from "./DocumentDialog";

const DocumentsTable = ({ users, setUsers }) => {
  const actionMenu = useRef(null);
  const [selectedDocUrl, setSelectedDocUrl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [documentDialogVisible, setDocumentDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const actionMenuItems = [
    {
      label: "View",
      icon: "pi pi-fw pi-eye",
      command: () => {
        console.log("View");
      },
    },
    {
      label: "Verify User",
      icon: "pi pi-fw pi-check",
      command: () => {
        console.log("Verify User");
      },
    },
  ];

  const handleViewDocument = (rowData) => {
    setSelectedDocUrl(rowData.document_info.fileUrl);
    setSelectedDoc(rowData);
    setDocumentDialogVisible(true);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
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
  };

  const profileBodyTemplate = (rowData) => {
    return (
      <>
        <img
          src={
            process.env.NEXT_PUBLIC_ASSET_URL + rowData.user_info.profile_url
          }
          alt="profile"
          className="h-3rem w-3rem border-circle"
        />
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <div className="flex gap-3 align-items-center">
          <div>{profileBodyTemplate(rowData)}</div>
          <div>{rowData.user_info.full_name}</div>
        </div>
      </>
    );
  };

  const docTypeBodyTemplate = (rowData) => {
    return <div>{rowData.document_info.type.toUpperCase()}</div>;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <div className="w-full flex align-items-center justify-content-center">
          <span className="">
            <i
              className={classNames("text-xl pi", {
                "true-icon pi-check-circle text-green-400":
                  rowData.document_info.status === "verified",
                "false-icon pi-times-circle text-yellow-600":
                  rowData.document_info.status === "unverified",
              })}
            ></i>
          </span>
        </div>
      </>
    );
  };

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        {/* View icon button */}
        <Button
          type="button"
          icon="pi pi-search"
          rounded
          text
          onClick={() => handleViewDocument(rowData)}
        />
      </>
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  return (
    <>
      <DocumentDialog
        dialogVisible={documentDialogVisible}
        setDialogVisible={setDocumentDialogVisible}
        selectedDocUrl={selectedDocUrl}
        selectedDoc={selectedDoc}
        setUsers={setUsers}
      />
      <Menu model={actionMenuItems} popup ref={actionMenu} />
      <DataTable
        value={users}
        paginator
        rows={10}
        dataKey="user_id"
        filters={filters}
        // filterDisplay="row"
        loading={loading}
        removableSort
        globalFilterFields={[
          "user_info.first_name",
          "user_info.last_name",
          "user_info.city_municipality",
          "document_info.type",
          "user_info.city_municipality",
        ]}
        header={renderHeader()}
        emptyMessage="No user records found"
      >
        <Column
          field="user_info.full_name"
          header="Name"
          sortable
          body={nameBodyTemplate}
        />
        <Column
          field="user_info.city_municipality"
          header="City/Municipality"
          sortable
          body={(rowData) => <>{rowData.user_info.city_municipality}</>}
        />
        <Column
          field="document_info.type"
          header="Type"
          sortable
          body={docTypeBodyTemplate}
        />
        <Column
          field="document_info.status"
          header="Verified"
          sortable
          body={verifiedBodyTemplate}
        />
        <Column field="actions" header="Actions" body={actionsBodyTemplate} />
      </DataTable>
    </>
  );
};

export default DocumentsTable;
