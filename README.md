# MediChecker - Hệ Thống Quản Lý Bệnh Nhân

MediChecker là một ứng dụng web hiện đại được xây dựng để quản lý bệnh nhân, đơn thuốc và phân tích tương tác thuốc. Ứng dụng cung cấp giao diện thân thiện với người dùng và các tính năng phân tích thông minh để hỗ trợ các nhân viên y tế.

## 🚀 Tính năng chính

### 📊 Dashboard
- Thống kê tổng quan về bệnh nhân, thuốc, lịch hẹn
- Biểu đồ và báo cáo trực quan
- Hoạt động gần đây

### 👥 Quản lý bệnh nhân
- Thêm, sửa, xóa thông tin bệnh nhân
- Tìm kiếm và lọc bệnh nhân
- Quản lý hồ sơ bệnh án
- Thông tin liên hệ và bảo hiểm

### 💊 Quản lý thuốc
- Danh mục thuốc với thông tin chi tiết
- Quản lý tồn kho và giá cả
- Phân loại thuốc theo nhóm
- Thông tin chỉ định và chống chỉ định

### 📋 Quản lý đơn thuốc
- Tạo và quản lý đơn thuốc
- Thêm thuốc vào đơn với liều lượng
- Theo dõi trạng thái đơn thuốc
- In đơn thuốc

### 🔍 Phân tích thông minh
- Phân tích tương tác thuốc
- Cảnh báo chống chỉ định
- Phát hiện thuốc trùng lặp
- Phân tích thuốc không hợp lý

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 19.1.0** - UI Framework
- **TypeScript 5.8.3** - Type safety
- **Vite 7.0.4** - Build tool và dev server
- **React Router DOM 7.7.1** - Client-side routing
- **Ant Design 5.26.7** - UI Component library
- **Styled Components 6.1.19** - CSS-in-JS styling

### State Management
- **Zustand 5.0.7** - Global state management
- **React Query 3.39.3** - Server state management

### Internationalization
- **i18next 25.3.2** - Đa ngôn ngữ
- **react-i18next 15.6.1** - React integration
- **i18next-browser-languagedetector 8.2.0** - Language detection

### HTTP Client
- **Axios 1.11.0** - HTTP client

### Development Tools
- **ESLint 9.30.1** - Code linting
- **TypeScript ESLint 8.35.1** - TypeScript linting
- **Vite Plugin React 4.6.0** - React support

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 9.0.0 hoặc yarn >= 1.22.0

### Bước 1: Clone repository
```bash
git clone https://github.com/longpq33/medichecker.git
cd medichecker-demo
```

### Bước 2: Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

### Bước 3: Cấu hình environment
Tạo file `.env.local` trong thư mục gốc:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Bước 4: Chạy ứng dụng
```bash
# Development mode
npm run dev
# hoặc
yarn dev

# Build cho production
npm run build
# hoặc
yarn build

# Preview build
npm run preview
# hoặc
yarn preview
```

## 🏗️ Cấu trúc dự án

