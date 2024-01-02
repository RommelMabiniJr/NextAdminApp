import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { UserService } from "@/services/UserService";
import DocumentsTable from "../../components/documents-management.js/DocumentsTable";
import { DocumentService } from "@/services/DocumentService";

const DocumentsManagement = () => {
  const [users, setUsers] = useState([]);
  const toast = useRef(null);

  const showServerError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Server Error",
      detail: message,
      life: 3000,
    });
  };

  const fetchAllDocuments = async () => {
    const result = await DocumentService.getDocuments();

    if (result.status === 200) {
      // console.log(result.data);
      setUsers(result.data);
    } else if (result.status === 500) {
      showServerError(result.data);
    }
  };

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  return (
    <div className="card">
      <Toast ref={toast} />
      <DocumentsTable users={users} setUsers={setUsers} />
    </div>
  );
};

export default DocumentsManagement;
