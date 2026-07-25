import { ViteReactSSG } from 'vite-react-ssg'
import { inject } from '@vercel/analytics'
import { routes } from './routes.jsx'

export const createRoot = ViteReactSSG({ routes }, ({ isClient }) => {
  if (isClient) inject()
})
