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
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import { ProvideContext } from './context/CaptainContext.jsx'
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx';

const router = createBrowserRouter([{
      path: '/',
      element: <App />,
      children: [
          {
            path: '/home',
            element: 
            <UserProtectedWrapper>
            <Home />
            </UserProtectedWrapper>
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
          },
          {
            path: '/users/logout',
            element: 
             <UserProtectedWrapper>
            <UserLogout />
            </UserProtectedWrapper>
          },
          {
            path: '/captain-home',
            element: 
            <CaptainProtectedWrapper>
            <CaptainHome />
            </CaptainProtectedWrapper>
          },
          {
            path: '/captain-logout',
            element: 
            <CaptainProtectedWrapper>
            <CaptainLogout/>
            </CaptainProtectedWrapper>
          },
          {
            path: '/riding',
            element:
            <UserProtectedWrapper>
              <Riding />
            </UserProtectedWrapper>
          }
      ] 
  }      
])

createRoot(document.getElementById('root')).render(
    <ProvideContext>
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider>
    </ProvideContext>
)
