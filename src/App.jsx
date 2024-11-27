import "./App.css";
import { useState, useEffect } from "react";
import { LandingHome } from "./Views/LandingChalita/views/LandingHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingAboutUs } from "./Views/LandingChalita/views/LandingAboutUs";
import { LandingContact } from "./Views/LandingChalita/views/LandingContact";
import { Login } from "./Views/Users Module/view/Login";
import { RegisterClient } from "./Views/Users Module/view/RegisterClient";
import { RegisterProvider } from "./Views/Users Module/view/RegisterProvider";

import SupplierProfile from "./Views/Products Module/views/SupplierProfile";

// !Imports for firebase modules
import appFirebase from "./Firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UsersList } from "./Views/Users Module/components/UsersList";


import ClientProviderView from "./Views/Products Module/views/ClientProviderView";

import Sidebar from "./Views/Products Module/components/Sidebar";
import { AdminLayout } from "./Views/Admin/layouts/AdminLayout";
import { OrdersView } from "./Views/Admin/views/OrdersView";
import { UsersView } from "./Views/Admin/views/UsersView";
import { ReportsView } from "./Views/Admin/views/ReportsView";
import { EventsView } from "./Views/Admin/views/EventsView";
import ClientOld from "./Views/PagInterfaz/LayoutClient";
import LayoutClient from "./Views/Client/Client";
import Transacciones from "./Views/Transacciones/views/Transacciones";
import { UserProvider } from "./Firebase/UserContext";
import ProfileForm from "./Views/Products Module/components/ProfileForm";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./security/ProtectedRoutes";
import UnauthorizedView from "./Views/Users Module/view/UnauthorizedView";
import { LoginNew } from "./Views/Users Module/view/LoginNew";

function App() {
  const auth = getAuth(appFirebase);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);


  return (
    <AuthProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* PUBLICO */}
            <Route path="/unauthorized" element={<UnauthorizedView />} />
            <Route path="/" element={<LandingHome />} />
            <Route path="/aboutus" element={<LandingAboutUs />} />
            <Route path="/contact" element={<LandingContact />} />
            <Route path="/login" element={<LoginNew />} />
            <Route path="/registerprovider" element={<RegisterProvider />} />
            <Route path="/ClientProvider" element={<ClientProviderView />} />


            {/* PROVVEDORORES */}
            {/* <Route element={<ProtectedRoutes allowedRoles={['provider']} />}> */}
            <Route path="/supplier" element={
              <ProtectedRoutes allowedRoles={['provider', 'admin']}>
                <SupplierProfile />
              </ProtectedRoutes>
            } />
            <Route path="/DashboardProvider" element={
              <ProtectedRoutes allowedRoles={['provider', 'admin']}>
                <Sidebar />
              </ProtectedRoutes>
            } />
            <Route path="/edit-profile" element={<ProfileForm />} />
            {/* </Route> */}

            {/* ADMINROUTES */}
            {/* <Route element={<ProtectedRoutes allowedRoles={['admin']} />}> */}
            <Route path="/admin" element={
              <ProtectedRoutes allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoutes>
            } />
            <Route path="/userList" element={
              <ProtectedRoutes allowedRoles={['admin']}>
                <UsersList />
              </ProtectedRoutes>
            } />
            <Route path="/clients" element={
              <ProtectedRoutes allowedRoles={['admin']}>
                <UsersView />
              </ProtectedRoutes>
            } />
            <Route path="/orders" element={
              <ProtectedRoutes allowedRoles={['admin']}>
                <OrdersView />
              </ProtectedRoutes>
            } />
            <Route path="/reports" element={
              <ProtectedRoutes allowedRoles={['admin']}>
                <ReportsView />
              </ProtectedRoutes>
            } />
            <Route path="/events" element={
              <ProtectedRoutes allowedRoles={['admin']}>
                <EventsView />
              </ProtectedRoutes>
            } />
            {/* </Route> */}

            {/* </ProtectedRoutes> */}

            {/* Rutas protegidas para CLIENTES y ADMIN */}

            <Route path="/clienthome" element={
              // <ProtectedRoutes allowedRoles={['client', 'admin']}>
                <LayoutClient />
              //</ProtectedRoutes> 
            } />
            <Route path="/transacciones" element={<Transacciones />} />

          </Routes>

        </UserProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;