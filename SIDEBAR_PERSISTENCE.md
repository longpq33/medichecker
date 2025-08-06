# Sidebar Collapse Persistence

## Tính năng mới

### **Lưu trạng thái collapse khi reload**

**Mô tả:**
- Trạng thái collapse của sidebar sẽ được lưu vào localStorage
- Khi reload trang, sidebar sẽ giữ nguyên trạng thái collapse trước đó
- Cải thiện user experience với persistent state

**Giải pháp đã áp dụng:**

### **1. Cài đặt zustand persist middleware**
```bash
yarn add zustand
```

### **2. Cập nhật UI store với persist**
```typescript
import { persist } from 'zustand/middleware'

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'vi',
      sidebarCollapsed: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
```

### **3. Tính năng persist**
- **Storage key**: `ui-storage`
- **Persisted data**: 
  - `theme`: Light/dark theme
  - `language`: Current language (vi/en)
  - `sidebarCollapsed`: Sidebar collapse state
- **Auto-save**: Tự động lưu khi state thay đổi
- **Auto-restore**: Tự động khôi phục khi reload

## Kết quả

- ✅ **Persistent state**: Trạng thái collapse được lưu và khôi phục
- ✅ **Better UX**: User không bị mất trạng thái khi reload
- ✅ **Auto-save**: Tự động lưu khi thay đổi
- ✅ **Cross-session**: Trạng thái được giữ qua các session
- ✅ **Không còn lỗi TypeScript**
- ✅ **Build thành công**

## Files đã được sửa

1. **`src/store/index.ts`**
   - Thêm zustand persist middleware
   - Cấu hình storage cho UI state
   - Lưu trạng thái collapse, theme, language

## Tính năng mới

1. **Sidebar Persistence**: Trạng thái collapse được lưu vào localStorage
2. **Theme Persistence**: Theme được lưu và khôi phục
3. **Language Persistence**: Language được lưu và khôi phục
4. **Auto-restore**: Tự động khôi phục state khi reload
5. **Cross-session**: State được giữ qua các session khác nhau

## Cách hoạt động

1. **Khi user toggle sidebar**: State được update và tự động lưu vào localStorage
2. **Khi reload trang**: Zustand tự động khôi phục state từ localStorage
3. **Khi đóng/mở browser**: State vẫn được giữ nguyên
4. **Cross-tab**: State được sync giữa các tab (nếu cùng domain) 