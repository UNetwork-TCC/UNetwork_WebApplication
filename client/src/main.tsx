import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store, { persistedStore } from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any } 
}

window.__REDUX_DEVTOOLS_EXTENSION__?.()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>
)
