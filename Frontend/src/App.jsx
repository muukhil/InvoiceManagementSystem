import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './assets/FunctionalComponents/Navbar'
import Home from './assets/FunctionalComponents/Home'
import Signup from './assets/FunctionalComponents/Signup'
import Login from './assets/FunctionalComponents/Login'
import Invoice from './assets/FunctionalComponents/Invoice'
import AddInvoice from './assets/FunctionalComponents/AddInvoice'


const routes = createBrowserRouter([
  {path:'/', element:<Home />},
  {path:'login', element:<Login />},
  {path:'signup', element:<Signup />},
  {path:'invoice', element:<Invoice />},
  {path:'addinvoice', element:<AddInvoice />},
])
const App = () => {
  return (
      <RouterProvider router={routes} /> 
  )
}

export default App