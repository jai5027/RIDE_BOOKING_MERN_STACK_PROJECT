import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx';
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'

const router = createBrowserRouter([{
      path: '/',
      element: <App />,
      children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: '/login',
            element: <UserLogin />
          },
          {
            path: '/signup',
            element: <UserSignup />
          },
          {
            path: '/captain-login',
            element: <CaptainLogin />
          },
          {
            path: '/captain-signup',
            element: <CaptainSignup />
          }
      ] 
  }      
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>

)
