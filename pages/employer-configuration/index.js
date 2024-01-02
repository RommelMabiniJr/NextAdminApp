import { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import Configurations from "@/components/employer-config/Configurations";
import { ConfigService } from "@/services/ConfigService";

const AppConfiguration = () => {
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    const fetchEmployerConfigs = async () => {
      const response = await ConfigService.getAllConfigs();
      const data = response.data;
      setConfigs(data);
    };

    fetchEmployerConfigs();
  }, []);

  return (
    <>
      <div className="p-grid p-justify-center">
        <div className="p-col-12 p-lg-8">
          <Card
            // title="Employer Configuration"
            // subTitle="Manage employer configuration options"
            className="p-5"
          >
            <Configurations configs={configs} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default AppConfiguration;
