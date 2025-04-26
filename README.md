Dưới đây mình đã bổ sung thêm yêu cầu về **file `.env`** và tên thư mục gốc là `weather-mobile-app`, đồng thời chỉnh lại phần hướng dẫn cho đúng nhé:

---

# Ứng dụng Thời tiết - React Native (Expo)

Đây là dự án React Native được khởi tạo bằng [Expo](https://expo.dev) với [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Yêu cầu môi trường

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

- [Node.js](https://nodejs.org/) (Phiên bản khuyến nghị: >= 18.x)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (cài bằng lệnh `npm install -g expo-cli`)
- Trình giả lập Android (Android Studio) hoặc thiết bị thật có cài ứng dụng **Expo Go**

## Các bước thiết lập

### 1. Tải mã nguồn về máy

```bash
git clone https://github.com/NToan324/weather-mobile-app.git
cd weather-mobile-app
```

### 2. Cài đặt thư viện

```bash
npm install
```

### 3. Tạo file `.env`

Tạo một file `.env` ở thư mục gốc (`weather-mobile-app/`) với nội dung như sau:

```env
WEATHER_API_KEY=your_openweather_api_key
```

> **Ghi chú:** Bạn cần đăng ký tài khoản tại [OpenWeatherMap](https://openweathermap.org/api) để lấy API key và điền vào.

### 4. Khởi chạy ứng dụng

```bash
npx expo start
```

Sau đó, trình duyệt sẽ tự động mở một giao diện điều khiển, bạn có thể:

- Quét mã QR bằng ứng dụng **Expo Go** trên điện thoại để chạy app.
- Chạy ứng dụng trên **Android emulator** hoặc **iOS simulator**.
- Chạy app dạng **web app** trong môi trường phát triển.

---

## Một số lệnh hữu ích

- **Reset project về trạng thái mới:**

  ```bash
  npm run reset-project
  ```

  Lệnh này sẽ di chuyển mã nguồn mẫu sang thư mục `app-example/` và tạo thư mục `app/` mới để bạn bắt đầu phát triển.

---

## Cấu trúc thư mục chính

```bash
weather-mobile-app/
├── app/
├── assets/
├── components/
├── services/
├── .env
├── app.json
├── package.json
└── README.md
```

---

## Tài liệu tham khảo

- [Tài liệu chính thức Expo](https://docs.expo.dev/)
- [Hướng dẫn phát triển Expo](https://docs.expo.dev/develop/)
- [Hướng dẫn sử dụng Expo Router](https://docs.expo.dev/router/introduction/)

---

## Cộng đồng hỗ trợ

- [Expo trên GitHub](https://github.com/expo/expo)
- [Cộng đồng Discord Expo](https://chat.expo.dev)

---
