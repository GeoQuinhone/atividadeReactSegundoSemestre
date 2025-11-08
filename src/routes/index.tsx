import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaCliente } from '../pages/Clientes/ListaCliente';
import { ClientForm } from '../pages/Clientes/ClientForm'; // Assumindo que você criará este arquivo

export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota principal para a listagem */}
                <Route path="/" element={<ListaCliente />} />
                
                {/* Rotas para Criação (C) */}
                <Route path="/clientes/novo" element={<ClientForm isEdit={false} />} /> 
                
                {/* Rotas para Edição (U) - Passando o ID na URL */}
                <Route path="/clientes/editar/:id" element={<ClientForm isEdit={true} />} />
                
            </Routes>
        </BrowserRouter>
    );
}