import {Outlet, Route, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Single from './pages/Single';
import Write from './pages/Write';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './style.scss';



const Layout =()=>{
  return (
      <>
      <NavBar />
      <Outlet />
      <Footer/>
      </>
    
  )
}






function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/home",
          element:<Home/>
        },
        {
          path:"/write",
          element:<Write/>
        },
        {
          path:"/post/:id",
          element:<Single/>
        },
      ]
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "/login",
      element:<Login/>
    }

  ])

  



  return (
  
    <div className='app'>
        <div className="container">
      <RouterProvider router={router} /> 
        </div>
    
    
    </div>

  )
}

export default App;
