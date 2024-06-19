import ApiService from "./ApiService";

class ProductService {
  async getList(payload = {}) {
    try {
      const res = await ApiService.call("/api/products", "GET", payload);

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

export default new ProductService();
