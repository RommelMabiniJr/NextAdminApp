import { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import Configurations from "@/components/kasambahay-config/Configurations";
import { ConfigService } from "@/services/ConfigService";

const KasambahayConfig = () => {
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    const fetchKasambahayConfigs = async () => {
      const response = await ConfigService.getAllConfigs();
      const data = response.data;
      setConfigs(data);
    };

    fetchKasambahayConfigs();
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

export default KasambahayConfig;
