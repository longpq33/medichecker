import { createBrowserRouter } from 'react-router-dom'
import { MainLayout, LoginLayout } from '@/layouts'
import { HomePage, LoginPage, PatientList, MedicineList, PatientDetail, AddTreatment, PrescriptionList, PrescriptionDetail, MedicineDetail, ContactPage } from '@/pages'

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
      {
        path: 'medicines/:id',
        element: <MedicineDetail />,
      },
      {
        path: 'prescriptions',
        element: <PrescriptionList />,
      },
      {
        path: 'prescriptions/:id',
        element: <PrescriptionDetail />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
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