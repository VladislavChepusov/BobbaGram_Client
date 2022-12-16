import React from "react";
import "../styles/app.css";
import { Nav } from "react-bootstrap";
import { Client, TokenRequestModel } from "../LogicApi/AuthModels";
import { Navigate } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";

export default class NewLogin extends React.Component {
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
          d.setTime(d.getTime() + 60 * 1000); // время жизни
          //acces в куки\refresh  в localstorage
          cookies.set("accessToken", "Bearer " + res.accessToken, {
            path: "/",
            expires: d,
          });
          localStorage.setItem("refreshToken", res.refreshToken);

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
      <div className="row mx-0 auth-wrapper">
        {this.state.redirect ? <Navigate push to="/StartPage" /> : null}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className="d-none d-sm-flex col-sm-6 col-lg-8 align-items-center p-5">
          <div className="align-items-start d-lg-flex flex-column offset-lg-2 text-white">
            <img src="" className="mb-3" />
            <h1 className="d-flex">Привет 👋 Добро пожаловать, снова!</h1>
            <p>
              BobbaGram - Потому что твои новые друзья Иран и Мозамбик!!{" "}
              <br></br> ыыыыыы
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-center col-sm-6 col-lg-4 align-items-center px-5 bg-white mx-auto">
          <div className="form-wrapper">
            <div className="d-flex flex-column">
              <div className="mb-4">
                <h3 className="font-medium mb-1">Sign In </h3>
                <p className="mb-2">
                  Пожалуйста, войдите в свою учетную запись.
                </p>
              </div>

              <form onSubmit={this.handleSubmit}>
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

                <br></br>
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
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    type="button"
                  >
                    Зарегистрироваться
                  </button>
                </Nav.Link>
              </form>
              <div className="p-5 text-center text-xs">
                <span>
                  BobbaGram © 2022
                  <a
                    href="https://github.com/VladislavChepusov"
                    rel=""
                    target="_blank"
                    title="aji"
                  >
                    VK Chepusov
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
