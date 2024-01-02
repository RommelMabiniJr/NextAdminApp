import { ConfigService } from "@/services/ConfigService";
import { arrayToString } from "@/utils/dataConversionUtils";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Chips } from "primereact/chips";
import { useState } from "react";

const CertificationsConfig = ({
  kasambahayInfo,
  setKasambahayInfo,
  configExists,
  toast,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedCertifications, setEditedCertifications] = useState([]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedCertifications(
      configExists(kasambahayInfo, "Certifications")
        ? kasambahayInfo.find(
            (config) => config.config_name === "Certifications"
          ).config_value
        : []
    );
  };

  const handleSaveClick = async () => {
    // turn editedRates into an array of strings and convert to comma-separated string
    const editedCertificationsString = arrayToString(editedCertifications);

    // update rates
    const response = await ConfigService.updateConfig(
      "Certifications",
      "kasambahay_info",
      editedCertificationsString
    );

    if (response.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Certifications updated",
        life: 3000,
      });

      // update kasambahayInfo
      const updatedKasambahayInfo = kasambahayInfo.map((config) => {
        if (config.config_name === "Certifications") {
          return {
            ...config,
            config_value: editedCertifications,
          };
        } else {
          return config;
        }
      });

      setKasambahayInfo(updatedKasambahayInfo);
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
      <div className="text-500 w-6 md:w-2 font-medium">Certifications</div>
      {editMode ? (
        <>
          <div className="text-900 flex flex-wrap gap-2 w-full md:w-8 md:flex-order-0 flex-order-1">
            <Chips
              value={editedCertifications}
              onChange={(e) => setEditedCertifications(e.value)}
              pt
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
            {configExists(kasambahayInfo, "Certifications") &&
              kasambahayInfo
                .find((config) => config.config_name === "Certifications")
                .config_value.map((option, index) => (
                  <Chip label={option} className="mr-2" key={index} />
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

export default CertificationsConfig;
