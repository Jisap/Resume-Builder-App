import { Plus } from "lucide-react"


const ExperienceForm = ({ data, onChange }) => {

  const addExperience = () => {
    const newExperience = {                                  // Se crea un nuevo objeto de experiencia vacio
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    }

    onChange([...data, newExperience]);                      // Se actualiza el estado con el nuevo objeto de experiencia
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index))             // Se actualiza el estado eliminando la experiencia en el indice especificado
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data];                               // Se crea una copia del array de experiencias
    updated[index] = { ...updated[index], [field]: value }   // Se actualiza el campo especificado en el indice especificado
    onChange(updated)                                        // Se actualiza el estado con la experiencia modificada
  }

  return (
    <div className="space-y-6">
      <div className='flex items-center justify-between'>
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>

          <p className='text-sm text-gray-500'>
            Add your job experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disablec:opacity-50'
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>


    </div>
  )
}

export default ExperienceForm