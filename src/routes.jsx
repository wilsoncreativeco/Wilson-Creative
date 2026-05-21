import App from './App.jsx'
import WebDesignBrisbane from './pages/WebDesignBrisbane.jsx'
import CustomWebsiteDevelopmentBrisbane from './pages/CustomWebsiteDevelopmentBrisbane.jsx'
import AffordableWebDesignBrisbane from './pages/AffordableWebDesignBrisbane.jsx'
import WebDesignFortitudeValley from './pages/WebDesignFortitudeValley.jsx'
import WebDesignNewFarm from './pages/WebDesignNewFarm.jsx'
import WebDesignNewstead from './pages/WebDesignNewstead.jsx'
import './App.css'

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
  },
  {
    path: '/web-design-brisbane',
    element: <WebDesignBrisbane />,
    entry: 'src/pages/WebDesignBrisbane.jsx',
  },
  {
    path: '/custom-website-development-brisbane',
    element: <CustomWebsiteDevelopmentBrisbane />,
    entry: 'src/pages/CustomWebsiteDevelopmentBrisbane.jsx',
  },
  {
    path: '/affordable-web-design-brisbane',
    element: <AffordableWebDesignBrisbane />,
    entry: 'src/pages/AffordableWebDesignBrisbane.jsx',
  },
  {
    path: '/web-design-fortitude-valley',
    element: <WebDesignFortitudeValley />,
    entry: 'src/pages/WebDesignFortitudeValley.jsx',
  },
  {
    path: '/web-design-new-farm',
    element: <WebDesignNewFarm />,
    entry: 'src/pages/WebDesignNewFarm.jsx',
  },
  {
    path: '/web-design-newstead',
    element: <WebDesignNewstead />,
    entry: 'src/pages/WebDesignNewstead.jsx',
  },
]
