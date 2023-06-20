import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import thunk from 'redux-thunk'
import reducers from './lib/redux/reducers'
import { legacy_createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
