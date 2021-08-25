import { UnitType, RouteResponseType } from "ducks/route/types";

class ApiService {
  baseUrl = "https://mapon.com/api/v1/";
  key = "ed6dc5516f66531096e66628e84d10fd2371c87a";

  encodeQueryData = (data?: { [key: string]: string }) => {
    const encoded = [];
    for (let d in data)
      encoded.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return encoded.join("&");
  };

  async getResource<T>(
    url: string,
    params?: { [key: string]: string }
  ): Promise<T> {
    const urlParameters = this.encodeQueryData(params);
    const fullUrl = `${this.baseUrl}${url}?key=${this.key}&${urlParameters}`;
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
    const data = {
      unit_id: `${unit_id}`,
      from,
      till,
      include: "decoded_route",
    };
    const res = await this.getResource<{ data: RouteResponseType }>(url, data);
    return res.data;
  };
}

export default ApiService;
