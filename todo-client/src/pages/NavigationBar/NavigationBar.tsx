import {Link, useNavigate} from 'react-router-dom';
import './NavigationBar.css';
import {ArrowBarLeft} from 'react-bootstrap-icons';
import React, {FC} from 'react';
import {User} from '../../models/User';

const NavigationBar: FC<NavigationBarProps> = ({user, setLoginUser}: NavigationBarProps) => {

    const navigate = useNavigate();

    /**
     * Logout - reset user state and go back to root page
     */
    const logout = () => {
        setLoginUser(null);
        navigate('/', {replace: true});
    };

    return (
        <>
            <nav className={'navigation'}>
                <Link to={'/'} className={'nav-item'}>
                    <button
                        className={'btn btn-primary btn-nav'}>
                        View Todo List
                    </button>
                </Link>
                <Link to={'/add'} state={{userId: user._id}}>
                    <button
                        className={'btn btn-primary btn-nav'}>
                        Add new Todo
                    </button>
                </Link>

                <button onClick={logout} className={'btn btn-danger'}>
                    <ArrowBarLeft/>
                    Logout
                </button>
            </nav>
        </>
    );
};

interface NavigationBarProps {
    user: User;
    setLoginUser: React.Dispatch<React.SetStateAction<User>>;
}

export default NavigationBar;