import { ConfigService } from "@/services/ConfigService";
import { arrayToString } from "@/utils/dataConversionUtils";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const OfferFreqOfPaymentConfig = ({
  offerInfo,
  setOfferInfo,
  configExists,
  toast,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedFreqOfPayment, setEditedFreqOfPayment] = useState([]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedFreqOfPayment(
      configExists(offerInfo, "Frequency of Payment")
        ? offerInfo.find(
            (config) => config.config_name === "Frequency of Payment"
          ).config_value
        : []
    );
  };

  const handleSaveClick = async () => {
    // turn editedFrequencyOfPay into an array of strings and convert to comma-separated string
    const editedFreqOfPayString = arrayToString(editedFreqOfPayment);

    // update rates
    const response = await ConfigService.updateConfig(
      "Frequency of Payment",
      "offer",
      editedFreqOfPayString
    );

    if (response.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Frequency of Payment updated",
        life: 3000,
      });

      // update kasambahayInfo
      const updatedOfferInfo = offerInfo.map((config) => {
        if (config.config_name === "Frequency of Payment") {
          return {
            ...config,
            config_value: editedFreqOfPayment,
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
        Frequency of Payment
      </div>
      {editMode ? (
        <>
          <div className="text-900 flex flex-wrap gap-2 w-full md:w-8 md:flex-order-0 flex-order-1">
            <Chips
              value={editedFreqOfPayment}
              onChange={(e) => setEditedFreqOfPayment(e.value)}
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
            {configExists(offerInfo, "Frequency of Payment") &&
              offerInfo
                .find((config) => config.config_name === "Frequency of Payment")
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

export default OfferFreqOfPaymentConfig;