```
src/
├── app/                    # App chính và routing
│   ├── app.tsx           # App component
│   ├── routes.tsx        # Route configuration
│   └── app.css           # Global styles
├── components/            # Shared components
│   ├── Button/
│   ├── LanguageSwitcher/
│   └── index.ts
├── constants/             # Constants và configurations
│   ├── api.ts           # API constants
│   ├── medicine.ts      # Medicine constants
│   └── index.ts
├── hooks/                # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   ├── useLanguage.ts   # Internationalization hook
│   ├── usePatients.ts   # Patient management hook
│   ├── useMedicines.ts  # Medicine management hook
│   ├── usePrescriptions.ts # Prescription management hook
│   ├── useAnalysis.ts   # Analysis hook
│   └── index.ts
├── i18n/                 # Internationalization
│   ├── index.ts
│   └── locales/
│       ├── en.json      # English translations
│       └── vi.json      # Vietnamese translations
├── layouts/              # Layout components
│   ├── LoginLayout/
│   ├── MainLayout/
│   └── index.ts
├── pages/                # Page components
│   ├── HomePage/
│   ├── LoginPage/
│   ├── PatientList/
│   ├── MedicineList/
│   ├── PatientDetail/
│   ├── AddTreatment/
│   └── index.ts
├── services/             # API services
│   ├── api.ts           # Axios configuration
│   ├── auth.ts          # Authentication service
│   ├── patientService.ts # Patient API service
│   ├── medicineService.ts # Medicine API service
│   ├── prescriptionService.ts # Prescription API service
│   ├── analysisService.ts # Analysis API service
│   └── index.ts
├── store/                # State management
│   └── index.ts         # Zustand stores
├── types/                # TypeScript type definitions
│   ├── auth.ts          # Authentication types
│   ├── patient.ts       # Patient types
│   ├── medicine.ts      # Medicine types
│   ├── prescription.ts  # Prescription types
│   ├── analysis.ts      # Analysis types
│   ├── common.ts        # Common types
│   └── index.ts
└── utils/                # Utility functions
    ├── axios.ts         # Axios utilities
    └── index.ts         # General utilities
```

## 🚀 Scripts

```bash
# Development
npm run dev              # Chạy development server
npm run build            # Build cho production
npm run preview          # Preview build
npm run type-check       # Kiểm tra TypeScript
npm run lint             # Chạy ESLint

# Production
npm run build:prod       # Build cho production với optimizations
npm run preview:prod     # Preview production build
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/logout` - Đăng xuất

### Patients
- `GET /patients` - Danh sách bệnh nhân
- `GET /patients/{id}` - Chi tiết bệnh nhân
- `POST /patients` - Tạo bệnh nhân mới
- `PUT /patients/{id}` - Cập nhật bệnh nhân
- `DELETE /patients/{id}` - Xóa bệnh nhân

### Medicines
- `GET /drugs` - Danh sách thuốc
- `GET /drugs/{id}` - Chi tiết thuốc
- `POST /drugs` - Thêm thuốc mới
- `PUT /drugs/{id}` - Cập nhật thuốc
- `DELETE /drugs/{id}` - Xóa thuốc

### Prescriptions
- `GET /prescriptions` - Danh sách đơn thuốc
- `GET /prescriptions/{id}` - Chi tiết đơn thuốc
- `POST /prescriptions` - Tạo đơn thuốc mới
- `PUT /prescriptions/{id}` - Cập nhật đơn thuốc
- `DELETE /prescriptions/{id}` - Xóa đơn thuốc

### Analysis
- `POST /analysis/interactions` - Phân tích tương tác thuốc
- `POST /analysis/inappropriate-drugs` - Phân tích thuốc không hợp lý
- `POST /analysis/duplicate-indications` - Phân tích trùng chỉ định
- `POST /analysis/contraindications` - Phân tích chống chỉ định

## 🎨 UI/UX Features

- **Responsive Design** - Tương thích với mọi thiết bị
- **Dark/Light Theme** - Hỗ trợ chế độ tối/sáng
- **Internationalization** - Hỗ trợ tiếng Việt và tiếng Anh
- **Accessibility** - Tuân thủ WCAG guidelines
- **Loading States** - Trạng thái loading cho UX tốt hơn
- **Error Handling** - Xử lý lỗi thân thiện

## 🔧 Development

### Code Style
- Sử dụng TypeScript strict mode
- ESLint với TypeScript rules
- Prettier cho code formatting
- Conventional commits

### Testing
```bash
# Chạy tests
npm run test

# Chạy tests với coverage
npm run test:coverage
```

### Deployment
```bash
# Build cho production
npm run build:prod

# Deploy lên Vercel
vercel --prod
```

## 📝 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Support

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue trên GitHub hoặc liên hệ:

- **Email**: support@medichecker.com
- **GitHub**: [https://github.com/longpq33/medichecker](https://github.com/longpq33/medichecker)

---

**MediChecker** - Hệ thống quản lý bệnh nhân thông minh 🏥
