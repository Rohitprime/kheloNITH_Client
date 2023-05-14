import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Home from "./components/home/home"
import Login from "./components/log&reg/Login"
import Register from "./components/log&reg/Register"
import RootLayout from "./components/RootLayout"
import SportMain from "./components/sports/SportMain"
import Sports from "./components/sports/Sports"
import Events from "./components/events/Events"
import ProfileLayout from "./components/Profile/ProfileLayout"
import SportEvents from "./components/events/SportEvents"
import Section from "./components/Profile/Section"
import UserProfile from "./components/specific/UserProfile"
import SpecificLayout from "./components/specific/SpecificLayout"
import OneTeam from "./components/specific/OneTeam"
import OneEvent from "./components/specific/OneEvent"
import Genral from "./components/Profile/genral/Genral"
import UpdateSection from "./components/Profile/UpdateSection"
import AllPlayers from "./components/allPlayers/AllPlayers"


const App = ()=>{

  const routes = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
           path:'/login',
           element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
       },
        {
          path:'/sports',
          element:<Sports/>,
        },
        {
          path:'/sports/:sport',
          element:<SportMain/>
        },
      ]
    },
    {
      path:'allPlayers',
      element:<AllPlayers/>
    },
    {
      path:'/profile',
      element:<ProfileLayout/>,
      children:[
        {
          index:true,
          element:<Genral/>
        },
        {
          path:'/profile/:query',
          element:<Section/>
        },
        {
          path:'update/:updateQuery',
          element:<UpdateSection/>
        }
        
      ]
    },
    {
      path:'/events',
      element:<Events/>,
      children:[
        {
          path:'/events/:sport',
          element:<SportEvents/>
        },
        
      ]
    },
    {
      path:'/specific',
      element:<SpecificLayout/>,
      children:[
          
          {
            path:'oneUser/:id',
           element:<UserProfile/>
          },
          {
            path:'oneTeam/:id',
            element:<OneTeam/>
          },
          {
            path:'oneEvent/:id',
            element:<OneEvent/>
          }
      ]
    }
  ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default App