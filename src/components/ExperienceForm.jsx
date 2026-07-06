import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react"


const ExperienceForm = ({ data, onChange }) => {             // Se recibe la experience del resume y el setter para cambiarla

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

  // Flujo: Escribimos algo en el input -> onChange -> updateExperience -> Clona la data y actualiza el campo -> onChange (del father) -> Se actualiza el estado del padre -> ExperienceForm recibe la data actualizada

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
          className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disablec:opacity-50'
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4>
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-color">
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={experience.company || ""}
                  placeholder="Company Name"
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="text"
                  value={experience.position || ""}
                  placeholder="Job Title"
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="month"
                  value={experience.end_date || ""}
                  disabled={experience.is_current}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked ? true : false)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">Currently working here</span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Job Description</label>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disable:opacity-50">
                    <Sparkles className="size-3" />
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your key responsabilities and achievements..."
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm