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
