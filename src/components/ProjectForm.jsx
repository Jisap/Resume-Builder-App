import { Plus, Trash2 } from 'lucide-react';
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
    <div >
      <div className='flex items-center justify-between'>
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className='text-sm text-gray-500'>
            Add your projects.
          </p>
        </div>

        <button
          onClick={addProject}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disablec:opacity-50'
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {data.map((project, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <h4>
                Project #{index + 1}
              </h4>

              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-color">
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                type="text"
                value={project.name || ""}
                placeholder="Project Name"
                onChange={(e) => updateProject(index, "name", e.target.value)}
                className="px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={project.type || ""}
                placeholder="Project Type (e.g., Personal, Academic, Professional)"
                onChange={(e) => updateProject(index, "type", e.target.value)}
                className="px-3 py-2 text-sm "
              />
              <textarea
                rows={4}
                value={project.description || ""}
                placeholder="Describe your project"
                onChange={(e) => updateProject(index, "description", e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg resize-none"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ProjectForm