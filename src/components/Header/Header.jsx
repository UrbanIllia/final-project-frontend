import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../Logo/Logo'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import Navigation from './Navigation/Navigation'
import css from './Header.module.css'
import { logoutUserThunk } from '../../redux/operations/authOperations'
import { toast } from 'react-toastify'
import { selectAuthIsLoggedIn } from '../../redux/selectors/authSelector'

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false)
	const isLoggedIn = useSelector(selectAuthIsLoggedIn)
	const userName = useSelector(state => state.user.user.name)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await dispatch(logoutUserThunk()).unwrap()
			toast.success('Logout successful!')
		} catch (error) {
			toast.error('Logout error: ' + error)
		} finally {
			setMenuOpen(false)
			navigate('/')
		}
	}

	return (
		<header className={css.header}>
			<div className={css.container}>
				<Logo />
				<BurgerMenu open={menuOpen} setOpen={setMenuOpen} />

				<div className={css.desktopNav}>
					<Navigation
						isLoggedIn={isLoggedIn}
						closeMenu={() => {}}
						userName={userName}
						onLogout={handleLogout}
						isMobile={false}
					/>
				</div>
			</div>

			{menuOpen && (
				<div className={`${css.mobileMenu} ${css.open}`}>
					<Navigation
						isLoggedIn={isLoggedIn}
						closeMenu={() => setMenuOpen(false)}
						userName={userName}
						onLogout={handleLogout}
						isMobile={true}
					/>
				</div>
			)}
		</header>
	)
}
