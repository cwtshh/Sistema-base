import React, { useEffect, useState } from 'react'
import UserDashBoardNavBar from '../../components/navbar/UserDashBoardNavBar'
import { useUserAuth } from '../../context/UserAuthContext'
import Alert from '../../components/alert/Alert';
import axiosInstance from '../../axios/Axiosinstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, login } = useUserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [ error, setError ] = useState(false);

  const navigate = useNavigate();

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
  };

  const handleUserDataChange = async(e) => {
    e.preventDefault();
    const old_email = user.email;
    await axiosInstance.post('/users/edit/name-email', {
      new_name: name,
      new_email: email,
      old_email: old_email,
    }).then(res => {
      if(email === "" && name === "") {
        alert("Preencha ao menos um campo");
        return;
      }
      if(email !== "" && name === "") {
        const new_data = {
          id: user.id,
          name: user.name,
          email: email,
        }
        localStorage.setItem("auth@user", JSON.stringify(new_data));
        user.email = email;
        console.log(user.email);
        return;
      }
      if(email === "" && name !== "") {
        const new_data = {
          id: user.id,
          name: name,
          email: user.email,
        };
        localStorage.setItem("auth@user", JSON.stringify(new_data));
        console.log(user.email);
        return;
      };
      const new_data = {
        id: user.id,
        name: name,
        email: email,
      };
      localStorage.setItem("auth@user", JSON.stringify(new_data));
      console.log(user.email);
    });
  };



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
            <form onSubmit={handleUserDataChange} className='mt-6'>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nome:</span>
                </div>
                <input 
                  type="text" 
                  placeholder={user.name}
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
                  placeholder={user.email} 
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