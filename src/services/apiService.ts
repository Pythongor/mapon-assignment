import { UnitType } from "ducks/route/types";

type RouteFromAPIType = {
  type: "start" | "stop";
  route_id: number;
  start: { address: string; lat: number; lng: number; time: string };
  end: { time: string };
  polyline?: string;
  // decoded_route?: {
  //   points: { gmt: string; lat: number; lng: number; speed: number }[];
  // };
  [key: string]: unknown;
};

export type RouteResponseType = {
  units: {
    unit_id: number;
    routes: RouteFromAPIType[];
  }[];
};

class ApiService {
  baseUrl = "https://mapon.com/api/v1/";
  key = "ed6dc5516f66531096e66628e84d10fd2371c87a";

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

  encodeQueryData = (data?: { [key: string]: string }) => {
    const encoded = [];
    for (let d in data)
      encoded.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return encoded.join("&");
  };

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
      include: "polyline",
    };
    const res = await this.getResource<{ data: RouteResponseType }>(url, data);
    return res.data;
  };
}

export default ApiService;
