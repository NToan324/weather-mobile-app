Dựa trên file bạn gửi, mình sẽ viết lại cho bạn một file `README.md` đúng yêu cầu:  
**(Hướng dẫn thiết lập môi trường và khởi chạy chương trình React Native - Expo)**

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
```

### 2. Cài đặt thư viện

```bash
npm install
```

### 3. Khởi chạy ứng dụng

```bash
npx expo start
```

Lệnh này sẽ mở một tab mới trên trình duyệt. Tại đây bạn có thể:

- Quét mã QR bằng ứng dụng **Expo Go** trên điện thoại để chạy app.
- Chạy ứng dụng trên **Android emulator** hoặc **iOS simulator**.
- Chạy app dưới dạng **web app** (dành cho môi trường phát triển).

---

## Một số lệnh hữu ích

- **Reset project về trạng thái mới:**

  ```bash
  npm run reset-project
  ```

  Lệnh này sẽ di chuyển mã nguồn mẫu tạo thư mục `app/` mới cho bạn bắt đầu phát triển.

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
