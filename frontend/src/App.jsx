import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'


export default function App() {
  const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
						{
							index: true,
							element: < Home />,
						},
						{
							path: '/login',
							element: < Login />,
						},
						{
							path: '/profile',
							element: < Profile />,
						},
						{
							path: '*',
							element: < Home />,
						},
				]
		}
	],
	{
      // clé: fait fonctionner l'app sous /ROLLAND_GRELLETY_Carole_13_argentbank_072025/
      basename: import.meta.env.BASE_URL,
    });
	return <RouterProvider router={router} />;
}

