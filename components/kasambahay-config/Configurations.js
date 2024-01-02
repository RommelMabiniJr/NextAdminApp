import { stringToArray } from "@/utils/dataConversionUtils";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import RatesConfig from "./profile/RatesConfig";
import LanguagesConfig from "./profile/LanguagesConfig";
import CertificationsConfig from "./profile/CertificationsConfig";
import SkillsConfig from "./profile/SkillsConfig";

const Configurations = ({ configs }) => {
  const toast = useRef(null);
  const [kasambahayInfo, setKasambahayInfo] = useState([]);

  useEffect(() => {
    if (!configs) return;

    // Process configurations and set states
    const processConfigurations = () => {
      const groupedConfigs = {};

      configs.forEach((config) => {
        if (!groupedConfigs[config.config_type]) {
          groupedConfigs[config.config_type] = [];
        }

        // Apply stringToArray to config_value beside job title and job description
        const processedConfig = {
          ...config,
          config_value: stringToArray(config.config_value),
        };

        groupedConfigs[config.config_type].push(processedConfig);
      });

      setKasambahayInfo(groupedConfigs["kasambahay_info"] || []);
    };

    processConfigurations();
  }, [configs]);

  const configExists = (configTypeObj, configName) => {
    return configTypeObj.find((config) => config.config_name === configName);
  };

  if (!kasambahayInfo) return null;

  return (
    <>
      <div className="surface-section mb-8">
        <Toast ref={toast} />
        <div className="font-medium text-3xl text-900 mb-3">
          Kasambahay Information
        </div>
        <div className="text-500 mb-5">
          These are information options that you can edit for employers.
        </div>
        <ul className="list-none p-0 m-0">
          <RatesConfig
            kasambahayInfo={kasambahayInfo}
            setKasambahayInfo={setKasambahayInfo}
            configExists={configExists}
            toast={toast}
          />
          <LanguagesConfig
            kasambahayInfo={kasambahayInfo}
            setKasambahayInfo={setKasambahayInfo}
            configExists={configExists}
            toast={toast}
          />
          <CertificationsConfig
            kasambahayInfo={kasambahayInfo}
            setKasambahayInfo={setKasambahayInfo}
            configExists={configExists}
            toast={toast}
          />
          <SkillsConfig
            kasambahayInfo={kasambahayInfo}
            setKasambahayInfo={setKasambahayInfo}
            configExists={configExists}
            toast={toast}
          />
        </ul>
      </div>
    </>
  );
};

export default Configurations;
