import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import EmployerDetails from "./EmployerDetails";
import WorkerDetails from "./WorkerDetails";

const SidebarWorker = ({
  sidebarVisible,
  setSidebarVisible,
  workerDetails,
  refetchUsers,
}) => {
  dayjs.extend(relativeTime);

  return (
    <Sidebar
      position="right"
      className={`w-full md:w-8 lg:w-6`}
      visible={sidebarVisible}
      onHide={() => setSidebarVisible(false)}
    >
      <div className="flex align-items-center justify-content-between mb-5 mt-4">
        <h2 className="text-xl font-bold ml-4 mb-0 mt-0">Kasambahay Details</h2>
        <button
          className="p-sidebar-icon p-link mr-2 mt-1 p-2 rounded-full"
          onClick={() => setSidebarVisible(false)}
          autoFocus
        >
          <span className="pi pi-times" />
        </button>
      </div>
      <WorkerDetails
        workerDetails={workerDetails}
        refetchUsers={refetchUsers}
      />
    </Sidebar>
  );
};

export default SidebarWorker;
