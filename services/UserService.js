import axios from "axios";

export const UserService = {
  async getUsers() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`
    );
    return response;
  },
};
