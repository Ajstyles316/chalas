import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createProfileProvider } from "/src/Firebase/api.js";

import "../Styles/profileForm.css";

const ScheduleSelector = ({ onScheduleChange }) => {
  const [schedule, setSchedule] = useState({
    weekdays: "8h - 21h",
    saturday: "9h - 22h",
    sunday: "9h - 22h",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSchedule = { ...schedule, [name]: value };
    setSchedule(newSchedule);
    onScheduleChange(newSchedule);
  };

  return (
    <div className="schedule-container">
      <label>
        Lun. - Vie.:
        <input
          type="text"
          name="weekdays"
          value={schedule.weekdays}
          onChange={handleChange}
        />
      </label>
      <label>
        Sáb.:
        <input
          type="text"
          name="saturday"
          value={schedule.saturday}
          onChange={handleChange}
        />
      </label>
      <label>
        Dom.:
        <input
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
  } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [schedule, setSchedule] = useState(null);

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

      await createProfileProvider(profileData, profileImage);

      console.log("Perfil registrado con éxito");
    } catch (error) {
      console.error("Error al registrar el perfil:", error);
    }
  };

  const uploadImage = async (file) => {
    // Implementación del manejo de imágenes
    return file; // Cambiar esto con el URL generado
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <h1>Registro de Perfil</h1>

        <label htmlFor="profileImage">Foto de Perfil</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label htmlFor="companyName">Nombre de la empresa</label>
        <input type="text" {...register("companyName", { required: true })} />
        {errors.companyName && <span>Este campo es obligatorio</span>}

        <label htmlFor="firstName">Nombres</label>
        <input type="text" {...register("firstName", { required: true })} />
        {errors.firstName && <span>Este campo es obligatorio</span>}

        <label htmlFor="lastName">Apellidos</label>
        <input type="text" {...register("lastName", { required: true })} />
        {errors.lastName && <span>Este campo es obligatorio</span>}

        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span>Este campo es obligatorio</span>}

        <label htmlFor="phone">Número de Teléfono</label>
        <input type="tel" {...register("phone", { required: true })} />
        {errors.phone && <span>Este campo es obligatorio</span>}

        <label htmlFor="zone">Zona</label>
        <input type="text" {...register("zone", { required: true })} />
        {errors.zone && <span>Este campo es obligatorio</span>}

        <label htmlFor="street">Calle</label>
        <input type="text" {...register("street", { required: true })} />
        {errors.street && <span>Este campo es obligatorio</span>}

        <label htmlFor="doorNumber">Número de Puerta</label>
        <input type="text" {...register("doorNumber", { required: true })} />
        {errors.doorNumber && <span>Este campo es obligatorio</span>}

        <ScheduleSelector onScheduleChange={setSchedule} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ProfileForm;
