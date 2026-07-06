import React from 'react'

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {                                  // Se crea un nuevo objeto de educación vacio
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    }

    onChange([...data, newEducation]);                      // Se actualiza el estado con el nuevo objeto de education
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index))             // Se actualiza el estado eliminando la educación en el indice especificado
  }

  const updateEducation = (index, field, value) => {
    const updated = [...data];                               // Se crea una copia del array de education
    updated[index] = { ...updated[index], [field]: value }   // Se actualiza el campo especificado en el indice especificado
    onChange(updated)                                        // Se actualiza el estado con la educación modificada
  }

  // Flujo: Escribimos algo en el input -> onChange -> updateEducation -> Clona la data y actualiza el campo -> onChange (del father) -> Se actualiza el estado del padre -> re renderizacion del componente padre ->EducationForm recibe la data actualizada

  return (
    <div>EducationForm</div>
  )
}

export default EducationForm