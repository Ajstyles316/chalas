import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeneralContext } from "./context/GeneralContext"; // Importa tu contexto general

import { LandingHome } from "./Views/LandingChalita/views/LandingHome";
import { LandingAboutUs } from "./Views/LandingChalita/views/LandingAboutUs";
import { LandingContact } from "./Views/LandingChalita/views/LandingContact";
import { LoginNew } from "./Views/Users Module/view/LoginNew";
import { RegisterProviderNew } from "./Views/Users Module/view/RegisterProviderNew";

import SupplierProfile from "./Views/Products Module/views/SupplierProfile";
import { UsersList } from "./Views/Users Module/components/UsersList";
import ClientProviderView from "./Views/Products Module/views/ClientProviderView";
import Sidebar from "./Views/Products Module/components/Sidebar";
import { AdminLayout } from "./Views/Admin/layouts/AdminLayout";
import { OrdersView } from "./Views/Admin/views/OrdersView";
import { UsersView } from "./Views/Admin/views/UsersView";
import { ReportsView } from "./Views/Admin/views/ReportsView";
import { EventsView } from "./Views/Admin/views/EventsView";
import LayoutClient from "./Views/Client/Client";
import Transacciones from "./Views/Transacciones/views/Transacciones";
import ProfileForm from "./Views/Products Module/components/ProfileForm";
import { ProtectedRoutes } from "./security/ProtectedRoutes";
import UnauthorizedView from "./Views/Users Module/view/UnauthorizedView";

function App() {
  return (
    <GeneralContext>
      <BrowserRouter>
        <Routes>
          {/* PUBLICO */}
          <Route path="/unauthorized" element={<UnauthorizedView />} />
          <Route path="/" element={<LandingHome />} />
          <Route path="/aboutus" element={<LandingAboutUs />} />
          <Route path="/contact" element={<LandingContact />} />
          <Route path="/login" element={<LoginNew />} />
          <Route path="/registerprovider" element={<RegisterProviderNew />} />
          <Route path="/client-provider/:providerId" element={<ClientProviderView />} />


          {/* PROVEEDORES */}
          <Route
            path="/supplier"
            element={
              <ProtectedRoutes allowedRoles={["provider", "admin"]}>
                <SupplierProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/DashboardProvider"
            element={
              <ProtectedRoutes allowedRoles={["provider", "admin"]}>
                <Sidebar />
              </ProtectedRoutes>
            }
          />
          <Route path="/edit-profile" element={<ProfileForm />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/userList"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <UsersList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <UsersView />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <OrdersView />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <ReportsView />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <EventsView />
              </ProtectedRoutes>
            }
          />

          {/* CLIENTES Y ADMIN */}
          <Route path="/clienthome" element={<LayoutClient />} />
          <Route path="/transacciones" element={<Transacciones />} />
        </Routes>
      </BrowserRouter>
    </GeneralContext>
  );
}

export default App;
