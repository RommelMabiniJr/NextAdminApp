import { ConfigService } from "@/services/ConfigService";
import { arrayToString } from "@/utils/dataConversionUtils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const RatesConfig = ({
  kasambahayInfo,
  setKasambahayInfo,
  configExists,
  toast,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedRates, setEditedRates] = useState({
    minRate: "",
    maxRate: "",
  });

  const handleEditClick = () => {
    setEditMode(true);
    setEditedRates({
      minRate: kasambahayInfo.find((config) => config.config_name === "Rates")
        .config_value[0],
      maxRate: kasambahayInfo.find((config) => config.config_name === "Rates")
        .config_value[1],
    });
  };

  const handleSaveClick = async () => {
    // turn editedRates into an array of strings and convert to comma-separated string
    const editedRatesString = arrayToString([
      editedRates.minRate,
      editedRates.maxRate,
    ]);

    // update rates
    const response = await ConfigService.updateConfig(
      "Rates",
      "kasambahay_info",
      editedRatesString
    );

    if (response.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Rates updated",
        life: 3000,
      });

      // update kasambahayInfo
      const updatedKasambahayInfo = kasambahayInfo.map((config) => {
        if (config.config_name === "Rates") {
          return {
            ...config,
            config_value: [editedRates.minRate, editedRates.maxRate],
          };
        } else {
          return config;
        }
      });

      console.log(updatedKasambahayInfo);

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
      <div className="text-500 w-6 md:w-2 font-medium">
        Rates<small className="block">(per day)</small>
      </div>
      {editMode ? (
        <>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            <InputText
              value={editedRates.minRate}
              onChange={(e) =>
                setEditedRates({
                  ...editedRates,
                  minRate: e.target.value,
                })
              }
            />
            {" - "}
            <InputText
              value={editedRates.maxRate}
              onChange={(e) =>
                setEditedRates({
                  ...editedRates,
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
            {configExists(kasambahayInfo, "Rates") &&
              kasambahayInfo.find((config) => config.config_name === "Rates")
                .config_value[0] +
                " - " +
                kasambahayInfo.find((config) => config.config_name === "Rates")
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

export default RatesConfig;
