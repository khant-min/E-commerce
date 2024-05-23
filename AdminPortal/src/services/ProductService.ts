import ApiService from "./ApiService";

class ProductService {
  async getList() {
    try {
      const res = await ApiService.call("/api/products/secure", "GET");
      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (e) {
      console.log("error: ", e);
      return {
        success: false,
        error: e,
      };
    }
  }

  async createProduct(payload = {}) {
    try {
      const res = await ApiService.call(
        "/api/products/secure",
        "POST",
        payload
      );
      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (e) {
      console.log("error: ", e);
      return {
        success: false,
        error: e,
      };
    }
  }

  async edit(payload = {}) {
    try {
      const res = await ApiService.call("/api/products/secure", "PUT", payload);
      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (e) {
      console.log("error: ", e);
      return {
        success: false,
        error: e,
      };
    }
  }

  async delete(payload = {}) {
    try {
      const res = await ApiService.call(
        "/api/products/secure",
        "DELETE",
        payload
      );
      console.log(res);

      return {
        success: true,
        data: res,
      };
    } catch (e) {
      console.log("error: ", e);
      return {
        success: false,
        error: e,
      };
    }
  }
}

export default new ProductService();
