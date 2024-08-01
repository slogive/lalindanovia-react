import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Space } from 'antd'
import dayJS from 'dayjs'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { v6 as UUID } from 'uuid'

import { FORM_PROPS } from './consts/form'

import './App.scss'

// Data

const PRODUCTS = [
	{
		id: '49f7548f-d912-4642-b916-0654542a1cef',
		title: 'Yeast - Fresh, Fleischman',
		description: '2XL',
		price: '$19.34',
		stock: 9,
	},
	{
		id: '05a015dd-45a7-43a0-abb5-1a85cade2ac0',
		title: 'Mushroom - Lg - Cello',
		description: 'XL',
		price: '$29.72',
		stock: 49,
	},
	{
		id: '93aabf6d-f53d-4de8-b4a8-1b29163774cd',
		title: 'Tart Shells - Savory, 3',
		description: 'S',
		price: '$61.50',
		stock: 92,
	},
	{
		id: '1ea3dfdc-37a0-4f37-b4c8-61eff3d143cb',
		title: 'Beer - Muskoka Cream Ale',
		description: 'XS',
		price: '$60.77',
		stock: 44,
	},
	{
		id: '79808a8b-768e-4a2a-b26e-689bebd34135',
		title: 'Sausage - Blood Pudding',
		description: 'M',
		price: '$83.66',
		stock: 50,
	},
	{
		id: 'd4daeb07-17fd-49b7-b79e-6f40fe4cb29f',
		title: 'Lobster - Cooked',
		description: '2XL',
		price: '$44.25',
		stock: 28,
	},
	{
		id: 'bb1587ff-ef66-49bf-8f6b-d9c1cc48b6c3',
		title: 'Shrimp - Tiger 21/25',
		description: 'XL',
		price: '$36.97',
		stock: 44,
	},
	{
		id: 'cbe8ddee-e56c-4e0e-878b-382529b1109d',
		title: 'Amaretto',
		description: '3XL',
		price: '$56.53',
		stock: 71,
	},
	{
		id: '6832ef72-c021-42e7-80e3-f309c009758d',
		title: 'Pepper - Chili Powder',
		description: 'XS',
		price: '$78.07',
		stock: 51,
	},
	{
		id: '2aeb7670-0ca5-46d4-b04b-07636abc9f4f',
		title: 'Breakfast Quesadillas',
		description: '2XL',
		price: '$26.97',
		stock: 45,
	},
	{
		id: 'acecc90b-ce2f-44ed-8266-acf65ff3aedf',
		title: 'Worcestershire Sauce',
		description: 'S',
		price: '$80.27',
		stock: 1,
	},
	{
		id: '462d805f-429d-455a-8558-cdd4dd23e775',
		title: 'Spring Roll Veg Mini',
		description: 'L',
		price: '$65.47',
		stock: 89,
	},
	{
		id: 'bc32b9d8-2ea5-494d-80dd-399224adeb86',
		title: 'Tomatoes - Plum, Canned',
		description: 'XS',
		price: '$36.56',
		stock: 44,
	},
	{
		id: '9129b59c-4e56-4f8b-a3f9-ff551396c24f',
		title: 'Pancetta',
		description: 'XS',
		price: '$66.47',
		stock: 4,
	},
	{
		id: 'ee1c793e-1a51-4a28-825d-5e96cb798640',
		title: 'Chinese Lemon Pork',
		description: 'XL',
		price: '$33.88',
		stock: 90,
	},
	{
		id: 'f2084858-89d3-46e0-9638-5b8a4a5de9fb',
		title: 'Bread - Bistro Sour',
		description: 'XS',
		price: '$10.62',
		stock: 18,
	},
	{
		id: '30442741-2f18-46bf-bf0d-28a274d1e6eb',
		title: 'Olives - Nicoise',
		description: 'XS',
		price: '$36.16',
		stock: 45,
	},
	{
		id: '90d82c72-03f1-4022-b650-4fb4a6ef7ab5',
		title: 'Capicola - Hot',
		description: 'XL',
		price: '$66.76',
		stock: 82,
	},
	{
		id: '88d955fa-e312-41ff-b089-9029b391c69d',
		title: 'Soy Protein',
		description: '2XL',
		price: '$20.61',
		stock: 3,
	},
	{
		id: '13ae7139-d3ec-4a78-bb31-4f2c373f71fc',
		title: 'Cheese - Asiago',
		description: 'L',
		price: '$91.41',
		stock: 76,
	},
	{
		id: '63f66839-5755-497b-9123-b462f179bc1f',
		title: 'Wine - Shiraz South Eastern',
		description: 'M',
		price: '$14.96',
		stock: 11,
	},
	{
		id: 'd3da6166-8e71-4307-8f0b-ac0a56bf36b0',
		title: 'Sauce - Demi Glace',
		description: '3XL',
		price: '$84.87',
		stock: 30,
	},
	{
		id: '1495b9d7-3cc8-4212-a1a0-7e4292e6ead0',
		title: 'Pepper - Cubanelle',
		description: '2XL',
		price: '$81.65',
		stock: 45,
	},
	{
		id: 'a7bde5cb-6b8b-42e1-8515-5b5bea2ef18c',
		title: 'Papayas',
		description: 'L',
		price: '$45.73',
		stock: 44,
	},
	{
		id: 'cbd9376a-b44c-414b-854b-4bdcfe4af8c4',
		title: 'Miso Paste White',
		description: 'S',
		price: '$98.32',
		stock: 84,
	},
	{
		id: '28672502-bb31-4080-93a6-725332fbd7de',
		title: 'Wakami Seaweed',
		description: '2XL',
		price: '$61.19',
		stock: 15,
	},
	{
		id: '62acbe12-ad36-4ba6-a175-cda72ac1030f',
		title: 'Tea - Herbal I Love Lemon',
		description: 'M',
		price: '$17.68',
		stock: 50,
	},
	{
		id: 'd0cbf61c-194e-436b-9d8c-1ef0f66d2ad3',
		title: 'Wine - Niagara Peninsula Vqa',
		description: 'M',
		price: '$14.19',
		stock: 91,
	},
	{
		id: 'e80c6285-bf16-42aa-b39b-f9e87cad9ccd',
		title: 'Wine - Red, Lurton Merlot De',
		description: '2XL',
		price: '$31.67',
		stock: 49,
	},
	{
		id: 'cccb122c-4910-42a0-9654-fa54c30850c8',
		title: 'The Pop Shoppe - Lime Rickey',
		description: 'XL',
		price: '$35.55',
		stock: 60,
	},
	{
		id: '315f604b-a615-4272-aa3c-be99598fc4c7',
		title: 'Cauliflower',
		description: 'L',
		price: '$18.55',
		stock: 73,
	},
	{
		id: '23519a84-4ab5-4712-88eb-ec6a42951a5d',
		title: 'Tart Shells - Savory, 2',
		description: '2XL',
		price: '$30.64',
		stock: 34,
	},
	{
		id: 'e7eae08c-12ac-406f-943d-f805d1498ee6',
		title: 'Cheese - Gouda Smoked',
		description: 'XL',
		price: '$61.19',
		stock: 66,
	},
	{
		id: '469ae6c4-aae1-47bd-8307-13554df8f9ff',
		title: 'Parsley Italian - Fresh',
		description: 'XL',
		price: '$18.65',
		stock: 59,
	},
	{
		id: '62e56283-7140-47f4-bc8c-9997fb60b840',
		title: 'Scallops - 20/30',
		description: 'S',
		price: '$15.96',
		stock: 100,
	},
	{
		id: '065adb5b-6a70-414f-a94b-2ad42dcd30b4',
		title: 'Curry Powder Madras',
		description: 'L',
		price: '$26.63',
		stock: 13,
	},
	{
		id: 'e0f11832-c537-45db-9f89-461e8e6ef6b0',
		title: 'Thyme - Lemon, Fresh',
		description: '3XL',
		price: '$3.87',
		stock: 43,
	},
	{
		id: '2b50bc73-4d9a-41c7-b2c4-a00c8b6f47e8',
		title: 'Bread Base - Gold Formel',
		description: 'S',
		price: '$71.52',
		stock: 57,
	},
	{
		id: '4fb165a9-96d5-4459-bcbe-38ecf57bec0b',
		title: 'Longos - Grilled Salmon With Bbq',
		description: 'S',
		price: '$15.71',
		stock: 68,
	},
	{
		id: 'fff237e2-b85a-49c8-86c7-b6dc662d37e8',
		title: 'Magnotta Bel Paese Red',
		description: 'S',
		price: '$47.39',
		stock: 72,
	},
	{
		id: '0700c257-8fc7-46c1-8cea-a3b984e4f2be',
		title: 'Clam - Cherrystone',
		description: 'M',
		price: '$64.93',
		stock: 19,
	},
	{
		id: '5b7618a9-76e8-4af1-9b7a-06b5bb583d3d',
		title: 'Beans - Fava Fresh',
		description: 'XS',
		price: '$5.65',
		stock: 78,
	},
	{
		id: 'a561337c-a96b-4636-bb91-dae413cddab6',
		title: 'Crackers - Graham',
		description: '3XL',
		price: '$68.77',
		stock: 52,
	},
	{
		id: '44e82424-c691-4530-9fb9-bfbf4a984bc5',
		title: 'Puree - Mocha',
		description: 'M',
		price: '$72.12',
		stock: 46,
	},
	{
		id: '44a09015-e559-4235-9e18-3757f3cba9f4',
		title: 'Wine - Rosso Del Veronese Igt',
		description: '3XL',
		price: '$74.40',
		stock: 21,
	},
	{
		id: '1194da05-2a81-440d-be45-386b6de4584e',
		title: 'Veal - Osso Bucco',
		description: 'M',
		price: '$52.18',
		stock: 99,
	},
	{
		id: 'dc2ff100-8a66-42ba-aef3-5b551dc5928a',
		title: 'Chips - Doritos',
		description: 'L',
		price: '$23.09',
		stock: 87,
	},
	{
		id: '61131b0e-6e6c-4120-9ba9-c7f022e1d601',
		title: 'Bread - Crusty Italian Poly',
		description: 'S',
		price: '$81.44',
		stock: 24,
	},
	{
		id: '1ddd4a74-d193-4dad-9dfd-a1785a2beb56',
		title: 'Sauce - Caesar Dressing',
		description: 'S',
		price: '$36.51',
		stock: 84,
	},
	{
		id: '3f90d53c-d3e0-4907-ab99-cca18a92043b',
		title: 'Coffee - Dark Roast',
		description: 'XS',
		price: '$26.20',
		stock: 56,
	},
]

