import React from 'react'

const ProjectForm = ({ data, onChange }) => {

  const addProject = () => {
    const newProject = {                                    // Se crea un nuevo objeto project vacio
      name: "",
      type: "",
      description: "",
    }

    onChange([...data, newProject]);                         // Se actualiza el estado con el nuevo objeto de project
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index))             // Se actualiza el estado eliminando el project en el indice especificado
  }

  const updateProject = (index, field, value) => {
    const updated = [...data];                               // Se crea una copia del array de project
    updated[index] = { ...updated[index], [field]: value }   // Se actualiza el campo especificado en el indice especificado
    onChange(updated)                                        // Se actualiza el estado con el project modificado
  }

  // Flujo: Escribimos algo en el input -> onChange -> updateProject -> Clona la data y actualiza el campo -> onChange (del father) -> Se actualiza el estado del padre -> re renderizacion del componente padre ->ProjectForm recibe la data actualizada


  return (
    <div>ProjectForm</div>
  )
}

export default ProjectForm