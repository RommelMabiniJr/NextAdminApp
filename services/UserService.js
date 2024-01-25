import axios from "axios";

export const UserService = {
  async getUsers() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`
    );
    return response;
  },

  async setAccountVerification(userId, status) {
    // Note: status must be boolean

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/${userId}`,
      { status }
    );
    return response;
  },
};
