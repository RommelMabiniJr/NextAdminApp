import { ConfigService } from "@/services/ConfigService";
import { arrayToString } from "@/utils/dataConversionUtils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const SalaryConfig = ({ offerInfo, setOfferInfo, configExists, toast }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedSalary, setEditedSalary] = useState({
    minRate: "",
    maxRate: "",
  });

  const handleEditClick = () => {
    setEditMode(true);
    setEditedSalary({
      minRate: offerInfo.find((config) => config.config_name === "Salary")
        .config_value[0],
      maxRate: offerInfo.find((config) => config.config_name === "Salary")
        .config_value[1],
    });
  };

  const handleSaveClick = async () => {
    // turn editedSalary into an array of strings and convert to comma-separated string
    const editedSalaryString = arrayToString([
      editedSalary.minRate,
      editedSalary.maxRate,
    ]);

    // update Salary
    const response = await ConfigService.updateConfig(
      "Salary",
      "offer",
      editedSalaryString
    );

    if (response.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Salary updated",
        life: 3000,
      });

      // update offerInfo
      const updatedOfferInfo = offerInfo.map((config) => {
        if (config.config_name === "Salary") {
          return {
            ...config,
            config_value: [editedSalary.minRate, editedSalary.maxRate],
          };
        } else {
          return config;
        }
      });

      setOfferInfo(updatedOfferInfo);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Salary not updated",
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
        Salary<small className="block">(per day)</small>
      </div>
      {editMode ? (
        <>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            <InputText
              value={editedSalary.minRate}
              onChange={(e) =>
                setEditedSalary({
                  ...editedSalary,
                  minRate: e.target.value,
                })
              }
            />
            {" - "}
            <InputText
              value={editedSalary.maxRate}
              onChange={(e) =>
                setEditedSalary({
                  ...editedSalary,
                  maxRate: e.target.value,
                })
              }
            />
            {" PHP"}
          </div>
          <div className="w-6 md:w-2 flex justify-content-end gap-2">
            <Button
              // label="Save"
              icon="pi pi-check"
              onClick={handleSaveClick}
            />
            <Button
              // label="Cancel"
              icon="pi pi-times"
              severity="secondary"
              onClick={handleCancelClick}
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {configExists(offerInfo, "Salary") &&
              offerInfo.find((config) => config.config_name === "Salary")
                .config_value[0] +
                " - " +
                offerInfo.find((config) => config.config_name === "Salary")
                  .config_value[1]}{" "}
            PHP
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

export default SalaryConfig;
