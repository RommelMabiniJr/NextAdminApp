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
import SidebarEmployer from "./SidebarEmployer";
import SidebarWorker from "./SidebarWorker";

const WorkerTable = ({ users, refetchUsers }) => {
  const [workerDetails, setWorkerDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
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

  const handleViewEmployer = (rowData) => {
    setWorkerDetails(rowData);
    setSidebarVisible(true);
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
        {/* <h3 className="text-3xl m-0 text-primary-700 font-bold">
          Household Employer Accounts
        </h3> */}

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

  const userTypeBodyTemplate = (rowData) => {
    return (
      <div>
        <Tag
          value={
            rowData.user_info.user_type == "household employer"
              ? "Employer"
              : "Kasambahay"
          }
          severity={
            rowData.user_info.user_type == "household employer" ? "primary" : ""
          }
          className={classNames({
            "bg-primary-500":
              rowData.user_info.user_type == "household employer",
            "bg-pink-500": rowData.user_info.user_type == "domestic worker",
          })}
        />
      </div>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <div className="w-full flex align-items-center justify-content-center">
          <span className="">
            <i
              className={classNames("text-xl pi", {
                "true-icon pi-check-circle text-green-400":
                  rowData.user_info.verified,
                "false-icon pi-times-circle text-yellow-600":
                  !rowData.user_info.verified,
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
        <Button
          type="button"
          icon="pi pi-search"
          text
          severity="secondary"
          onClick={() => handleViewEmployer(rowData)}
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
          "user_info.user_type",
          "user_info.city_municipality",
        ]}
        header={renderHeader()}
        emptyMessage="No user records found"
      >
        {/* <Column
          field="user_info.user_id"
          header="User ID"
          sortable
          body={(rowData) => <>{rowData.user_info.user_id}</>}
        /> */}
        <Column
          field="user_info.full_name"
          header="Name"
          sortable
          body={nameBodyTemplate}
        />
        <Column
          field="user_info.email"
          header="Email"
          sortable
          body={(rowData) => <>{rowData.user_info.email}</>}
        />
        <Column
          field="user_info.city_municipality"
          header="City/Municipality"
          sortable
          body={(rowData) => <>{rowData.user_info.city_municipality}</>}
        />
        {/* <Column
          field="user_info.user_type"
          header="Type"
          sortable
          body={userTypeBodyTemplate}
        /> */}
        <Column
          field="user_info.verified"
          header="Verified"
          sortable
          body={verifiedBodyTemplate}
        />
        <Column field="actions" header="Actions" body={actionsBodyTemplate} />
      </DataTable>
      <SidebarWorker
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        workerDetails={workerDetails}
        refetchUsers={refetchUsers}
      />
    </>
  );
};

export default WorkerTable;
