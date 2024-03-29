import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';

import Layout from '@/components/Layout';
import Register from '@/pages/register';
import Home from '@/pages/home';

import AuthorizedWrapper from './components/HOCs/AuthorizedWrapper';
import MyFastings from './pages/myFastings';
import ErrorBoundary from './components/HOCs/ErrorBoundary';

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
