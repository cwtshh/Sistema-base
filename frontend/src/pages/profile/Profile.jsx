import React, { useEffect, useState } from 'react'
import UserDashBoardNavBar from '../../components/navbar/UserDashBoardNavBar'
import { useUserAuth } from '../../context/UserAuthContext'
import Alert from '../../components/alert/Alert';
import axiosInstance from '../../axios/Axiosinstance';

const Profile = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [ error, setError ] = useState(false);


  const verify_password = () => {
    console.log(newPassword, confirmPassword)
    if(newPassword === confirmPassword) {
      setError(false);
      return;
    }
    setError(true);
  };

  const handlePasswordChange = async(e) => {
    e.preventDefault();
    if(error) {
      alert('As senhas não conferem');
      return;
    }
    await axiosInstance.post(`/users/edit/password`, {
      email: user.email,
      password: oldPassword,
      new_password: newPassword,
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
      setError(true);
    })
  }

  useEffect(() => {
    verify_password();
  }, [newPassword, confirmPassword]);

  return (
    <div>
      <UserDashBoardNavBar />

      <div className='p-6'>
        <h1>Perfil</h1>
        <div className='ml-20 mr-20 grid grid-cols-2 gap-4'>
          <div className='flex flex-col items-center'>
            <h2 className='mt-6'>Foto de perfil</h2>
            <div className="avatar placeholder mt-6">
              <div className="bg-neutral text-neutral-content h-60 rounded-full">
                <span className="text-3xl">{user.name[0]}</span>
              </div>
            </div>
            <input 
              type="file"
              className="mt-6 file-input file-input-bordered w-full max-w-xs" 
            />
            <button className='btn btn-primary mt-4'>Alterar Foto</button>
          </div>

          <div>
            <h1>Informações Pessoais</h1>
            <form className='mt-6'>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nome:</span>
                </div>
                <input 
                  type="text" 
                  value={user.name} 
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setName(e.target.value)}  
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email:</span>
                </div>
                <input 
                  type="text" 
                  value={user.email} 
                  className="input input-bordered w-full max-w-xs" 
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              
              <button type='submit' className='btn btn-primary mt-4'>Alterar Cadastro</button>
            </form>

            {/* <div></div> */}

            <div className=''>
              <h1 className='mt-4'>Alterar Senha</h1>
              <p>Para alterar sua senha, confirme a senha anterior e digite a nova.</p>

              <form onSubmit={handlePasswordChange}>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Senha Anterior:</span>
                  </div>
                  <input 
                    type="password" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange={e => setOldPassword(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nova Senha:</span>
                  </div>
                  <input 
                    type="password" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange={e => {setNewPassword(e.target.value)}}  
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Confirme a Nova Senha:</span>
                  </div>
                  <input 
                    type="password" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange={e => {setConfirmPassword(e.target.value)}}  
                  />
                </label>

                <button type='submit' className='btn btn-primary mt-4'>Alterar Senha</button>

              </form>   

              {error ? <Alert type={"error"} message={"As senhas não conferem"} /> : <></>}   
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile