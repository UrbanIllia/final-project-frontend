import { lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/Layout/Layout'
import NotFound from './components/NotFound/NotFound'

import { fetchUserThunk } from './redux/operations/userOperation'
import { useDispatch } from 'react-redux'
import { setAuthHeader } from './axiosConfig/Api'
import { refreshUserThunk } from './redux/operations/authOperations'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import RestrictedRoute from './routes/RestrictedRoute/RestrictedRoute'

const MainPage = lazy(() => import('./pages/MainPage/MainPage'))
const RecipeViewPage = lazy(() =>
	import('./pages/RecipeViewPage/RecipeViewPage')
)
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'))
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'))

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const persistAuth = localStorage.getItem('persist:auth')
		let accessToken = null

		if (persistAuth) {
			try {
				const authState = JSON.parse(persistAuth)
				accessToken = JSON.parse(authState.accessToken)
			} catch (e) {
				console.error('Error parsing persisted auth', e)
			}
		}

		if (accessToken) {
			dispatch(refreshUserThunk())
				.unwrap()
				.then(({ accessToken: newToken }) => {
					setAuthHeader(newToken)
					dispatch(fetchUserThunk())
				})
				.catch(() => {
					console.log('No access token and refresh failed')
				})
			setAuthHeader(accessToken)
		}
	}, [dispatch])

	return (
		<div>
			<ToastContainer
				position='top-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				style={{ zIndex: 9999 }}
			/>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<MainPage />} />

						<Route path='/recipes/:id' element={<RecipeViewPage />} />

						<Route
							path='/add-recipe'
							element={
								<PrivateRoute>
									<AddRecipePage />
								</PrivateRoute>
							}
						/>

						<Route
							path='/profile/:recipeType?'
							element={
								<PrivateRoute>
									<ProfilePage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/auth/:authType'
							element={
								<RestrictedRoute>
									<AuthPage />
								</RestrictedRoute>
							}
						/>

						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
