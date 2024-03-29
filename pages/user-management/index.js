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
import UsersTable from "../../components/user-management/EmployerTable";
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
  const fetchAllUsers = async () => {
    const result = await UserService.getUsers();

    if (result.status === 200) {
      // Only store employers in state
      const workers = result.data.filter(
        (user) => user.user_info.user_type === "household employer"
      );

      setUsers(workers);
    } else if (result.status === 500) {
      showServerError(result.data);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Card className="">
      <Toast ref={toast} />
      <UsersTable users={users} refetchUsers={fetchAllUsers} />
    </Card>
  );
};

export default UserManagement;
