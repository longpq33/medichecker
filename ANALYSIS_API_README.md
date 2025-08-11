# Analysis API Documentation

## Tổng quan

Dựa trên Swagger API documentation từ [medi-checker.onrender.com](https://medi-checker.onrender.com/swagger-ui/index.html), project đã được tích hợp đầy đủ các API phân tích đơn thuốc.

## Features

- **Phân tích đơn thuốc**: Kiểm tra tương tác thuốc và chống chỉ định
- **Phân tích tự động hoàn toàn**: Kích hoạt khi chọn thuốc, không có nút điều khiển
- **Phân tích lại khi thay đổi thuốc**: Tự động gọi API khi chọn loại thuốc khác
- **Reset kết quả thông minh**: Tự động reset khi thuốc thay đổi
- **Không gọi liên tục**: Logic tối ưu để tránh infinite loop
- **Sticky positioning**: Cố định khi scroll, luôn hiển thị trên màn hình
- **Responsive design**: Tự động điều chỉnh cho mobile
- **Luôn hoạt động**: Không thể tắt/bật, luôn ở chế độ tự động
- **Cập nhật real-time**: Tự động phân tích khi dữ liệu thay đổi
- **Hiển thị kết quả**: Mức độ rủi ro, khuyến nghị và thống kê chi tiết
- **Thời gian phân tích**: Tự động hiển thị ngày giờ hiện tại
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **Theme**: Hỗ trợ light/dark mode

## API Endpoints

### 1. Phân tích đơn thuốc tổng hợp
- **Endpoint**: `POST /analysis/prescription`
- **Service**: `analysisService.phanTichDonThuoc()`
- **Hook**: `useAnalysis().phanTichDonThuoc()`
- **Request**: Sử dụng `prescription_list` với `drug_name`, `dosage`, `frequency`
- **Swagger**: Khớp hoàn toàn với API documentation

### 2. Phân tích tương tác thuốc
- **Endpoint**: `POST /analysis/interactions`
- **Service**: `analysisService.phanTichTuongTac()`
- **Hook**: `useAnalysis().phanTichTuongTac()`

### 3. Phân tích thuốc không hợp lý
- **Endpoint**: `POST /analysis/inappropriate-drugs`
- **Service**: `analysisService.phanTichKhongHopLy()`
- **Hook**: `useAnalysis().phanTichKhongHopLy()`

### 4. Phân tích trùng chỉ định
- **Endpoint**: `POST /analysis/duplicate-indications`
- **Service**: `analysisService.phanTichTrungChiDinh()`
- **Hook**: `useAnalysis().phanTichTrungChiDinh()`

### 5. Phân tích chống chỉ định
- **Endpoint**: `POST /analysis/contraindications`
- **Service**: `analysisService.phanTichChongChiDinh()`
- **Hook**: `useAnalysis().phanTichChongChiDinh()`

## Types

### PrescriptionAnalysisRequest
```typescript
interface PrescriptionItem {
  drug_name: string
  dosage: string
  frequency: string
}

interface PrescriptionAnalysisRequest {
  prescription_list: PrescriptionItem[]
  allergies?: string[] // Danh sách dị ứng
  medical_history?: string[] // Lịch sử bệnh lý nền
}
```

### PrescriptionAnalysisResponse
```typescript
interface PrescriptionAnalysisResponse {
  // Field mới từ API
  overall_risk?: string // Mức độ rủi ro tổng thể (LOW, MEDIUM, HIGH, CRITICAL)
  
  // Fields cũ (fallback cho backward compatibility)
  tongQuan?: {
    tongThuoc?: number
    tongChiPhi?: number
    mucDoAnToan?: string
    diemAnToan?: number
  }
  phanTich?: PhanTichResponse
  khuyenNghi?: {
    tongHop?: string[]
    canThiet?: string[]
    khongCanThiet?: string[]
  }
  baoCaoChiTiet?: {
    ngayPhanTich?: string
    nguoiPhanTich?: string
    ghiChu?: string
  }
  [key: string]: unknown
}
```



## Components

### TreatmentAnalysis
Component chính để phân tích đơn thuốc với:
- **Phân tích tự động hoàn toàn**: Kích hoạt khi chọn thuốc từ form đơn thuốc
- **Phân tích lại khi thay đổi thuốc**: Tự động gọi API khi chọn loại thuốc khác
- **Reset kết quả thông minh**: Tự động reset khi thuốc thay đổi
- **Không gọi liên tục**: Logic tối ưu để tránh infinite loop
- **Sticky positioning**: Cố định khi scroll, luôn hiển thị trên màn hình
- **Responsive design**: Tự động điều chỉnh cho mobile
- **Hiển thị danh sách chi tiết**: Thuốc, dị ứng, bệnh lý nền
- **Thống kê trực quan**: Số lượng thuốc, dị ứng, bệnh lý
- **Mức độ rủi ro**: Sử dụng field `overall_risk` từ API
- **Khuyến nghị phân tích**: Tóm tắt kết quả phân tích
- **Thời gian phân tích**: Tự động lấy ngày giờ hiện tại
- **Không có nút điều khiển**: Luôn hoạt động ở chế độ tự động, không thể tắt/bật

### PrescriptionAnalysis
Component demo để phân tích đơn thuốc với:
- Form nhập thông tin bệnh nhân và thuốc
- Hiển thị kết quả phân tích
- Mức độ rủi ro và khuyến nghị
- Báo cáo chi tiết

## Usage Examples

### Sử dụng hook
```typescript
import { useAnalysis } from '@/hooks/useAnalysis'

const MyComponent = () => {
  const { 
    loading, 
    error, 
    phanTichDonThuoc, 
    clearError 
  } = useAnalysis()

  // Phân tích tự động khi có dữ liệu
  useEffect(() => {
    if (medicines.length > 0) {
      handleAnalysis()
    }
  }, [medicines])

  const handleAnalysis = async () => {
    try {
      const result = await phanTichDonThuoc({
        prescription_list: [
          {
            drug_name: 'Paracetamol 500mg',
            dosage: '1 viên/lần',
            frequency: '3 lần/ngày'
          }
        ],
        allergies: ['Penicillin', 'Aspirin'],
        medical_history: ['Tiểu đường', 'Cao huyết áp']
      })
      console.log('Kết quả phân tích:', result)
      console.log('Mức độ rủi ro:', result.overall_risk)
      console.log('Số thuốc:', result.prescription_list?.length)
      console.log('Dị ứng:', result.allergies?.length)
      console.log('Bệnh lý:', result.medical_history?.length)
      console.log('Thời gian phân tích:', new Date().toLocaleString('vi-VN'))
    } catch (err) {
      console.error('Lỗi:', err)
    }
  }

  return (
    <div>
      {error && <Alert message={error} type="error" />}
      {/* Không có nút điều khiển - luôn hoạt động ở chế độ tự động */}
    </div>
  )
}
```

### Sử dụng service trực tiếp
```typescript
import { analysisService } from '@/services'

const result = await analysisService.phanTichDonThuoc(data)
```

## Translation Keys

### Tiếng Việt (vi.json)
```json
{
  "analysis": {
    "title": "Phân tích đơn thuốc",
    "prescriptionAnalysis": "Phân tích đơn thuốc",
    "analyzePrescription": "Phân tích đơn thuốc",
    "analysisResults": "Kết quả phân tích",
    "safetyScore": "Điểm an toàn",
    "safetyLevel": {
      "AN_TOAN": "An toàn",
      "CAN_THAN_TRONG": "Cần thận trọng",
      "NGUY_HIEM": "Nguy hiểm"
    }
  }
}
```

### Tiếng Anh (en.json)
```json
{
  "analysis": {
    "title": "Prescription Analysis",
    "prescriptionAnalysis": "Prescription Analysis",
    "analyzePrescription": "Analyze Prescription",
    "analysisResults": "Analysis Results",
    "safetyScore": "Safety Score",
    "safetyLevel": {
      "AN_TOAN": "Safe",
      "CAN_THAN_TRONG": "Caution Required",
      "NGUY_HIEM": "Dangerous"
    }
  }
}
```

## Cấu trúc Files

```
src/
├── constants/
│   └── api.ts                    # API endpoints
├── types/
│   └── analysis.ts               # Type definitions
├── services/
│   └── analysisService.ts        # API service functions
├── hooks/
│   └── useAnalysis.ts            # React hook
├── components/
│   └── PrescriptionAnalysis/     # UI component
└── i18n/
    └── locales/
        ├── vi.json               # Vietnamese translations
        └── en.json               # English translations
```

## Lưu ý

1. **Base URL**: API sử dụng `https://medi-checker.onrender.com` làm base URL
2. **Error Handling**: Tất cả API calls đều có error handling và loading states
3. **Type Safety**: Sử dụng TypeScript để đảm bảo type safety
4. **Internationalization**: Hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)
5. **Responsive Design**: Component được thiết kế responsive và mobile-friendly
6. **Swagger Compliance**: API request/response hoàn toàn khớp với Swagger documentation
7. **Simplified Structure**: Sử dụng `prescription_list` với `drug_name`, `dosage`, `frequency` thay vì cấu trúc phức tạp
8. **Safe Response Handling**: Sử dụng helper functions để xử lý response một cách an toàn, tránh lỗi `Cannot read properties of undefined`
9. **Flexible Response Types**: Hỗ trợ response có cấu trúc khác nhau từ API backend

## Testing

Để test API, bạn có thể:
1. Sử dụng component `PrescriptionAnalysis` trong development
2. Gọi trực tiếp service functions
3. Sử dụng Swagger UI tại [medi-checker.onrender.com/swagger-ui/index.html](https://medi-checker.onrender.com/swagger-ui/index.html)
