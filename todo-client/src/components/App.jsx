import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AddingTodo from "../pages/AddingTodo/AddingTodo";
import EditTodo from "../pages/EditTodo/EditTodo";
import TodoList from "../pages/TodoList/TodoList";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import React, {Component} from "react";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const HEALTH_CHECK_URL = 'http://localhost:3001/health'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}};
        this.setLoginUser = this.setLoginUser.bind(this);
    }

    /**
     * Health check for the Server
     */
    componentDidMount() {
        axios.get(HEALTH_CHECK_URL).then(res => {
            console.log("received response from server: " + res.data.message)
        }).catch(err => {
            console.log("server not reachable" + err.message)
            toast.error('server not reachable: ' + err.message)
        })
    }

    setLoginUser(user) {
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}>
                        <Route index element={
                            user && user["_id"] ?
                                <TodoList user={user} setLoginUser={this.setLoginUser}/> :
                                <Login setLoginUser={this.setLoginUser}/>
                        }/>
                        <Route path={"/edit/:id"} element={<EditTodo/>}/>
                        <Route path={"/add"} element={<AddingTodo/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>

                        <Route path="/Login" element={<Login setLoginUser={this.setLoginUser}/>}></Route>
                        <Route path="/Register" element={<Register/>}></Route>
                    </Route>
                </Routes>
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="colored"
                />
            </BrowserRouter>
        );
    }
}

export default App;