# API Updates Summary

## Các thay đổi đã thực hiện

### 1. Sửa cách gửi tham số pageable
- **Trước**: `params.append('pageable', JSON.stringify(pageable))`
- **Sau**: 
  ```javascript
  params.append('page', pageable.page.toString())
  params.append('size', pageable.size.toString())
  ```

### 2. Cập nhật endpoints cho đồng bộ
- **Patients**: `/patients` (không thay đổi)
- **Medicines**: `/medicines` (thay đổi từ `/drugs`)
- **Prescriptions**: `/prescriptions` (không thay đổi)

### 3. Các service đã được cập nhật
- `src/services/patientService.ts`
- `src/services/medicineService.ts`
- `src/services/prescriptionService.ts`
- `src/services/treatmentService.ts` (mới)

### 4. Types mới được thêm
- `src/types/treatment.ts` - Types cho lịch sử điều trị
- Cập nhật `src/types/index.ts` để export types mới

### 5. Hooks đã được cập nhật
- `src/hooks/usePrescriptions.ts` - Sửa signature từ `benhNhanId` thành `keyword`

### 6. PatientDetail đã được cập nhật
- Sử dụng API thực tế cho lịch sử điều trị
- Thêm loading states
- Xử lý lỗi khi fetch data

## API Endpoints hiện tại

### Patients
- `GET /api/patients?page=0&size=10` - Lấy danh sách bệnh nhân
- `GET /api/patients/{id}` - Lấy chi tiết bệnh nhân
- `POST /api/patients` - Tạo bệnh nhân mới
- `PUT /api/patients/{id}` - Cập nhật bệnh nhân
- `DELETE /api/patients/{id}` - Xóa bệnh nhân

### Medicines
- `GET /api/medicines?page=0&size=10` - Lấy danh sách thuốc
- `GET /api/medicines/{id}` - Lấy chi tiết thuốc
- `POST /api/medicines` - Tạo thuốc mới
- `PUT /api/medicines/{id}` - Cập nhật thuốc
- `DELETE /api/medicines/{id}` - Xóa thuốc

### Prescriptions
- `GET /api/prescriptions?page=0&size=10` - Lấy danh sách đơn thuốc
- `GET /api/prescriptions/{id}` - Lấy chi tiết đơn thuốc
- `POST /api/prescriptions` - Tạo đơn thuốc mới
- `PUT /api/prescriptions/{id}` - Cập nhật đơn thuốc
- `DELETE /api/prescriptions/{id}` - Xóa đơn thuốc

### Treatments (Lịch sử điều trị)
- `GET /api/patients/{patientId}/treatments?page=0&size=10` - Lấy lịch sử điều trị
- `GET /api/treatments/{treatmentId}` - Lấy chi tiết lịch sử điều trị
- `POST /api/patients/{patientId}/treatments` - Tạo lịch sử điều trị mới
- `PUT /api/treatments/{treatmentId}` - Cập nhật lịch sử điều trị
- `DELETE /api/treatments/{treatmentId}` - Xóa lịch sử điều trị

## Lưu ý
- Server hiện tại có thể không khả dụng (10.136.83.51:8000)
- Cần kiểm tra lại kết nối và cấu hình server
- API endpoints có thể cần điều chỉnh dựa trên Swagger documentation thực tế 