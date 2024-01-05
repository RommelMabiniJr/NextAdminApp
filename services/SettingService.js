import axios from "axios";

export const SettingService = {
  async getAdminAccounts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/accounts`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async updateAdminAccount(id, data) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/account/${id}`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async addAdminAccount(data) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/account`,
        data
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async deleteAdminAccount(id) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/account/${id}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async saveBackupSettings(frequency, time, retention) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/backup/settings`,
        frequency,
        time,
        retention
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async getBackupSettings() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/backup/settings`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async getBackups() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/backups`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async downloadBackup(filename) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/backupDownload/${filename}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async deleteBackup(filename) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/backup/${filename}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async createBackupNow(adminId) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/createBackup`,
        { adminId } // Wrap adminId in an object
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
