import { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SettingService } from "@/services/SettingService";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import AdminAccountsTable from "@/components/settings/AdminAccountsTable";
import BackupRestoreSection from "@/components/settings/BackupRestoreSection";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const KasambahayConfig = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [backupSettings, setBackupSettings] = useState({});
  const [backups, setBackups] = useState([]);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const fetchAdminAccounts = async () => {
    const response = await SettingService.getAdminAccounts();

    if (response.status == 200) {
      const data = response.data;
      setAdminUsers(data);
    }
  };

  const fetchBackupSettings = async () => {
    const response = await SettingService.getBackupSettings();

    if (response.status == 200) {
      const data = response.data;
      setBackupSettings(data);
    }
  };

  const fetchBackups = async () => {
    const response = await SettingService.getBackups();

    if (response.status == 200) {
      const data = response.data;
      setBackups(data);
    }
  };

  useEffect(() => {
    fetchAdminAccounts();
    fetchBackupSettings();
    fetchBackups();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-grid p-justify-center">
        <div className="p-col-12 p-lg-8">
          <Card className="p-5">
            <div className="mb-8">
              <div className="font-medium text-3xl text-900 mb-3">
                Admin Accounts
              </div>
              <div className="text-500 mb-5">
                Manage admin users and other system settings.
              </div>
              <div>
                <AdminAccountsTable
                  adminUsers={adminUsers}
                  fetchAdminAccounts={fetchAdminAccounts}
                />
              </div>
            </div>
            <div className="font-medium text-3xl text-900 mb-3">
              Backup and Restore
            </div>
            <div className="text-500 mb-5">Backup and restore your data.</div>
            <BackupRestoreSection
              backupSettings={backupSettings}
              backups={backups}
              refetchBackups={fetchBackups}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default KasambahayConfig;
