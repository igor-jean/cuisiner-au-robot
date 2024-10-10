import './App.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Recherche from './components/Recherche'
import RobotChoisi from './components/recherche-components/RobotChoisi'
import Login from './components/login/login'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/recherche',
      element: <Recherche/>,
      children: [
        {
        path: ':robot',
        element: <RobotChoisi/>
      }
    ]
    },
    {
      path: '/login',
      element: <Login/>,
    },
  ])


  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
