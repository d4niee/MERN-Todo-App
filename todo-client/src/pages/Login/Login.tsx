import React, {FC, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import './Login.css';
import loginService from '../../services/loginService';
import {User} from '../../models/User';
import { AxiosResponse } from 'axios';

const Login: FC<LoginProps> = ({setLoginUser}: LoginProps) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        username: '',
        password: '',
        salt: '',
    });

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            username: event.target.value,
        });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            password: event.target.value,
        });
    };

    const loginUser = () => {
        loginService
            .login({
                username: user.username.trim(),
                password: user.password.trim(),
            })
            .then((response: AxiosResponse<User>) => {
                setLoginUser(response.data['user'] as User);
                navigate('/', {replace: true});
            })
            .catch((err: Error) => {
                console.log(err.message);
                if (err.message.includes('404')) {
                    toast.error('user not exists');
                } else {
                    toast.error('wrong password');
                }
            });
    };

    return (
        <div>
            <div className={'login-form'}>
                <h3>Login</h3>
                <input
                    type={'text'}
                    className={'form-control input-form'}
                    placeholder={'name'}
                    onChange={handleUsernameChange}
                />
                <input
                    type={'password'}
                    className={'form-control input-form'}
                    placeholder={'password'}
                    onChange={handlePasswordChange}
                />

                <button className={'btn btn-primary'} onClick={loginUser}>
                    Login
                </button>
                <hr/>
                <Link id={'register-link'} to={'/Register'}>
                    Don't have an Account? Register here
                </Link>
            </div>

            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme='colored'
            />
        </div>
    );
};

interface LoginProps {
    setLoginUser: (user: User) => void;
}

export default Login;
