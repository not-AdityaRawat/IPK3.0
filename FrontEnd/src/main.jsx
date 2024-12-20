import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Components/About";
import Home from "./Pages/Home"
import Contribute from './Components/Contribute.jsx';
import Course from './Pages/Course.jsx';
import SemBranch from './Pages/Sem&Branch.jsx';
import Subjectspage from './Pages/Subjectspage.jsx';
import Unitpage from './Pages/unitpage.jsx';
import NotesnLectures from './Pages/NotesnLectures.jsx';
import Error from './Components/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/Course/:course",
        element:<Course/>
      },
      {
        path:"/Course/:course/:sem",
        element:<SemBranch/>
      },
      {
        path:"/Course/:course/:sem/:Branch",
        element:<SemBranch/>
      },
      {
        path:"/Course/:course/:sem/:Branch/Subjects/",
        element:<Subjectspage/>
      },
      {
        path:"/Course/:course/:sem/:Branch/Subjects/:subject",
        element:<Unitpage/>
      },
      {
        path:"/Course/:course/:sem/:Branch/Subjects/:subject/:unit",
        element:<NotesnLectures/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/Contribute",
        element:<Contribute/>
      },
      {
        path:'*',
        element:<Error/>
      }
    ]

  }
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
  <RouterProvider router={router} />;
  </StrictMode>,
)
