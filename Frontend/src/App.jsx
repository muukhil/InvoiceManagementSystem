import React, {useState} from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './assets/FunctionalComponents/Navbar'
import Home from './assets/FunctionalComponents/Home'
import Signup from './assets/FunctionalComponents/Signup'
import Login from './assets/FunctionalComponents/Login'
import Invoice from './assets/FunctionalComponents/Invoice'
import AddInvoice from './assets/FunctionalComponents/AddInvoice'
import AuthContext from './AuthContext'

const routes = createBrowserRouter([
  {path:'/', element:<Home />},
  {path:'login', element:<Login />},
  {path:'signup', element:<Signup />},
  {path:'invoice', element:<Invoice />},
  {path:'addinvoice', element:<AddInvoice />},
])
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <RouterProvider router={routes} />
      </AuthContext.Provider>
  )
}

export default App