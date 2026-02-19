import ApiService from "./ApiService";

class CustomerService {
  async getList() {
    try {
      const res = await ApiService.call("/api/customers", "GET");
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

export default new CustomerService();
