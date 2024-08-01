import { ConfigProvider } from 'antd'
import es_ES from 'antd/locale/es_ES'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConfigProvider locale={es_ES}>
			<App />
		</ConfigProvider>
	</React.StrictMode>
)
