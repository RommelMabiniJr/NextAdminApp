import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { UserService } from "@/services/UserService";
import { Avatar } from "primereact/avatar";
import UsersTable from "../../components/user-management/UsersTable";
import { Card } from "primereact/card";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const toast = useRef(null);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const showServerError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Server Error",
      detail: message,
      life: 3000,
    });
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const result = await UserService.getUsers();

      if (result.status === 200) {
        // console.log(result.data);
        setUsers(result.data);
      } else if (result.status === 500) {
        showServerError(result.data);
      }
    };

    fetchAllUsers();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const headerTemplate = () => {
    return (
      <div className="px-4 py-2">
        <h1 className="m-0 text-3xl">Accounts Management</h1>
      </div>
    );
  };

  return (
    <Card className="">
      <Toast ref={toast} />
      <UsersTable users={users} />
    </Card>
  );
};

export default UserManagement;
