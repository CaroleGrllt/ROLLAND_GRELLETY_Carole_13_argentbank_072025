import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/layout.jsx'
// import Home from './pages/Home';


// function NavigateTo() {
// 	// const userId = '12';
// 	// return (
// 		// <Navigate
// 		// 	to={`/user/${userId}`}
// 		// 	replace
// 		// />
// 	// );
// }

export default function App() {
  const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			// children: [
			// 			{
			// 				index: true,
			// 				element: <NavigateTo />,
			// 			},
			// 			{
			// 				path: '/user',
			// 				element: <NavigateTo />,
			// 			},
			// 			{
			// 				path: '/user/:id',
			// 				element: <Home />,
			// 				errorElement: <NavigateTo />
			// 			},
			// 			{
			// 				path: '*',
			// 				element: <NavigateTo />,
			// 			},
			// 	]
		}
	]);

	return <RouterProvider router={router} />;
}

