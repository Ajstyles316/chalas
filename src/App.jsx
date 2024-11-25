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
import LayoutClient from "./Views/PagInterfaz/LayoutClient";
import Transacciones from "./Views/Transacciones/views/Transacciones";
import { UserProvider } from "./Firebase/UserContext";
import ProfileForm from "./Views/Products Module/components/ProfileForm";

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
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingHome />} />
          <Route path="/aboutus" element={<LandingAboutUs />} />
          <Route path="/contact" element={<LandingContact />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/provider" element={<Provider />} /> */}
          <Route path="/registerclient" element={<RegisterClient />} />
          <Route path="/registerprovider" element={<RegisterProvider />} />

          <Route path="/supplier" element={<SupplierProfile />} />
          <Route path="/ClientProvider" element={<ClientProviderView />} />
          <Route path="/DashboardProvider" element={<Sidebar />} />

          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/userList" element={<UsersList />} />
          <Route path="/edit-profile" element={<ProfileForm />} />

          <Route path="/clients" element={<UsersView />} />
          <Route path="/orders" element={<OrdersView />} />
          <Route path="/reports" element={<ReportsView />} />
          <Route path="/events" element={<EventsView />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/clienthome" element={<LayoutClient />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
