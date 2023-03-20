import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import SocketContextComponent from './context/SocketContextComponent';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketContextComponent>
    <App />
  </SocketContextComponent>
)
