import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"
import Preview from "./pages/Preview"
import Login from "./pages/Login"
import { useDispatch } from "react-redux"
import api from "./configs/api"
import { login, setLoading } from "./app/features/authSlice"
import { useEffect } from "react"


const App = () => {

  const dispatch = useDispatch();                      // Función que permite enviar acciones a Redux
  const getUserData = async () => {
    const token = localStorage.getItem('token');       // Obtenemos el token del localStorage
    try {
      if (token) {
        const { data } = await api.get("/api/user/data", { headers: { Authorization: token } })  // Petición GET al backend para obtener los datos del usuario
        if (data.user) {                                                                         // Si obtenemos los datos del usuario, 
          dispatch(login({ token, user: data.user }))                                            // los enviamos a Redux
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error(error.message);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getUserData()  // Llamamos a la función para obtener los datos del usuario al montar el componente
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App