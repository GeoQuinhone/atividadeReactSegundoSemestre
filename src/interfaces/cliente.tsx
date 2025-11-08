export interface ICliente {
        id:number;
        nomeCompleto:string;
        cpf:string;
        dataNascimento:string;
        email:string;
        telefone:string;
        logradouro:string;
        numero:string;
        complemento?:string; // aqui o ? serve para ser opcional 
        bairro:string;
        cidade:string;
        estado:string;
}

export type INovoCliente = Omit<ICliente, 'id'>;