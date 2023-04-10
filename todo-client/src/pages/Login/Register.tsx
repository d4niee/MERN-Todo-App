import React, {FC, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft} from 'react-bootstrap-icons';
import loginService from '../../services/loginService';
import {User} from '../../models/User';
import {AxiosResponse} from 'axios';

const Register: FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User>({
        username: '',
        password: '',
    });

    const [repeatPassword, setRepeatPassword] = useState('');

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            username: event.target.value,
        });
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            password: event.target.value,
        });
    };

    const handleChangePasswordRepeat = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRepeatPassword(event.target.value);
    };

    function registerNewUser() {
        /**
         * check if the repeated password is equal
         */
        if (user.password === repeatPassword) {
            if (user.password.length >= 1) {
                // Store hash in database here
                loginService
                    .register({username: user.username, password: user.password})
                    .then((res: AxiosResponse<User>) => {
                        console.log(res);
                        navigate('/Login');
                    })
                    .catch(() => toast.error('user already exists'));
            } else {
                toast.error('password have to be at least 8 characters long');
            }
        } else {
            toast.error('passwords do not match');
        }
    }

    return (
        <div>
            <div className={'login-form'}>
                <h3>Create Account</h3>
                <input
                    type={'text'}
                    placeholder={'name'}
                    className={'form-control input-form'}
                    onChange={handleChangeUsername}
                />
                <input
                    type={'password'}
                    placeholder={'password'}
                    className={'form-control input-form'}
                    onChange={handleChangePassword}
                />
                <input
                    type={'password'}
                    placeholder={'repeat password'}
                    className={'form-control input-form'}
                    onChange={handleChangePasswordRepeat}
                />
                <button
                    className={'btn btn-warning btn-register'}
                    onClick={() => navigate('/Login')}
                >
                    <ArrowLeft/>
                    Back to login
                </button>
                <button
                    className={'btn btn-primary'}
                    disabled={
                        user.username === '' || user.password === '' || repeatPassword === ''
                    }
                    onClick={registerNewUser}
                >
                    Register
                </button>
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

export default Register;