import App from './App.jsx'
import WebDesignBrisbane from './pages/WebDesignBrisbane.jsx'
import CustomWebsiteDevelopmentBrisbane from './pages/CustomWebsiteDevelopmentBrisbane.jsx'
import AffordableWebDesignBrisbane from './pages/AffordableWebDesignBrisbane.jsx'
import WebDesignFortitudeValley from './pages/WebDesignFortitudeValley.jsx'
import WebDesignNewFarm from './pages/WebDesignNewFarm.jsx'
import WebDesignNewstead from './pages/WebDesignNewstead.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
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
  {
    path: '/blog',
    element: <Blog />,
    entry: 'src/pages/Blog.jsx',
  },
  {
    path: '/blog/how-much-does-a-website-cost-brisbane-2026',
    element: <BlogPost slug="how-much-does-a-website-cost-brisbane-2026" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/custom-website-vs-wordpress-brisbane',
    element: <BlogPost slug="custom-website-vs-wordpress-brisbane" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/web-design-for-tradies-brisbane',
    element: <BlogPost slug="web-design-for-tradies-brisbane" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/cafe-website-design-brisbane',
    element: <BlogPost slug="cafe-website-design-brisbane" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/improve-google-ranking-brisbane-business',
    element: <BlogPost slug="improve-google-ranking-brisbane-business" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/signs-your-brisbane-website-needs-rebuild',
    element: <BlogPost slug="signs-your-brisbane-website-needs-rebuild" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/what-to-look-for-web-designer-brisbane',
    element: <BlogPost slug="what-to-look-for-web-designer-brisbane" />,
    entry: 'src/pages/BlogPost.jsx',
  },
  {
    path: '/blog/website-speed-matters-brisbane-business',
    element: <BlogPost slug="website-speed-matters-brisbane-business" />,
    entry: 'src/pages/BlogPost.jsx',
  },
]
