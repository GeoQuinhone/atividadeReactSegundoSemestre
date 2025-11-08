import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import type { ICliente, INovoCliente } from '../../interfaces/cliente';
import api from '../../config/api' // importa a api escondendo do codigo 



interface ClientFormProps {
    isEdit?: boolean;
}

//  Validação email funcionando
const isValidEmail = (email: string): boolean => {
    // aqui usar o regex para validar basicamente um email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export function ClientForm({ isEdit = false }: ClientFormProps) {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const clientId = id ? parseInt(id) : undefined;

    const [formData, setFormData] = useState<INovoCliente>({
        nomeCompleto: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isDataLoading, setIsDataLoading] = useState(isEdit);

    useEffect(() => {
        if (isEdit && clientId) {
            const fetchClient = async () => {
                setIsDataLoading(true); // Inicia o loading de dados
                try {
                    const response = await api.get<ICliente>(`/clientes/${id}`);

                    const dataParaFormulario: INovoCliente = {
                        nomeCompleto: response.data.nomeCompleto,
                        cpf: response.data.cpf,
                        dataNascimento: response.data.dataNascimento,
                        email: response.data.email,
                        telefone: response.data.telefone,
                        logradouro: response.data.logradouro,
                        numero: response.data.numero,
                        complemento: response.data.complemento || '',
                        bairro: response.data.bairro,
                        cidade: response.data.cidade,
                        estado: response.data.estado,
                    };
                    setFormData(dataParaFormulario);

                } catch (error) {
                    console.error(`Erro ao carregar cliente ${clientId}:`, error);
                    toast.error(`Falha ao carregar os dados do cliente para edição.`);
                    navigate('/'); // retorna para a lista padrão
                } finally {
                    setIsDataLoading(false); // Finaliza o loading
                }
            };
            fetchClient();
        }
    }, [isEdit, clientId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validando os campos
        const requiredFields: Array<keyof INovoCliente> = [
            'nomeCompleto', 'cpf', 'dataNascimento', 'email', 'telefone',
            'logradouro', 'numero', 'bairro', 'cidade', 'estado'
        ];

        for (const field of requiredFields) {
            if (!formData[field]) {
                toast.error(`O campo '${field}' é obrigatório.`);
                return;
            }
        }

        if (!isValidEmail(formData.email)) {
            toast.error("O formato do e-mail é inválido.");
            return;
        }
        // Fim das Validações

        setIsSubmitting(true); // Iniciar o carregamento do button

        try {
            if (isEdit && clientId) {
                await api.put(`/clientes/${clientId}`, formData);
                toast.success("Cliente atualizado com sucesso!");

            } else {
                await api.post('/clientes', formData);
                toast.success("Cliente cadastrado com sucesso!");
            }
            navigate('/');

        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            toast.error(`Erro ao tentar ${isEdit ? 'atualizar' : 'cadastrar'} o cliente.`);

        } finally {
            setIsSubmitting(false); 
        }
    };

    if (isDataLoading) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="mb-4">Carregando Dados do Cliente...</h2>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">
                {isEdit ? `Editando Cliente #${clientId}` : 'Cadastro de Novo Cliente (Create)'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nome Completo</label>
                        <input type="text" className="form-control" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">CPF</label>
                        <input type="text" className="form-control" name="cpf" value={formData.cpf} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Data de Nascimento</label>
                        <input type="date" className="form-control" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                        {formData.email && !isValidEmail(formData.email) && (
                            <div className="text-danger mt-1">Formato de e-mail inválido.</div>
                        )}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Telefone</label>
                        <input type="text" className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} required />
                    </div>
                    <div className="col-md-8 mb-3">
                        <label className="form-label">Logradouro (Rua, Av.)</label>
                        <input type="text" className="form-control" name="logradouro" value={formData.logradouro} onChange={handleChange} required />
                    </div>

                    <div className="col-md-2 mb-3">
                        <label className="form-label">Número</label>
                        <input type="text" className="form-control" name="numero" value={formData.numero} onChange={handleChange} required />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Complemento (Opcional)</label>
                        <input type="text" className="form-control" name="complemento" value={formData.complemento} onChange={handleChange} />
                    </div>
                    <div className="col-md-7 mb-3">
                        <label className="form-label">Bairro</label>
                        <input type="text" className="form-control" name="bairro" value={formData.bairro} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Cidade</label>
                        <input type="text" className="form-control" name="cidade" value={formData.cidade} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Estado (Sigla)</label>
                        <input type="text" className="form-control" name="estado" value={formData.estado} onChange={handleChange} maxLength={2} required />
                    </div>

                    <div className="col-12 mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isSubmitting} // tira o botão 
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {isEdit ? 'Atualizando...' : 'Cadastrando...'}
                                </>
                            ) : (
                                isEdit ? 'Salvar Alterações' : 'Cadastrar Cliente'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}