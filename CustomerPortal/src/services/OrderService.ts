import ApiService from "./ApiService";

class OrderService {
  async getList(payload = {}) {
    try {
      const res = await ApiService.call("/api/orders/history", "POST", payload);

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