// Components

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navigate = useNavigate()

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	const getNavClass = (path: string) => {
		return location.pathname === path ? 'nav-item active' : 'nav-item'
	}

	return (
		<header className='header'>
			<nav>
				<div
					className='title'
					onClick={() => navigate('/')}
				>
					<h1>La Linda Novia</h1>
					<span>Tienda de vestidos</span>
				</div>

				<div
					className='hamburger'
					onClick={toggleMenu}
				>
					<span className={isMenuOpen ? 'line open' : 'line'}></span>
					<span className={isMenuOpen ? 'line open' : 'line'}></span>
					<span className={isMenuOpen ? 'line open' : 'line'}></span>
				</div>

				<ul className={isMenuOpen ? 'nav-links open' : 'nav-links'}>
					<li
						className={getNavClass('/')}
						onClick={() => navigate('/')}
					>
						Inicio
					</li>
					<li
						className={getNavClass('/products')}
						onClick={() => navigate('/products')}
					>
						Productos
					</li>
					<li
						className={getNavClass('/sells')}
						onClick={() => navigate('/sells')}
					>
						Ventas
					</li>
					<li
						className={getNavClass('/orders')}
						onClick={() => navigate('/orders')}
					>
						Compras
					</li>
					<li
						className={getNavClass('/contact')}
						onClick={() => navigate('/contact')}
					>
						Contáctenos
					</li>
					<li
						className={getNavClass('/signin')}
						onClick={() => navigate('/signin')}
					>
						Iniciar Sesión
					</li>
					<li
						className={getNavClass('/signout')}
						onClick={() => navigate('/signout')}
					>
						Cerrar Sesión
					</li>
				</ul>
			</nav>

			<div className='offer'>
				<span>50% de descuento en tu segunda compra</span>
			</div>
		</header>
	)
}

