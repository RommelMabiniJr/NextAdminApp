import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { UserService } from "@/services/UserService";
import { Card } from "primereact/card";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import WorkerTable from "@/components/user-management/WorkerTable";

const KasambahayAccountsPage = () => {
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
        (user) => user.user_info.user_type === "domestic worker"
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
      <WorkerTable users={users} refetchUsers={fetchAllUsers} />
    </Card>
  );
};

export default KasambahayAccountsPage;
