import React from "react";
import { Nav } from "react-bootstrap";
import { Client, TokenRequestModel } from "../LogicApi/AuthModels";
import { Navigate } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      redirect: false,
      login: "",
      password: "",
      tokens: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.login + '|' + this.state.password);

    var connect = new Client("https://localhost:7277");
    var data = new TokenRequestModel(); 
    data.login = this.state.login;
    data.pass = this.state.password;
    var response = connect.token(data);
    
    
    //cookies.set('name', name, { path: '/' });

    response
      .then((res) => {
        if (res) {
          let d = new Date();
          var cookies = new Cookies();
          d.setTime(d.getTime() + (60*1000)); // время жизни
          //acces в куки\refresh  в localstorage
          cookies.set("accessToken", "Bearer "+res.accessToken, {path: "/", expires: d});
          localStorage.setItem("refreshToken",res.refreshToken);
        
          //console.log("eeeee " + localStorage.getItem("refreshToken"));


          this.setState({
            tokens: res,
            redirect: true,
          });
        } else {
          this.setState({
            error: "Неверный логин или пароль!",
          });
        }
      })
      .catch((error) => {
       //console.log("!!!",error);
        if (error.status > 0) {
          this.setState({
            error: "Неверный логин или пароль!",
          });
        } else {
          this.setState({
            error: error.message,
          });
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <main className="form-signin w-100 m-auto">


        {this.state.redirect ? <Navigate push to="/StartPage" /> : null}

        <form onSubmit={this.handleSubmit}>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <h5 className="text-danger">{this.state.error}</h5>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={this.state.login}
              onChange={this.handleInputChange}
              name="login"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <br></br>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Войти
          </button>
          <br></br>
          <br></br>
          <Nav.Link href="/registration">
            <button className="w-100 btn btn-lg btn-primary" type="button">
              Зарегистрироваться
            </button>
          </Nav.Link>
          <p className="mt-5 mb-3 text-muted">
            &copy; VK_Chepusov BobbaGram 2022
          </p>
        </form>
      </main>
    );
  }
}