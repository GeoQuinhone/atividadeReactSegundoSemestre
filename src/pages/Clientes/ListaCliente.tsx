import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import type { ICliente } from '../../interfaces/cliente'; 

const API_URL = 'http://localhost:3001/clientes';

export function ListaCliente() {
    const navigate = useNavigate(); 
    
    const [clientes, setClientes] = useState<ICliente[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const fetchClientes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<ICliente[]>(API_URL);
            setClientes(response.data);

            if (response.data.length > 0) {
            } else {
                toast.info("Nenhum cliente cadastrado ainda.");
            }
        } catch (error) {
            console.error("Erro ao carregar clientes:", error);
            toast.error("Erro de conexão! Verifique se o json-server está ativo.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {

        if (!window.confirm("Deseja mesmo excluir este cliente?")) {
            return;
        }
        
        setDeletingId(id); 

        try {
            await axios.delete(`${API_URL}/${id}`);
            setClientes(prevClientes => prevClientes.filter(c => c.id !== id));
            toast.success("Cliente excluído com sucesso!");

        } catch (error) {
            console.error(`Erro ao excluir cliente ${id}:`, error);
            toast.error(`Falha ao excluir o cliente ${id}.`);

        } finally {
            setDeletingId(null);  
        }
    }

    // Efeito para buscar os dados ao montar o componente
    useEffect(() => {
        fetchClientes();
    }, []);

    if (isLoading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p className='mt-2'>Carregando clientes...</p>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Cadastro de Clientes UniAlfa (Read)</h2>
            
            <div className="d-flex justify-content-end mb-3">
                <button 
                    className="btn btn-success"
                    onClick={() => navigate('/clientes/novo')} // Chama a rota de criação do novo cliente
                >
                    + Novo Cliente
                </button>
            </div>

            {clientes.length === 0 && !isLoading ? (
                <div className="alert alert-info">Nenhum cliente encontrado.</div>
            ) : (
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome Completo</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ações (U/D)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nomeCompleto}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={() => navigate(`/clientes/editar/${cliente.id}`)} 
                                        disabled={deletingId !== null} 
                                    >
                                        Editar
                                    </button>
                                    
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(cliente.id)}
                                        disabled={deletingId === cliente.id || deletingId !== null} 
                                    >
                                        {deletingId === cliente.id ? 'Excluindo...' : 'Excluir'} {/* Efeito bacana na hora de exluir */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}