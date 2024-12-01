import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth"; // Importar el método de autenticación
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Métodos de Firestore
import { db } from "../../../Firebase/config"; // Importa tu configuración de Firebase

import "../Styles/profileForm.css";
import Navbar from "./Navbar";

const ScheduleSelector = ({ onScheduleChange, schedule }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSchedule = { ...schedule, [name]: value };
    onScheduleChange(newSchedule);
  };

  return (
    <div className="schedule-container">
      <label className="profile-form-label">
        Lun. - Vie.:
        <input
          className="profile-form-input"
          type="text"
          name="weekdays"
          value={schedule.weekdays}
          onChange={handleChange}
        />
      </label>
      <label className="profile-form-label">
        Sáb.:
        <input
          className="profile-form-input"
          type="text"
          name="saturday"
          value={schedule.saturday}
          onChange={handleChange}
        />
      </label>
      <label className="profile-form-label">
        Dom.:
        <input
          className="profile-form-input"
          type="text"
          name="sunday"
          value={schedule.sunday}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [schedule, setSchedule] = useState({
    weekdays: "8h - 21h",
    saturday: "9h - 22h",
    sunday: "9h - 22h",
  });

  // Obtener el UID del usuario autenticado
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId) {
        try {
          const docRef = doc(db, "profileProvider", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const profileData = docSnap.data();

            // Prellenar los campos del formulario con los datos de perfil
            setValue("companyName", profileData.companyName);
            setValue("firstName", profileData.firstName);
            setValue("lastName", profileData.lastName);
            setValue("email", profileData.email);
            setValue("phone", profileData.phone);
            setValue("zone", profileData.zone);
            setValue("street", profileData.street);
            setValue("doorNumber", profileData.doorNumber);

            // Establecer horario
            setSchedule(profileData.schedule || schedule);
          } else {
            console.log("No se encontraron datos de perfil para el proveedor");
          }
        } catch (error) {
          console.error("Error al obtener los datos del perfil:", error);
        }
      }
    };

    fetchProfileData();
  }, [userId, setValue]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const profileData = {
        ...data,
        schedule,
      };

      if (userId) {
        // Referencia al documento del perfil en Firestore
        const docRef = doc(db, "profileProvider", userId);

        // Actualizar el documento
        await updateDoc(docRef, profileData);

        console.log("Perfil actualizado con éxito");
      } else {
        console.log("No se pudo encontrar el UID del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <h1>Registro de Perfil</h1>
        <div className="form-profile-container">
          <div className="form-profile-left-side">
            <label className="profile-form-label" htmlFor="companyName">
              Nombre de la empresa
            </label>
            <input
              className="profile-form-input"
              type="text"
              {...register("companyName", { required: true })}
            />
            {errors.companyName && <span>Este campo es obligatorio</span>}

            <label className="profile-form-label" htmlFor="profileImage">
              Foto de Perfil
            </label>
            <input
              className="profile-form-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <label className="profile-form-label" htmlFor="firstName">
              Nombres
            </label>
            <input
              className="profile-form-input"
              type="text"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <span>Este campo es obligatorio</span>}

            <label className="profile-form-label" htmlFor="lastName">
              Apellidos
            </label>
            <input
              className="profile-form-input"
              type="text"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <span>Este campo es obligatorio</span>}

            <label className="profile-form-label" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="profile-form-input"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Este campo es obligatorio</span>}

            <label className="profile-form-label" htmlFor="phone">
              Número de Teléfono
            </label>
            <input
              className="profile-form-input"
              type="tel"
              {...register("phone", { required: true })}
            />
            {errors.phone && <span>Este campo es obligatorio</span>}
          </div>
          <div className="form-profile-right-side">
            <label className="profile-form-label" htmlFor="zone">
              Zona
            </label>
            <input
              className="profile-form-input"
              type="text"
              {...register("zone", { required: true })}
            />
            {errors.zone && <span>Este campo es obligatorio</span>}

            <label className="profile-form-label" htmlFor="street">
              Calle
            </label>
            <input
              className="profile-form-input"
              type="text"
              {...register("street", { required: true })}
            />
            {errors.street && <span>Este campo es obligatorio</span>}

            <label className="profile-form-label" htmlFor="doorNumber">
              Número de Puerta
            </label>
            <input
              className="profile-form-input"
              type="text"
              {...register("doorNumber", { required: true })}
            />
            {errors.doorNumber && <span>Este campo es obligatorio</span>}

            <ScheduleSelector
              onScheduleChange={setSchedule}
              schedule={schedule}
            />
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ProfileForm;
