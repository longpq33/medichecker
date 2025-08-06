# Menu Collapse Fixes

## Vấn đề đã được sửa

### **Lỗi menu không highlight đúng khi collapse**

**Nguyên nhân:**
- Menu sử dụng `defaultSelectedKeys` thay vì `selectedKeys`
- Không track current route để highlight đúng menu item
- CSS cho collapsed state không highlight icon đúng cách

**Giải pháp đã áp dụng:**

### **1. Cải thiện menu selection logic**
```typescript
// Thêm useLocation để track current route
const location = useLocation()

// Get current selected key based on location
const getSelectedKey = () => {
  const pathname = location.pathname
  if (pathname === '/') return ['/']
  if (pathname.startsWith('/patients')) return ['/patients']
  if (pathname.startsWith('/medicines')) return ['/medicines']
  return ['/']
}

// Sử dụng selectedKeys thay vì defaultSelectedKeys
<Menu
  mode="inline"
  selectedKeys={getSelectedKey()}
  items={menuItems}
  style={{ flex: 1, background: 'transparent' }}
/>
```

### **2. Cải thiện CSS cho collapsed state**
```css
&.ant-layout-sider-collapsed {
  .ant-menu-item {
    margin: 4px 8px !important;
    width: calc(100% - 16px) !important;
    max-width: calc(100% - 16px) !important;
    padding: 0 !important;
    text-align: center !important;
    justify-content: center !important;
    border-radius: 8px !important;
  }
  
  .ant-menu-item .anticon {
    margin-right: 0 !important;
    font-size: 18px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
  
  .ant-menu-item-selected .anticon {
    color: #ffffff !important;
  }
  
  .ant-menu-item-selected {
    background: rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
  }
}
```

## Kết quả

- ✅ **Menu highlight đúng**: Icon được highlight đúng khi collapse
- ✅ **Route tracking**: Menu track current route chính xác
- ✅ **Visual feedback**: Icon có màu sắc đúng khi selected
- ✅ **Smooth transitions**: Animation mượt mà khi collapse/expand
- ✅ **Không còn lỗi TypeScript**
- ✅ **Build thành công**

## Files đã được sửa

1. **`src/layouts/MainLayout/index.tsx`**
   - Thêm useLocation để track current route
   - Thêm getSelectedKey function
   - Sử dụng selectedKeys thay vì defaultSelectedKeys

2. **`src/layouts/MainLayout/styled.ts`**
   - Cải thiện CSS cho collapsed state
   - Thêm highlight cho selected icon
   - Cải thiện visual feedback

## Tính năng mới

1. **Perfect Menu Highlight**: Menu highlight đúng route khi collapse
2. **Route Tracking**: Menu tự động track current route
3. **Visual Feedback**: Icon có màu sắc đúng khi selected
4. **Better UX**: User experience tốt hơn với visual feedback rõ ràng 