import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxStoreProvider } from "react-redux";
import App from './App.tsx'
import './index.css'
import { store } from "./store/store";


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReduxStoreProvider store={store}>
			<App />
		</ReduxStoreProvider>
	</React.StrictMode>
);