function Footer() {
	return (
		<footer className='footer'>
			<span>La Linda Novia &copy; {new Date().getFullYear()}</span>
		</footer>
	)
}

function Product({
	id,
	title,
	description,
	stock,
	price,
	imageUrl,
}: {
	id: string
	title: string
	description: string
	stock: number
	price: string
	imageUrl: string
}) {
	return (
		<div className='product'>
			<div className='title'>
				<span></span>

				<span>{title}</span>

				<span className='stock'>
					{stock} <br /> stock
				</span>
			</div>

			<img src={imageUrl} />

			<p className='description'>Size: {description}</p>

			<span className='price'>{price}</span>

			<Button
				onClick={() => console.log(id)}
				className='button buy'
				size='large'
			>
				Comprar
			</Button>
		</div>
	)
}

function Sell({
	id,
	title,
	description,
	price,
	imageUrl,
}: {
	id: string
	title: string
	description: string
	price: string
	imageUrl: string
}) {
	return (
		<div className='sell'>
			<div className='title'>
				<span>{title}</span>
			</div>

			<span className='order-id'>{id}</span>

			<img src={imageUrl} />

			<p className='description'>Size: {description}</p>

			<span className='price'>{price}</span>

			<Button
				onClick={() => console.log(id)}
				className='button buy'
				size='large'
			>
				Ver detalles
			</Button>
		</div>
	)
}

