import ApiService from "./ApiService";

class OrderService {
  async create(payload = {}) {
    try {
      const res = await ApiService.call("/api/orders", "POST", payload);

      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }
}

export default new OrderService();
