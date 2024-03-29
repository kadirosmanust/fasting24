import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/components/Layout';
import Home from '@/pages/home';
import Register from '@/pages/register';
import store from '@/store';

import AuthorizedWrapper from './components/HOCs/AuthorizedWrapper';
import ErrorBoundary from './components/HOCs/ErrorBoundary';
import MyFastings from './pages/myFastings';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthorizedWrapper>
            <Home />
          </AuthorizedWrapper>
        ),
      },
      {
        path: 'fastings',
        element: <MyFastings />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
