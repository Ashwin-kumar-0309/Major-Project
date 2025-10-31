import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

// Home & Auth Pages (existing - will migrate)
import Home from './components/home/Home'
import Login from './components/home/Login'
import AdminLogin from './components/pages/AdminLogin'
import ManufacturerLogin from './components/pages/ManufacturerLogin'
import RetailerLogin from './components/pages/RetailerLogin'
import ConsumerLogin from './components/pages/ConsumerLogin'
import SupplierLogin from './components/pages/SupplierLogin'
import AddAccount from './components/pages/AddAccount'

// Role-Specific Dashboards
import Admin from './components/pages/Admin'
import Consumer from './components/pages/Consumer'
import Manufacturer from './components/pages/Manufacturer'
import Supplier from './components/pages/Supplier'
import Retailer from './components/pages/Retailer'

// Pages
import ScannerPage from './components/pages/ScannerPage'
import Product from './components/pages/Product'
import AuthenticProduct from './components/pages/AuthenticProduct'
import FakeProduct from './components/pages/FakeProduct'
import Profile from './components/pages/Profile'
import AddProduct from './components/pages/AddProduct'
import UpdateProduct from './components/pages/UpdateProduct'
import UpdateProductDetails from './components/pages/UpdateProductDetails'
import ViewProducts from './components/pages/ViewProducts'
import ManufacturerComplaints from './components/pages/ManufacturerComplaints'
import RetailerProducts from './components/pages/RetailerProducts'
import ManageAccount from './components/pages/ManageAccount'
import CompanyDetails from './components/pages/CompanyDetails'

// Layout & Protection
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="login/admin" element={<AdminLogin />} />
          <Route path="login/manufacturer" element={<ManufacturerLogin />} />
          <Route path="login/retailer" element={<RetailerLogin />} />
          <Route path="login/supplier" element={<SupplierLogin />} />
          <Route path="login/consumer" element={<ConsumerLogin />} />
          <Route path="scanner" element={<ScannerPage />} />
          <Route path="product" element={<Product />} />
          <Route path="authentic-product" element={<AuthenticProduct />} />
          <Route path="fake-product" element={<FakeProduct />} />

          {/* Admin Routes */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="add-account" element={<AddAccount />} />
            <Route path="manage-account" element={<ManageAccount />} />
            <Route path="company-details/:username" element={<CompanyDetails />} />
          </Route>

          {/* Shared Routes for Manufacturer, Supplier, Retailer */}
          <Route element={<RequireAuth allowedRoles={['manufacturer', 'supplier', 'retailer']} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="update-product" element={<UpdateProduct />} />
            <Route path="update-product-details" element={<UpdateProductDetails />} />
          </Route>

          {/* Manufacturer Routes */}
          <Route element={<RequireAuth allowedRoles={['manufacturer']} />}>
            <Route path="manufacturer" element={<Manufacturer />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="view-products" element={<ViewProducts />} />
            <Route path="manufacturer-complaints" element={<ManufacturerComplaints />} />
          </Route>

          {/* Supplier Routes */}
          <Route element={<RequireAuth allowedRoles={['supplier']} />}>
            <Route path="supplier" element={<Supplier />} />
          </Route>

          {/* Retailer Routes */}
          <Route element={<RequireAuth allowedRoles={['retailer']} />}>
            <Route path="retailer" element={<Retailer />} />
            <Route path="retailer-products" element={<RetailerProducts />} />
          </Route>

          {/* Consumer Routes */}
          <Route element={<RequireAuth allowedRoles={['consumer']} />}>
            <Route path="consumer" element={<Consumer />} />
            <Route path="consumer/products/:serialNumber" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
