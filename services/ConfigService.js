import axios from "axios";

export const ConfigService = {
  getAllConfigs: async () => {
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/all-configurations`
      );
    } catch (error) {
      console.error("Error fetching all configurations:", error);
      // throw error;
    }
  },

  getConfig: async (configName, configType) => {
    // send configName and configValue as body
    try {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/configurations`,
        {
          params: {
            configName,
            configType,
          },
        }
      );
    } catch (error) {
      console.error(
        `Error fetching configuration ${configName} of type ${configType}:`,
        error
      );
      // throw error;
    }
  },

  updateConfig: async (configName, configType, configValue) => {
    try {
      return await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/configurations`,
        {
          configName,
          configType,
          configValue,
        }
      );
    } catch (error) {
      console.error(
        `Error fetching configuration ${configName} with value ${configValue}:`,
        error
      );
      // throw error;
    }
  },
};
