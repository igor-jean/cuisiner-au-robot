import './App.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Recherche from './components/Recherche'
import RobotChoisi from './components/recherche-components/RobotChoisi'
import Categories from './components/recherche-components/Categories'
import ListeRecette from './components/recherche-components/ListeRecette'

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
        path: ':id',
        element: <RobotChoisi/>
      },
      {
        path: 'robot/:robot/categories',
        element: <Categories/>,
      },
      {
        path: 'robot/:robot/categories/recherche/:categorie',
        element: <ListeRecette/>,
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