function Main({ children }: { children: JSX.Element }) {
	const [headerHeight, setHeaderHeight] = useState(0)

	const updateHeaderHeight = () => {
		const headerElement = document.getElementsByClassName(
			'header'
		)[0] as HTMLElement
		if (headerElement) {
			const newHeight = headerElement.clientHeight
			setHeaderHeight(newHeight)
		}
	}

	useEffect(() => {
		updateHeaderHeight()

		// Add event listener for window resize
		window.addEventListener('resize', updateHeaderHeight)

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener('resize', updateHeaderHeight)
		}
	}, [])

	useEffect(() => {
		const contentElement = document.getElementsByClassName(
			'content'
		)[0] as HTMLElement
		if (contentElement) {
			contentElement.style.paddingTop = `${headerHeight + 16}px`
		}
	}, [headerHeight])

	return (
		<main className='main'>
			<Header />

			<div className='content'>{children}</div>

			<Footer />
		</main>
	)
}

// Pages

function Home() {
	return (
		<Main>
			<div className='home-page'>
				<h2>
					<b>Bienvenidos a La Linda Novia</b>
				</h2>

				<span>Tu historia de amor merece el vestido perfecto.</span>

				<p className='introduction'>
					En La Linda Novia, creemos que cada novia es única y merece un vestido
					que refleje su personalidad, sueños y amor. Nuestra colección está
					diseñada para resaltar tu belleza natural y hacerte sentir especial en
					uno de los días más importantes de tu vida.
				</p>

				<span>
					<b>Descubre Tu Estilo</b>
				</span>

				<p>
					Desde clásicos elegantes hasta modernos y atrevidos, nuestros vestidos
					están confeccionados con materiales de la más alta calidad y un
					impecable ojo para los detalles. Encuentra el estilo que te hará
					brillar con elegancia y gracia.
				</p>

				<span>
					<b>Atención Personalizada</b>
				</span>

				<p>
					Sabemos que elegir el vestido de novia es una decisión importante. Por
					eso, ofrecemos atención personalizada para ayudarte a encontrar el
					vestido de tus sueños. Nuestro equipo de expertos está aquí para
					guiarte en cada paso del camino, asegurando que te sientas cómoda y
					segura en tu elección. Promociones Especiales
					<br />
					<br />
					Celebra con nosotros tu segunda compra con un 50% de descuento.
					Además, disfruta de sorpresas exclusivas y beneficios por ser parte de
					nuestra comunidad de novias.
				</p>

				<span>
					<b>Reserva Tu Cita</b>
				</span>

				<p>
					Visítanos y vive una experiencia de compra inolvidable. Estamos aquí
					para ayudarte a crear recuerdos que atesorarás para siempre.
					<br />
					<br />
				</p>

				<p>
					<b>La Linda Novia</b> – Porque tu vestido debe ser tan único como tu
					historia de amor.
				</p>
			</div>
		</Main>
	)
}

