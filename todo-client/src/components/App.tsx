import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EditTodo from '../pages/EditTodo/EditTodo';
import TodoList from '../pages/TodoList/TodoList';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import React, {FC, useState} from 'react';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import {ToastContainer} from 'react-toastify';
import {User} from '../models/User';
import AddingTodo from '../pages/AddingTodo/AddingTodo';


const App: FC = () => {
    const [user, setUser] = useState<User>(null);

    function setLoginUser(user: User) {
        setUser(user);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'}>
                    <Route index element={
                        user && user._id ?
                            <TodoList user={user} setLoginUser={setLoginUser}/> :
                            <Login setLoginUser={setLoginUser}/>
                    }/>
                    <Route path={'/edit/:id'} element={<EditTodo/>}/>
                    <Route path={'/add'} element={<AddingTodo/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                    <Route path='/Login' element={<Login setLoginUser={setLoginUser}/>}/>
                    <Route path='/Register' element={<Register/>}/>
                </Route>
            </Routes>
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
        </BrowserRouter>
    );
};

export default App;
