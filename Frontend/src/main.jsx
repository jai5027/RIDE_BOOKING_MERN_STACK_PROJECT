import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from './pages/Start.jsx';
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import { UserProvider } from './context/userContext.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([{
      path: '/',
      element: <App />,
      children: [
          {
            path: '/home',
            element: <Home />
          },
          {
            index: true,
            element: <Start />
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
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider>
)
