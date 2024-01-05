import { DocumentService } from "@/services/DocumentService";
import { SettingService } from "@/services/SettingService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { ToggleButton } from "primereact/togglebutton";
import { use, useEffect, useRef, useState } from "react";

const AddAccountDialog = ({
  accountDialogVisible,
  setAccountDialogVisible,
  refetchAdminAccounts,
  toast,
}) => {
  const [accountStatus, setAccountStatus] = useState(true);
  const [adminUserDetails, setAdminUserDetails] = useState({});

  const userRoles = ["Admin", "Staff"];

  const handleAddAccount = async () => {
    // set status property of adminUserDetails
    adminUserDetails.status = accountStatus ? "active" : "inactive";
    const result = await SettingService.addAdminAccount(adminUserDetails);

    if (result.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Account Created",
        detail: "Account has been created successfully.",
        life: 3000,
      });

      setAccountDialogVisible(false);
      refetchAdminAccounts();
      setAdminUserDetails({});
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: result.data,
        life: 3000,
      });
    }
  };

  const footerContent = (
    <>
      <Button
        label="Create Account"
        icon="pi pi-check"
        className="p-button-success"
        onClick={() => {
          handleAddAccount();
        }}
      />
    </>
  );

  return (
    <Dialog
      header="Account Details"
      maximizable
      visible={accountDialogVisible}
      className="w-5 h-screen"
      onHide={() => setAccountDialogVisible(false)}
      footer={footerContent}
    >
      <div className="flex w-full relative flex flex-column">
        {/* <h5>Advanced</h5> */}
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="firstname2">Name</label>
            <InputText
              id="firstname2"
              type="text"
              value={adminUserDetails?.name}
              onChange={(e) =>
                setAdminUserDetails({
                  ...adminUserDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="lastname2">Username</label>
            <InputText
              id="lastname2"
              type="text"
              value={adminUserDetails?.username}
              onChange={(e) =>
                setAdminUserDetails({
                  ...adminUserDetails,
                  username: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12">
            <label htmlFor="address">Email</label>
            <InputText
              id="address"
              type="text"
              value={adminUserDetails?.email}
              onChange={(e) =>
                setAdminUserDetails({
                  ...adminUserDetails,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="state">Role</label>
            <Dropdown
              id="state"
              value={adminUserDetails?.role}
              valueTemplate={
                // Capitalize first letter
                adminUserDetails?.role && (
                  <div className="">
                    {adminUserDetails?.role.charAt(0).toUpperCase() +
                      adminUserDetails?.role.slice(1)}
                  </div>
                )
              }
              onChange={(e) => {
                setAdminUserDetails({
                  ...adminUserDetails,
                  role: e.value.toLowerCase(),
                });
              }}
              options={userRoles}
              placeholder="Select One"
            ></Dropdown>
          </div>
          <div className="field col-12 md:col-6">
            <div className="flex flex-column gap-2 w-full">
              <label htmlFor="zip">Account Status</label>
              <ToggleButton
                onLabel="Active"
                offLabel="Inactive"
                // onIcon="pi pi-check"
                // offIcon="pi pi-times"
                checked={accountStatus}
                onChange={(e) => setAccountStatus(e.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="field col-12">
            <label htmlFor="address">Password</label>
            <Password
              id="address"
              type="text"
              value={adminUserDetails?.password}
              onChange={(e) =>
                setAdminUserDetails({
                  ...adminUserDetails,
                  password: e.target.value,
                })
              }
              toggleMask
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddAccountDialog;
