import axios, { forecastEndpoint, searchEndpoint } from "@/config/axios";

// Interface cho thông tin địa điểm
interface Location {
  name: string;
  country: string;
  tz_id: string;
  localtime: string;
}

// Interface cho điều kiện thời tiết
interface WeatherCondition {
  text: string;
  icon: string;
}

// Interface cho thông tin thời tiết hiện tại
interface CurrentWeather {
  temp_f: number;
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  pressure_mb: number;
  wind_kph: number;
  wind_dir: string;
  uv: number;
  condition: WeatherCondition;
}

export interface forecastday {
  date: string;
  day: {
    avgtemp_c: number;
    maxtemp_c: number;
    condition: WeatherCondition;
  };
}

export interface forecast {
  forecastday: forecastday[];
}

// Interface tổng hợp dữ liệu thời tiết
export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: forecast;
}

export interface City {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

class WeatherService {
  async getWeatherByCity(city: string, days: number): Promise<WeatherData> {
    const response = await axios.get(
      forecastEndpoint({ cityName: city, days: days })
    );
    return response.data;
  }

  async searchCity(city: string): Promise<any> {
    const response = await axios.get(searchEndpoint({ cityName: city }));
    return response.data;
  }

  async getCity() {
    const response = await axios.get("/api/p", {
      baseURL: "https://provinces.open-api.vn/",
    });
    return response.data;
  }
}

const weatherService = new WeatherService();
export default weatherService;

[
  {
    current: {
      cloud: 87,
      condition: {
        code: 1063,
        icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
        text: "Patchy rain nearby",
      },
      dewpoint_c: 20.3,
      dewpoint_f: 68.5,
      feelslike_c: 37.2,
      feelslike_f: 98.9,
      gust_kph: 24.7,
      gust_mph: 15.4,
      heatindex_c: 37.2,
      heatindex_f: 98.9,
      humidity: 45,
      is_day: 1,
      last_updated: "2025-04-22 15:45",
      last_updated_epoch: 1745311500,
      precip_in: 0,
      precip_mm: 0.05,
      pressure_in: 29.76,
      pressure_mb: 1008,
      temp_c: 33.8,
      temp_f: 92.9,
      uv: 2.6,
      vis_km: 10,
      vis_miles: 6,
      wind_degree: 142,
      wind_dir: "SE",
      wind_kph: 20.5,
      wind_mph: 12.8,
      windchill_c: 33.8,
      windchill_f: 92.9,
    },
    forecast: { forecastday: [[Object], [Object], [Object]] },
    location: {
      country: "Vietnam",
      lat: 10.0333,
      localtime: "2025-04-22 15:56",
      localtime_epoch: 1745312188,
      lon: 105.7833,
      name: "Can Tho",
      region: "",
      tz_id: "Asia/Ho_Chi_Minh",
    },
  },
];
