import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'
createRoot(document.getElementById('root')).render(
      <ErrorBoundary>
      <Provider store={store}>
            <App />
      </Provider>
      </ErrorBoundary>
)