function Products() {
	return (
		<Main>
			<>
				<Space.Compact
					block
					size='large'
				>
					<Input
						className='input-search'
						style={{ marginBottom: '1rem' }}
						placeholder='Vestido blanco'
						prefix={<SearchOutlined />}
						allowClear
						tabIndex={1}
						autoComplete='off'
					/>

					<Button
						className='button-search'
						size='large'
					>
						Buscar
					</Button>
				</Space.Compact>

				<section className='products-page'>
					{PRODUCTS.map(({ id, description, price, stock, title }) => (
						<Product
							id={id}
							title={title}
							description={description}
							price={price}
							stock={stock}
							imageUrl={`${Math.floor(Math.random() * 3) + 1}.png`}
							key={id}
						/>
					))}
				</section>
			</>
		</Main>
	)
}

function Sells() {
	return (
		<Main>
			<div className='sells-page'>
				<h3>Ventas</h3>

				<section className='map'>
					{PRODUCTS.slice(0, 5).map(({ id, description, price, title }) => (
						<Sell
							id={id}
							title={title}
							description={description}
							price={price}
							imageUrl={`${Math.floor(Math.random() * 3) + 1}.png`}
							key={id}
						/>
					))}
				</section>
			</div>
		</Main>
	)
}

function Orders() {
	return (
		<Main>
			<div className='sells-page'>
				<h3>Compras</h3>

				<section className='map'>
					{PRODUCTS.slice(0, 5).map(({ id, description, price, title }) => (
						<Sell
							id={id}
							title={title}
							description={description}
							price={price}
							imageUrl={`${Math.floor(Math.random() * 3) + 1}.png`}
							key={id}
						/>
					))}
				</section>
			</div>
		</Main>
	)
}

function Contact() {
	return (
		<Main>
			<div className='signin-page'>
				<h3>Contáctenos</h3>

				<Form
					{...FORM_PROPS}
					labelAlign='left'
					onFinish={() => {}}
					className='form'
				>
					<Form.Item
						label='Email'
						children={
							<Input
								className='input'
								allowClear
								tabIndex={1}
								placeholder='email@lalindanovia.com'
								type='email'
								autoComplete='email'
							/>
						}
					/>

					<Form.Item
						label='Mensaje'
						children={
							<Input.TextArea
								className='input'
								allowClear
								tabIndex={1}
								placeholder='Solicito un cambio del producto # 132131233123'
								autoComplete='email'
								rows={10}
							/>
						}
					/>

					<Button
						size='large'
						className='button signin'
					>
						Enviar mensaje
					</Button>
				</Form>
			</div>
		</Main>
	)
}

function SignIn() {
	const navigate = useNavigate()

	return (
		<Main>
			<div className='signin-page'>
				<h3>Iniciar Sesión</h3>

				<Form
					{...FORM_PROPS}
					labelAlign='left'
					onFinish={() => {}}
					className='form'
				>
					<Form.Item
						label='Email'
						children={
							<Input
								className='input'
								allowClear
								tabIndex={1}
								placeholder='email@lalindanovia.com'
								type='email'
								autoComplete='email'
							/>
						}
					/>

					<Form.Item
						label='Contraseña'
						children={
							<Input.Password
								className='input'
								tabIndex={2}
								placeholder='0123456789'
								autoComplete='password'
								allowClear
							/>
						}
					/>

					<div className='actions'>
						<Button
							size='large'
							className='button signup'
							onClick={() => navigate('/signup')}
						>
							Crear cuenta
						</Button>

						<Button
							size='large'
							className='button signin'
						>
							Ingresar
						</Button>
					</div>
				</Form>
			</div>
		</Main>
	)
}

