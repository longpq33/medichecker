import { createBrowserRouter } from 'react-router-dom'
import { MainLayout, LoginLayout } from '@/layouts'
import { HomePage, LoginPage, PatientList, MedicineList, PatientDetail, AddTreatment } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'patients',
        element: <PatientList />,
      },
      {
        path: 'patients/:id',
        element: <PatientDetail />,
      },
      {
        path: 'patients/:id/add-treatment',
        element: <AddTreatment />,
      },
      {
        path: 'medicines',
        element: <MedicineList />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]) 