import { SettingService } from "@/services/SettingService";
import dayjs from "dayjs";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

const BackupRestoreSection = ({ backupSettings, backups, refetchBackups }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState("daily"); // "daily", "weekly", "monthly
  const [backupTime, setBackupTime] = useState(null);
  const [backupRetention, setBackupRetention] = useState("daily"); // "daily", "weekly", "monthly

  const [backupFile, setBackupFile] = useState(null);
  const [restoreFile, setRestoreFile] = useState(null);
  const toast = useRef(null);

  const FrequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const sampleData = [
    {
      name: "backup-2021-09-01-12-00-00",
      date: "2021-09-01 12:00:00",
      action: "Download",
    },
    {
      name: "backup-2021-09-01-12-00-00",
      date: "2021-09-01 12:00:00",
      action: "Download",
    },
    {
      name: "backup-2021-09-01-12-00-00",
      date: "2021-09-01 12:00:00",
      action: "Download",
    },
  ];

  const handleCancelEdit = () => {
    // reset backup settings
    setBackupFrequency(backupSettings.frequency);
    //   turn time into date object example: time : "22:30:55" -> time: new Date("22:30:55")
    const formattedTime = new Date(`2021-09-01 ${backupSettings.time}`);
    setBackupTime(formattedTime);
    setBackupRetention(backupSettings.retention);

    setIsEditMode(false);
  };

  const handleSaveBackupSettings = async () => {
    // save backup settings
    const result = await SettingService.saveBackupSettings({
      frequency: backupFrequency,
      time: backupTime,
      retention: backupRetention,
    });

    if (result.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Backup Settings Updated",
        detail: "Backup settings has been updated successfully.",
        life: 3000,
      });

      setIsEditMode(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: result.data,
        life: 3000,
      });
    }
  };

  const handleBackupNow = async () => {
    // Get logged in user admin id
    const adminId = 1; // TODO: replace with logged in user admin id

    const result = await SettingService.createBackupNow(adminId);

    if (result.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Backup Created",
        detail: "Backup has been created successfully.",
        life: 3000,
      });

      // refetch backups
      refetchBackups();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: result.data,
        life: 3000,
      });
    }
  };

  const handleDeleteBackup = async (filename) => {
    // delete backup
    const result = await SettingService.deleteBackup(filename);

    if (result.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Backup Deleted",
        detail: "Backup has been deleted successfully.",
        life: 3000,
      });

      // refetch backups
      refetchBackups();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: result.data,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    console.log(backups);

    if (backupSettings) {
      setBackupFrequency(backupSettings.frequency);
      //   turn time into date object example: time : "22:30:55" -> time: new Date("22:30:55")
      const formattedTime = new Date(`2021-09-01 ${backupSettings.time}`);
      setBackupTime(formattedTime);
      setBackupRetention(backupSettings.retention);
    }
  }, [backupSettings]);

  return (
    <div className="backup-restore-section mt-4">
      <Toast ref={toast} />
      <div className="backup-restore-section__backup mb-4">
        <div className="mb-5">
          <h3 className="text-xl mb-3">Schedule Backup</h3>
          <div className="flex align-items-end gap-3 mb-4">
            <div className="flex flex-1 gap-2">
              <div className="flex flex-1 flex-column gap-2">
                <label htmlFor="backup-frequency">Frequency</label>
                <Dropdown
                  value={backupFrequency}
                  options={FrequencyOptions}
                  onChange={(e) => setBackupFrequency(e.value)}
                  placeholder="Select One"
                  disabled={!isEditMode}
                />
              </div>
              <div className="flex flex-1 flex-column gap-2">
                <label htmlFor="backup-time">Time</label>
                <Calendar
                  value={backupTime}
                  onChange={(e) => setBackupTime(e.value)}
                  timeOnly
                  hourFormat="12"
                  disabled={!isEditMode}
                />
              </div>
              <div className="flex flex-1 flex-column gap-2">
                <label htmlFor="backup-retention">Retention</label>
                <Dropdown
                  value={backupRetention}
                  options={FrequencyOptions}
                  onChange={(e) => setBackupRetention(e.value)}
                  placeholder="Select One"
                  disabled={!isEditMode}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {isEditMode ? (
                <>
                  <Button
                    label="Save"
                    severity="success"
                    onClick={handleSaveBackupSettings}
                  />
                  <Button
                    label="Cancel"
                    severity="secondary"
                    onClick={() => handleCancelEdit()}
                  />
                </>
              ) : (
                <Button label="Edit" onClick={() => setIsEditMode(true)} />
              )}

              <Button
                icon="pi pi-download"
                iconPos="left"
                label="Backup Now"
                onClick={handleBackupNow}
              />
            </div>
          </div>
        </div>
        <DataTable value={backups} className="p-datatable-sm">
          <Column field="filename" header="File Name" />
          <Column
            field="created_at"
            header="Created At"
            body={(rowData) => (
              <>{dayjs(rowData.created_at).format("MMMM DD, YYYY hh:mm A")}</>
            )}
          />
          <Column
            field="type"
            header="Type"
            body={(rowData) => (
              <>
                {rowData.type == "manual" ? (
                  <span>Manual</span>
                ) : (
                  <span>Scheduled</span>
                )}
              </>
            )}
          />
          <Column
            field="admin_name"
            header="By"
            body={(rowData) => {
              if (rowData.type == "manual") {
                return <span>{rowData.admin_name}</span>;
              } else {
                return <span>N/A</span>;
              }
            }}
          />
          <Column
            field="action"
            header="Action"
            body={(rowData) => (
              <div className="flex gap-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/backupDownload/${rowData.filename}`}
                  download={rowData.filename}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button icon="pi pi-download" rounded outlined size="small" />
                </a>
                <Button
                  icon="pi pi-trash"
                  rounded
                  outlined
                  size="small"
                  severity="danger"
                  onClick={() => handleDeleteBackup(rowData.filename)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
      <div className="backup-restore-section__restore">
        <h3 className="text-xl mb-3">Restore </h3>
        <div className="backup-restore-section__restore__file">
          <FileUpload
            name="demo[]"
            url={"/api/upload"}
            // accept only dump sql files
            accept=".sql"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">
                Drag and drop the backup file here to upload.
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BackupRestoreSection;
