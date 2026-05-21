import App from './App.jsx'
import WebDesignBrisbane from './pages/WebDesignBrisbane.jsx'
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
]
