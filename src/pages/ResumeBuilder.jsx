import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Download, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummary from '../components/ProfessionalSummary';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';

const ResumeBuilder = () => {

  const { resumeId } = useParams(); // id desde los params de la url

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)          // se carga el resume encontrado con el id
      document.title = resume.title  // Cambio de nombre de la pestaña del navegador
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]


  useEffect(() => {
    loadExistingResume()
  }, [resumeId]);

  const changeResumeVisibility = async () => {
    setResumeData(prev => ({ ...prev, public: !prev.public }))
  }

  const handleShare = () => {
    const frontendURL = window.location.href.split('/app/')[0]; // Obtiene la url base eliminando '/app/'
    const resumeUrl = frontendURL + "/view/" + resumeId;        // Construye la url del resume publico 

    if (navigator.share) {                                      // Si el navegador soporta el metodo share
      navigator.share({ url: resumeUrl, text: "My Resume", })   // Comparte la url del resume publico 
    } else {                                                    // Si el navegador no soporta el metodo share
      alert('Share not supported on this browser.')             // Muestra una alerta con el mensaje de error
    }
  };

  const downloadResume = () => {
    window.print()
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-6'>
      <div>
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className='size-4' /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-200'
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }}
              />

              {/* Section Navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                <div className='flex items-center gap-2'>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}                                   // Template asociado al id del resume
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}  // setter para cambiar el template en el resume
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} // setter para cambiar el color de acento en el resume
                  />
                </div>

                {/* Botones para navegar entre secciones */}
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(prevIndex => Math.max(prevIndex - 1, 0))}
                      disabled={activeSectionIndex === 0}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                    >
                      <ChevronLeft className='size-4' />
                    </button>
                  )}
                  <button
                    onClick={() => setActiveSectionIndex(prevIndex => Math.max(prevIndex + 1, 0))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`
                        flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all
                        ${activeSectionIndex === sections.length - 1 && 'opacity-50'}  
                      `}
                  >
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => { setResumeData(prev => ({ ...prev, personal_info: data })) }} // setter para cambiar la info personal del autor del resume
                    setResumeData={setResumeData}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} // setter para cambiar la info professional del resume
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} // setter para cambiar la experiencia profesional del resume
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} // setter para cambiar la educación profesional del resume
                  />
                )}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} // setter para cambiar los proyectos profesionales del resume
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} // setter para cambiar las habilidades profesionales del resume
                  />
                )}
              </div>

              <button
                className='bg-gradient-to-br from-green-100 to-green-200 rinf-grren-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute -top-10 bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button
                    className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'
                    onClick={handleShare}
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>

                <button
                  onClick={downloadResume}
                  className='flex items-center p-2 px-6 py-2 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <Download className='size-4' /> Download
                </button>
              </div>
            </div>

            {/* Resume preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              removeBackground={removeBackground}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder