import axios from "@/lib/axios";

export default {
  async getOrder(orderId) {
    try {
      const {
        data: { data: order },
      } = await axios.get(`orders/${orderId}`);
      return order;
    } catch (err) {
      if (err.response.data.message) {
        throw Error(err.response.data.message);
      }
      alert(err);
    }
  },
};
