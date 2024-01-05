import { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import Configurations from "@/components/employer-config/Configurations";
import { ConfigService } from "@/services/ConfigService";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const AppConfiguration = () => {
  const [configs, setConfigs] = useState([]);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  useEffect(() => {
    const fetchEmployerConfigs = async () => {
      const response = await ConfigService.getAllConfigs();
      const data = response.data;
      setConfigs(data);
    };

    fetchEmployerConfigs();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
