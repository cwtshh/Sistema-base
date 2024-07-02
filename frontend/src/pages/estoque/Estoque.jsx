import React, { useEffect, useState } from 'react'
import UserDashBoardNavBar from '../../components/navbar/UserDashBoardNavBar'
import axios from 'axios';
import { API_BASE_URL } from '../../util/constants';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/Axiosinstance';
import ExcelJs from 'exceljs';

const Estoque = () => {
    const [ mercadoria, setMercadoria ] = useState([]);
    const [ nomeFilter, setNomeFilter ] = useState('');
    const navigate = useNavigate();

    const [ saidas, setSaidas ] = useState([]);

    const [ dataSaida, setDataSaida ] = useState('');
    const [ nomeProduto, setNomeProduto ] = useState('');
    const [ quantidade, setQuantidade ] = useState(0);
    const [ funcionario, setFuncionario ] = useState('');
    const [ setor, setSetor ] = useState('');
    const [ autorizadoPor, setAutorizadoPor ] = useState('');


    const export_excel = async() => {
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('Estoque');

        worksheet.addRow(["Nome", "Grupo", "Quantidade"]);

        mercadoria.forEach(mercadoria => {
            worksheet.addRow([mercadoria.nome, mercadoria.grupo, mercadoria.quantidade]);
        });

        worksheet.columns.forEach(column => {
            column.width = 20; // Set width in characters
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'estoque.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const get_mercadoria = async() => {
        await axios.get(`${API_BASE_URL}/mercadoria/get`).then(res => {
            setMercadoria(res.data);
            // console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const get_saidas = async() => {
        await axios.get(`${API_BASE_URL}/saidas/get`).then(res => {
            setSaidas(res.data);
            // console.log(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const apply_filters = () => {
        return mercadoria.filter(mercadoria => {
            const filteredNome = !nomeFilter || mercadoria.nome.toLowerCase().includes(nomeFilter.toLowerCase());
            return filteredNome;
        });

    };

    const handleCreateSaida = async(e) => {
        e.preventDefault();
        const saida = {
            dataSaida,
            nomeProduto,
            quantidade,
            funcionario,
            setor,
            autorizadoPor
        };
        await axiosInstance.post("/users/register/saida", saida).then(res => {
            console.log(res.data);
            get_mercadoria();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        get_mercadoria();
        get_saidas();
    }, []);
    return (
        <div>
            <UserDashBoardNavBar />

            <div className='p-6'>
                <button onClick={() => navigate("/user/dashboard")} className='btn btn-neutral'>Voltar</button>
                <h1 className='mt-6'>Estoque</h1>
                <h2>Filtar por produto</h2>
                <label class="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        class="grow" 
                        placeholder="Filtrar"
                        onChange={e => setNomeFilter(e.target.value)}    
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="h-4 w-4 opacity-70">
                        <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd" />
                    </svg>
                </label>

                <div className='mt-5 mb-5 overflow-x-auto bg-gray-200 rounded-xl'>
                    <table className='table table-zebra'>
                            <tr>
                                <th>Nome</th>
                                <th>Grupo</th>
                                <th>Quantidade</th>
                            </tr>

                            {apply_filters().map((mercadoria, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{mercadoria.nome}</td>
                                        <td>{mercadoria.grupo}</td>
                                        <td>{mercadoria.quantidade}</td>
                                    </tr>
                                )
                            })}

                        {}
                    </table>
                </div>
                
                    <button className='btn btn-primary mr-5' onClick={()=>document.getElementById('registrar_saida').showModal()}>Registrar Saída</button>
                    <button onClick={() => export_excel()} className='btn btn-primary'>Exportar Estoque Para Excel</button>
                    <div>
                        
                    </div>

                    <dialog id="registrar_saida" className="modal">
                        <div className="modal-box flex flex-col items-center text-center">
                            <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Registrar Saída</h3>
                            
                            <form onSubmit={handleCreateSaida}>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Data de saída:</span>
                                    </div>
                                    <input 
                                        type="date" 
                                        placeholder="Type here" 
                                        className="input input-bordered w-full max-w-xs" 
                                        onChange={e => setDataSaida(e.target.value)}
                                    />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Nome do Produto:</span>
                                    </div>
                                    <select onChange={e => setNomeProduto(e.target.value)} className="select select-bordered w-full max-w-xs">
                                        <option disabled selected>Selecione o nome do Produto</option>
                                        {mercadoria.map((mercadoria, index) => {
                                            return <option key={index} value={mercadoria.nome}>
                                                {mercadoria.nome}
                                            </option>
                                        })}
                                    </select>
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Quantidade:</span>
                                    </div>
                                    <input 
                                        type="number" 
                                        className="input input-bordered w-full max-w-xs" 
                                        onChange={e => setQuantidade(e.target.value)}
                                    />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Funcionário:</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full max-w-xs" 
                                        onChange={e => setFuncionario(e.target.value)}
                                    />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Setor:</span>
                                    </div>
                                    <select onChange={e => setSetor(e.target.value)} className="select select-bordered w-full max-w-xs">
                                        <option disabled selected>Selecione setor do Produto</option>
                                        <option>Cozinha</option>
                                        <option>Bar</option>
                                    </select>
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Autorizado por:</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full max-w-xs" 
                                        onChange={e => setAutorizadoPor(e.target.value)}
                                    />
                                </label>


                                <button className='btn btn-primary mt-6'>Registrar Saída</button>
                            </form>
                        </div>
                    </dialog>

                    

                    <h1 className='mt-6'>Histórico de Saídas</h1>
                    
                    <div className='mt-5 mb-5 overflow-x-auto bg-gray-200 rounded-xl'>
                        <table className='table table-zebra'>
                                <tr>
                                    <th>Nome</th>
                                    <th>Grupo</th>
                                    <th>Quantidade</th>
                                </tr>

                                {saidas.map((saida, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{saida.nomeProduto}</td>
                                            <td>{saida.setor}</td>
                                            <td>{saida.quantidade}</td>
                                        </tr>
                                    )
                                })}

                            {}
                        </table>
                    </div>
            </div>

        </div>
    )
}

export default Estoque