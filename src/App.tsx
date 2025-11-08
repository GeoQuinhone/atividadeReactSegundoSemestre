import { Rotas } from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Rotas />

            <ToastContainer 
                position="top-right"
                autoClose={3001}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" // Fica mais bonito e visível
            />
        </>
    )
}

export default App;