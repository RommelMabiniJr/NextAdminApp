import { ConfigService } from "@/services/ConfigService";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Chips } from "primereact/chips";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const JobTitleConfig = ({
  jobPostingInfo,
  setJobPostingInfo,
  configExists,
  toast,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedJobTitle, setEditedJobTitle] = useState([]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedJobTitle(
      configExists(jobPostingInfo, "Job Title")
        ? jobPostingInfo.find((config) => config.config_name === "Job Title")
            .config_value
        : []
    );
  };

  const handleSaveClick = async () => {
    // update rates
    const response = await ConfigService.updateConfig(
      "Job Title",
      "job_posting",
      editedJobTitle
    );

    if (response.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Job Title updated",
        life: 3000,
      });

      // update kasambahayInfo
      const updatedJobPostingInfo = jobPostingInfo.map((config) => {
        if (config.config_name === "Job Title") {
          return {
            ...config,
            config_value: editedJobTitle,
          };
        } else {
          return config;
        }
      });

      setJobPostingInfo(updatedJobPostingInfo);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Rates not updated",
        life: 3000,
      });
    }

    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
      <div className="text-500 w-6 md:w-2 font-medium">
        Job Title <small className="block">(Character Limit)</small>
      </div>
      {editMode ? (
        <>
          <div className="text-900 flex align-items-center flex-wrap gap-2 w-full md:w-8 md:flex-order-0 flex-order-1">
            <InputNumber
              value={editedJobTitle}
              onValueChange={(e) => setEditedJobTitle(e.value)}
              maxFractionDigits={0}
            />
            {" Characters"}
          </div>
          <div className="w-6 md:w-2 flex justify-content-end gap-2">
            <Button icon="pi pi-check" onClick={handleSaveClick} />
            <Button
              icon="pi pi-times"
              severity="secondary"
              onClick={handleCancelClick}
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-900 flex flex-wrap gap-2 w-full md:w-8 md:flex-order-0 flex-order-1">
            {configExists(jobPostingInfo, "Job Title") &&
              jobPostingInfo.find(
                (config) => config.config_name === "Job Title"
              ).config_value}{" "}
            characters
          </div>
          <div className="w-6 md:w-2 flex justify-content-end">
            <Button
              label="Edit"
              icon="pi pi-pencil"
              className="p-button-text"
              onClick={handleEditClick}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default JobTitleConfig;
