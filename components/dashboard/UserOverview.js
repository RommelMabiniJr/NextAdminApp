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

const UserOverview = () => {
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
      // shorten to 10 most recent users
      const recentUsers = result.data.slice(0, 10);

      setUsers(recentUsers);
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

  const headerTemplate = () => {
    return (
      <div className="px-4 py-2">
        <h1 className="m-0 text-3xl">Recent Accounts Registered</h1>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <h5>Recent Accounts Registered</h5>
        <UsersTable users={users} refetchUsers={fetchAllUsers} />
      </div>
    </>
  );
};

export default UserOverview;
