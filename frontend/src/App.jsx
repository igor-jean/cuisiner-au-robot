import './App.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Recherche from './components/Recherche'
import RobotChoisi from './components/recherche-components/RobotChoisi'

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
    }  
  ])


  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
