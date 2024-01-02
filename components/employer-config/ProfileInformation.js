import { stringToArray } from "@/utils/dataConversionUtils";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import FreqOfPaymentConfig from "./profile/FreqOfPaymentConfig";
import OfferFreqOfPaymentConfig from "./offer/FreqOfPaymentConfig";
import JobTitleConfig from "./jobposting/JobTitleConfig";
import JobDescriptionConfig from "./jobposting/JobDescriptionConfig";
import LivingArrangementConfig from "./jobposting/LivingArrangementConfig";
import SalaryConfig from "./offer/SalaryConfig";
import BenefitsConfig from "./offer/BenefitsConfig";

const ProfileInformation = ({ configs }) => {
  const toast = useRef(null);
  const [employerInfo, setEmployerInfo] = useState([]);
  const [jobPosting, setJobPosting] = useState([]);
  const [offerOptions, setOfferOptions] = useState([]);

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
          config_value:
            config.config_name === "Job Title" ||
            config.config_name === "Job Description"
              ? config.config_value
              : stringToArray(config.config_value),
        };

        groupedConfigs[config.config_type].push(processedConfig);
      });

      setEmployerInfo(groupedConfigs["employer_info"] || []);
      setJobPosting(groupedConfigs["job_posting"] || []);
      setOfferOptions(groupedConfigs["offer"] || []);
    };

    processConfigurations();
  }, [configs]);

  const configExists = (configTypeObj, configName) => {
    return configTypeObj.find((config) => config.config_name === configName);
  };

  if (!employerInfo || !jobPosting || !offerOptions) return null;

  return (
    <>
      <Toast ref={toast} />
      <div className="surface-section mb-8">
        <div className="font-medium text-3xl text-900 mb-3">
          Employer Information
        </div>
        <div className="text-500 mb-5">
          These are information options that you can edit for employers.
        </div>
        <ul className="list-none p-0 m-0">
          <FreqOfPaymentConfig
            employerInfo={employerInfo}
            setEmployerInfo={setEmployerInfo}
            configExists={configExists}
            toast={toast}
          />
        </ul>
      </div>
      <div className="surface-section mb-8">
        <div className="font-medium text-3xl text-900 mb-3">Job Posting</div>
        <div className="text-500 mb-5">
          These are information options that you can edit for employers.
        </div>
        <ul className="list-none p-0 m-0">
          <JobTitleConfig
            jobPostingInfo={jobPosting}
            setJobPostingInfo={setJobPosting}
            configExists={configExists}
            toast={toast}
          />
          <JobDescriptionConfig
            jobPostingInfo={jobPosting}
            setJobPostingInfo={setJobPosting}
            configExists={configExists}
            toast={toast}
          />
          <LivingArrangementConfig
            jobPostingInfo={jobPosting}
            setJobPostingInfo={setJobPosting}
            configExists={configExists}
            toast={toast}
          />
        </ul>
      </div>
      <div className="surface-section mb-8">
        <div className="font-medium text-3xl text-900 mb-3">Offer Options</div>
        <div className="text-500 mb-5">
          These are information options that you can edit for employers.
        </div>
        <ul className="list-none p-0 m-0">
          <OfferFreqOfPaymentConfig
            offerInfo={offerOptions}
            setOfferInfo={setOfferOptions}
            configExists={configExists}
            toast={toast}
          />
          <SalaryConfig
            offerInfo={offerOptions}
            setOfferInfo={setOfferOptions}
            configExists={configExists}
            toast={toast}
          />
          <BenefitsConfig
            offerInfo={offerOptions}
            setOfferInfo={setOfferOptions}
            configExists={configExists}
            toast={toast}
          />
        </ul>
      </div>
    </>
  );
};

export default ProfileInformation;
