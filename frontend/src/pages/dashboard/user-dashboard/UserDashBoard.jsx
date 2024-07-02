import React, { useState } from 'react'
import UserDashBoardNavBar from '../../../components/navbar/UserDashBoardNavBar'
import { useUserAuth } from '../../../context/UserAuthContext'
import axios from 'axios';
import { API_BASE_URL } from '../../../util/constants';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axios/Axiosinstance';

const UserDashBoard = () => {

  // dataEntrada: String,
  //       fornecedor: String,
  //       valor: Number,
  //       parcelas: Number,
  //       dataVencimento: String,
  //       centroCusto: String,
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [ dataEntrada, setDataEntrada ] = useState("");
  const [ parcelas, setParcelas ] = useState(1);
  const [ dataVencimento, setDataVencimento ] = useState("");
  const [ fornecedor, setFornecedor ] = useState("");
  const [ valor, setValor ] = useState(0);
  const [ centroCusto, setCentroCusto ] = useState("");

  const [ nome, setNome ] = useState("");
  const [ grupo, setGrupo ] = useState("");
  const [ quantidade, setQuantidade ] = useState(0);

  const [ mercadorias, setMercadorias ] = useState([]);
  const [ mercadoriaSelecionada, setMercadoriaSelecionada ] = useState("")

  const get_mercadoria = async() => {
    await axios.get(`${API_BASE_URL}/mercadoria/get`).then(res => {
      setMercadorias(res.data);
        // console.log(res.data);
    }).catch(error => {
        console.log(error);
    });
};
  
  const handleCreateNota = async(e) => {
    e.preventDefault();
    if(!user) {
      alert('Você precisa estar logado para cadastrar uma nota. COMO VC ESTÁ AQUI?')
      return;
    }
    const res = await axiosInstance.post(`${API_BASE_URL}/users/register/nota`, {
      dataEntrada,
      fornecedor,
      valor,
      parcelas,
      dataVencimento,
      centroCusto,
    }).then(res => {
      console.log(res.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const handleCreateMercadoria = async(e) => {
    e.preventDefault();
    if(!user) {
      alert('Você precisa estar logado para cadastrar uma mercadoria. COMO VC ESTÁ AQUI?')
      return;
    }
    await axiosInstance.post(`users/register/mercadoria`, {
      nome: nome,
      grupo: grupo,
      quantidade: quantidade
    }).then(res => {
      console.log(res.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useState(() => {
    get_mercadoria();
  }, [])

  return (
    <div>
        <UserDashBoardNavBar />

        <div className='p-6'>
            <h1>Dashboard</h1>
            <h2>Bem vindo, {user.name}!</h2>

            {/* <button className='btn btn-primary'>Cadastrar Nota</button> */}


            <div className='mt-5'>
              <h1>Notas</h1>
              <button className="mr-3 btn btn-primary" onClick={()=>document.getElementById('cadastrar_modal').showModal()}>Cadastrar Nota</button>
              <button className='btn btn-primary' onClick={e => navigate("/user/notas/historico")}>Histórico de Notas</button>
            </div>

            <div className='mt-5'>
              <h1>Mercadorias</h1>
              <button className='btn btn-primary mr-3' onClick={()=>document.getElementById('mercadoria_modal').showModal()}>Cadastrar Mercadoria</button>
              <button onClick={()=>document.getElementById('remover_mercadoria').showModal()} className='btn btn-primary mr-3'>Remover Mercadoria</button>
              <button onClick={() => navigate("/user/estoque")} className='btn btn-primary'>Consultar Estoque</button>
            </div>






            <dialog id="cadastrar_modal" className="modal">
              <div className="modal-box flex flex-col items-center text-center">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Cadastrar Nota</h3>
                <form onSubmit={handleCreateNota}>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Data de Entrada:</span>
                    </div>
                    <input 
                      type="date"
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setDataEntrada(e.target.value)} 
                      required
                    />
                  </label>


                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Fornecedor:</span>
                    </div>
                    <input 
                      type="text" 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setFornecedor(e.target.value)} 
                      required  
                    />
                  </label>

                  <div className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Valor:</span>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">R$</span>
                      <input
                        type="number"
                        className="input input-bordered w-full pl-10 max-w-xs"
                        placeholder="0.00"
                        onChange={e => setValor(e.target.value)}
                        required
                      />
                    </div>
                  </div>



                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Parcelas:</span>
                    </div>
                    <select required onChange={e => setParcelas(e.target.value)}  className="select select-bordered">
                      <option disabled selected>Selecione o número de parcelas</option>

                      {[...Array(12)].map((_, index) => {
                        return <option key={index + 1} value={index + 1}>
                          {index + 1} parcela(s)
                        </option>
                      })}
                    </select>
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Data de Vencimento:</span>
                    </div>
                    <input 
                      type="date" 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setDataVencimento(e.target.value)} 
                      required
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Centro de Custo:</span>
                    </div>
                    <input 
                      type="text" 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setCentroCusto(e.target.value)} 
                      required  
                    />
                  </label>

                  <button className="btn btn-primary mt-6">Cadastrar</button>
                </form>
              </div>
            </dialog>


            <dialog id="mercadoria_modal" className="modal">
              <div className="modal-box flex flex-col items-center text-center">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Cadastrar Mercadoria</h3>
                <form onSubmit={handleCreateMercadoria}>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Nome:</span>
                    </div>
                    <input 
                      type="text" 
                      className="input input-bordered w-full max-w-xs" 
                      onChange={e => setNome(e.target.value)} /
                      >
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Grupo:</span>
                    </div>
                    <select onChange={e => setGrupo(e.target.value)}  className="select select-bordered">
                      <option disabled selected>Selecione o grupo da mercadoria </option>
                      
                      <option value="roupas">Bebidas</option>
                      <option value="roupas">Roupas</option>
                      <option value="roupas">Eletrônicos</option>
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

                  

                  <button className="btn btn-primary mt-6">Cadastrar</button>
                </form>
              </div>
            </dialog>

            <dialog id="remover_mercadoria" className="modal">
              <div className="modal-box flex flex-col items-center text-center">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Remover Mercadoria</h3>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">Mercadoria:</span>  
                  </label> 
                  <form>
                    <select onChange={e => setMercadoriaSelecionada(e.target.name)} className="select select-bordered w-full max-w-xs">
                      <option disabled selected>Selecione a Mercadoria</option>
                      {mercadorias.map((mercadoria, index) => {
                        return (
                          <option key={index} value={mercadoria.nome}>{mercadoria.nome}</option>
                        )
                      })}
                    </select>
                    <button className="btn btn-primary mt-6">Remover</button>
                  </form>
                </div>
              </div>
            </dialog>
            



        </div>
    </div>
  )
};

export default UserDashBoard