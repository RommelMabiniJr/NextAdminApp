import axios from "axios";

export const DashboardService = {
  async getUnverifiedDocumentCounts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/dashboard/unverified-documents`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async getUnverifiedUserCounts() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/dashboard/unverified-users`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async getUserChartData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/dashboard/user-chart-data`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async getServiceDistributionData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/dashboard/service-distribution-data`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
