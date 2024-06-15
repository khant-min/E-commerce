import ApiService from "./ApiService";

class CategoryService {
  async getList() {
    try {
      const res = await ApiService.call("/api/categories", "GET");
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

export default new CategoryService();
