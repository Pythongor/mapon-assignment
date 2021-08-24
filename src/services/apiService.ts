import { UnitType } from "ducks/units/types";

class ApiService {
  baseUrl = "https://mapon.com/api/v1/";
  key = "ed6dc5516f66531096e66628e84d10fd2371c87a";

  async getResource<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}?key=${this.key}`;
    const res = await fetch(fullUrl);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  getCars = async () => {
    const res = await this.getResource<{ data: { units: UnitType[] } }>(
      "unit/list.json"
    );
    return res.data;
  };
}

export default ApiService;
