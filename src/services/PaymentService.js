import axios from "@/lib/axios";

export default {
  async checkout(payload) {
    try {
      const { data, status } = await axios.post("payments/checkout", payload);
      return data.data.html_snippet;
    } catch (err) {
      if (err.response.data.message) {
        throw Error(err.response.data.message);
      }
      alert(err);
    }
  },
};
