import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from '../pages/Error'
import NotFound from '../pages/NotFound'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Todo from '../pages/Todo'
import ProtectedRoute from '../ProtectedRoute'
import AuthRoute from '../AuthRoute'

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <Error />
  },
  {
    path: '/signup',
    element: (
      <AuthRoute>
        <SignUp />
      </AuthRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '/signin',
    element: (
      <AuthRoute>
        <SignIn />
      </AuthRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '/todo/*',
    element: (
      <ProtectedRoute>
        <Todo />
      </ProtectedRoute>
    ),
    errorElement: <Error />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
