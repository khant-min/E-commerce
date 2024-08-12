import ApiService from "./ApiService";

class CategoryService {
  async getList(payload = {}) {
    try {
      const res = await ApiService.call("/api/categories", "GET", payload);

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
      const res = await ApiService.call("/api/categories", "POST", payload);

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

  async getProductListByCategoryId(payload = {}) {
    try {
      const res = await ApiService.call(
        "/api/categories/details",
        "POST",
        payload
      );

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

export default new CategoryService();
