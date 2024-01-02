import { ConfigService } from "@/services/ConfigService";
import { arrayToString } from "@/utils/dataConversionUtils";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Chips } from "primereact/chips";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const LivingArrangementConfig = ({
  jobPostingInfo,
  setJobPostingInfo,
  configExists,
  toast,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedLivingArrangement, setEditedLivingArrangement] = useState([]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedLivingArrangement(
      configExists(jobPostingInfo, "Living Arrangement")
        ? jobPostingInfo.find(
            (config) => config.config_name === "Living Arrangement"
          ).config_value
        : []
    );
  };

  const handleSaveClick = async () => {
    // turn editedLivingArrangement into an array of strings and convert to comma-separated string
    const editedLivingArrangementString = arrayToString(
      editedLivingArrangement
    );

    // update rates
    const response = await ConfigService.updateConfig(
      "Living Arrangement",
      "job_posting",
      editedLivingArrangementString
    );

    if (response.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Living Arrangement updated",
        life: 3000,
      });

      // update kasambahayInfo
      const updatedJobPostingInfo = jobPostingInfo.map((config) => {
        if (config.config_name === "Living Arrangement") {
          return {
            ...config,
            config_value: editedLivingArrangement,
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
      <div className="text-500 w-6 md:w-2 font-medium">Living Arrangement</div>
      {editMode ? (
        <>
          <div className="text-900 flex flex-wrap gap-2 w-full md:w-8 md:flex-order-0 flex-order-1">
            <Chips
              value={editedLivingArrangement}
              onChange={(e) => setEditedLivingArrangement(e.value)}
            />
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
            {configExists(jobPostingInfo, "Living Arrangement") &&
              jobPostingInfo
                .find((config) => config.config_name === "Living Arrangement")
                .config_value.map((option) => (
                  <Chip label={option} className="mr-2" key={option} />
                ))}
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

export default LivingArrangementConfig;
