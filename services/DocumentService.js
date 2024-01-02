import axios from "axios";

export const DocumentService = {
  async getDocuments() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/documents`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async verifyDocument(documentId) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/documents/${documentId}/verify`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async unverifyDocument(documentId) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/documents/${documentId}/unverify`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
