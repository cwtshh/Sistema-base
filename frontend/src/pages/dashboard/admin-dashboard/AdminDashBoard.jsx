import React, { useEffect, useState } from 'react'
import AdminDashBoardNavBar from '../../../components/navbar/AdminDashBoardNavBar'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../context/UserAuthContext';

const AdminDashBoard = () => {

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ user_type, setUserType ] = useState("");

  const { register_admin, admin } = useAdminAuth();
  const { register_user } = useUserAuth();

  const handleCreateUser = async(e) => {
    e.preventDefault();
    if(!name || !email || !password || !user_type) {
      alert('Preencha todos os campos');
      return;
    }

    if(user_type === 'admin') (
      await register_admin(name, email, password)
    )

    if(user_type === 'user') (
      await register_user(name, email, password)
    )

  }


  return (
    <div>
        <AdminDashBoardNavBar />

        <div className='p-6'>

          <h1>Dashboard</h1>
          <h2>Bem vindo, {admin.name}!</h2>

          <div className='mt-5'>
            <h1>Usuários</h1>
            <button className='btn btn-primary' onClick={()=>document.getElementById('cadastrar_user_modal').showModal()}>Adicionar Usuário</button>
          </div>





          <dialog id="cadastrar_user_modal" className="modal">
              <div className="modal-box flex flex-col items-center text-center">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Cadastrar Usuário</h3>
                <form onSubmit={handleCreateUser}>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Nome:</span>
                    </div>
                    <input type="text" className="input input-bordered w-full max-w-xs" onChange={e => setName(e.target.value)} />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Email:</span>
                    </div>
                    <input type="text" className="input input-bordered w-full max-w-xs" onChange={e => setEmail(e.target.value)} />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Senha:</span>
                    </div>
                    <input type="password" className="input input-bordered w-full max-w-xs" onChange={e => setPassword(e.target.value)} />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Tipo de Usuário:</span>
                    </div>
                    <select onChange={e => setUserType(e.target.value)}  className="select select-bordered">
                      <option disabled selected>Selecione o grupo da mercadoria </option>
                        <option value="admin">Administrador</option>
                        <option value="user">Funcionário</option>
                    </select>
                  </label>


                  

                  <button className="btn btn-primary mt-6">Cadastrar</button>
                </form>
              </div>
            </dialog>
        </div> 
    </div>
  )
}

export default AdminDashBoard