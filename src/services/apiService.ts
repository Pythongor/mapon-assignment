import { UnitType } from "ducks/route/types";

class ApiService {
  baseUrl = "https://mapon.com/api/v1/";
  key = "ed6dc5516f66531096e66628e84d10fd2371c87a";

  async getResource<T>(
    url: string,
    params?: { [key: string]: string }
  ): Promise<T> {
    const paramsEntries = params ? Object.entries(params) : [];
    const paramsStrings = paramsEntries.map(
      ([key, value]) => `&${key}=${value}`
    );
    const urlParameters = paramsStrings.join("");
    const fullUrl = `${this.baseUrl}${url}?key=${this.key}${urlParameters}`;
    console.log(fullUrl);
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

  getRoutes = async (unit_id: number, from: string, till: string) => {
    const url = "route/list.json";
    const res = await this.getResource<{ data: unknown }>(url, {
      unit_id: `${unit_id}`,
      from,
      till,
      include: "decoded_route",
    });
    return res.data;
  };
}

export default ApiService;