function SignOut() {
	const navigate = useNavigate()

	const [count, setCount] = useState(5)

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => setCount(count - 1), 1000)
			return () => clearTimeout(timer)
		} else {
			navigate('/')
		}
	}, [count, navigate])

	return (
		<Main>
			<div className='home-page'>
				<h2>
					<b>Cerrando sesión</b>
				</h2>

				<span>Tu historia de amor merece el vestido perfecto.</span>

				<p className='introduction'>
					En <b>{count}</b> vas a ser redirigido a nuestra pagina principal
				</p>
			</div>
		</Main>
	)
}

function SignUp() {
	const navigate = useNavigate()

	return (
		<Main>
			<div className='signin-page'>
				<h3>Crear cuenta</h3>

				<Form
					{...FORM_PROPS}
					labelAlign='left'
					onFinish={() => {}}
					className='form'
				>
					<Form.Item
						label='Primer Nombre'
						children={
							<Input
								className='input'
								allowClear
								tabIndex={1}
								placeholder='Cesar'
								autoComplete='firstName'
								required
							/>
						}
					/>

					<Form.Item
						label='Primer Apellido'
						children={
							<Input
								className='input'
								allowClear
								tabIndex={1}
								placeholder='Guzman'
								autoComplete=''
								required
							/>
						}
					/>

					<Form.Item
						label='Fecha de nacimiento'
						children={
							<DatePicker
								className='input'
								allowClear
								tabIndex={1}
								autoComplete='bornDate'
								lang='es'
								defaultPickerValue={dayJS('03/11/2000')}
								defaultValue={dayJS('03/11/2000')}
							/>
						}
					/>

					<Form.Item
						label='Email'
						children={
							<Input
								className='input'
								allowClear
								tabIndex={1}
								placeholder='email@lalindanovia.com'
								type='email'
								autoComplete='email'
							/>
						}
					/>

					<Form.Item
						label='Repetir Email'
						children={
							<Input
								className='input'
								allowClear
								tabIndex={1}
								placeholder='email@lalindanovia.com'
								type='email'
								autoComplete='email'
							/>
						}
					/>

					<Form.Item
						label='Contraseña'
						children={
							<Input.Password
								className='input'
								tabIndex={2}
								placeholder='0123456789'
								autoComplete='password'
								allowClear
							/>
						}
					/>

					<Form.Item
						label='Repetir Contraseña'
						children={
							<Input.Password
								className='input'
								tabIndex={2}
								placeholder='0123456789'
								autoComplete='password'
								allowClear
							/>
						}
					/>

					<div className='actions'>
						<Button
							size='large'
							className='button signup'
							onClick={() => navigate('/signup')}
						>
							Iniciar Sesión
						</Button>

						<Button
							size='large'
							className='button signin'
						>
							Registrarme
						</Button>
					</div>
				</Form>
			</div>
		</Main>
	)
}

function NotFound() {
	return (
		<Main>
			<>
				<h1>Error 404: Not Found</h1>
				<p>La página que busca no existe.</p>
			</>
		</Main>
	)
}

// App

function App() {
	const ROUTES = [
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/products',
			element: <Products />,
		},

		{
			path: '/sells',
			element: <Sells />,
		},
		{
			path: '/orders',
			element: <Orders />,
		},
		{
			path: '/contact',
			element: <Contact />,
		},
		{
			path: '/signin',
			element: <SignIn />,
		},
		{
			path: '/signup',
			element: <SignUp />,
		},
		{
			path: '/signout',
			element: <SignOut />,
		},

		{
			path: '*',
			element: <NotFound />,
		},
	]

	return (
		<BrowserRouter>
			<Routes>
				{ROUTES.map(({ path, element }) => (
					<Route
						path={path}
						element={element}
						key={UUID()}
					/>
				))}
			</Routes>
		</BrowserRouter>
	)
}

export default App
