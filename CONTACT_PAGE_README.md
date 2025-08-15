# Trang Contact - MediChecker

## Tổng quan
Trang Contact mới đã được thêm vào hệ thống MediChecker với các tính năng:

### 🎯 Tính năng chính
1. **Slide giới thiệu website** - 4 slides tự động chuyển đổi
2. **Thông tin đội ngũ** - Giới thiệu thành viên nhóm
3. **Tính năng hệ thống** - 4 card giới thiệu tính năng chính
4. **Thông tin liên hệ** - Email, GitHub, LinkedIn

### 👥 Thành viên nhóm
- **Long PQ** - Full Stack Developer
- **Tuyen TV** - Backend Developer

### 🚀 Cách sử dụng

#### 1. Truy cập trang Contact
- Click vào menu "Liên hệ" trong sidebar
- Hoặc truy cập trực tiếp: `/contact`

#### 2. Navigation
- Sử dụng nút "Quay lại" để quay về trang trước
- Menu được highlight khi đang ở trang Contact

#### 3. Đa ngôn ngữ
- Hỗ trợ tiếng Việt và tiếng Anh
- Tự động chuyển đổi theo ngôn ngữ hiện tại

### 🎨 Thiết kế UI/UX

#### Slide giới thiệu
- **Slide 1**: Chăm sóc sức khỏe thông minh
- **Slide 2**: An toàn và chính xác  
- **Slide 3**: Công nghệ tiên tiến
- **Slide 4**: Đội ngũ chuyên nghiệp

#### Responsive Design
- Tối ưu cho desktop, tablet và mobile
- Grid layout tự động điều chỉnh
- Hover effects và animations mượt mà

### 🔧 Cấu trúc code

#### Files chính
```
src/pages/ContactPage/
├── index.tsx          # Component chính
├── styled.ts          # Styled components
└── index.ts           # Export
```

#### Dependencies
- Ant Design (Card, Carousel, Avatar, etc.)
- Styled Components
- React Router
- i18n (đa ngôn ngữ)

### 📱 Responsive Breakpoints
- **Desktop**: > 1200px - 4 columns
- **Tablet**: 768px - 1200px - 2 columns  
- **Mobile**: < 768px - 1 column

### 🌐 Đa ngôn ngữ

#### Tiếng Việt
- Menu: "Liên hệ"
- Tiêu đề: "Liên hệ với chúng tôi"
- Mô tả: "Khám phá về MediChecker và gặp gỡ đội ngũ phát triển"

#### Tiếng Anh  
- Menu: "Contact"
- Tiêu đề: "Contact Us"
- Mô tả: "Discover MediChecker and meet our development team"

### 🎯 Tính năng tương lai
- Form liên hệ trực tiếp
- Chat support
- Social media integration
- Newsletter subscription

### 🐛 Troubleshooting

#### Lỗi thường gặp
1. **Import errors**: Kiểm tra đường dẫn tương đối
2. **TypeScript errors**: Chạy `npm run type-check`
3. **Build errors**: Chạy `npm run build`

#### Kiểm tra hoạt động
1. Chạy `npm run dev`
2. Truy cập `/contact`
3. Kiểm tra responsive design
4. Test đa ngôn ngữ

### 📝 Changelog
- **v1.0.0**: Tạo trang Contact với slide giới thiệu
- **v1.0.1**: Thêm thông tin thành viên nhóm
- **v1.0.2**: Tối ưu responsive design
- **v1.0.3**: Hỗ trợ đa ngôn ngữ hoàn chỉnh
