import React from "react";
import { Nav } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { Client, CreateUserModel } from "../LogicApi/AuthModels";

import "../styles/app.css";
export default class NewRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: false,
      errorPass: null,
      email: "",
      username: "",
      password: "",
      retrypassword: "",
      date: "",
      description: "",
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
    var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    var GoNextPass = true;
    var GoNextLog = true;
    if (!regularExpression.test(this.state.password)) {
      GoNextPass = false;
      this.setState({
        errorPass:
          "Пароль недостаточно надежен. Необходимо сочетание заглавных букв со строчными, налчие цифр,количество символов от 8 до 15 ",
      });
    } else {
      if (this.state.password != this.state.retrypassword) {
        GoNextPass = false;
        this.setState({
          errorPass: "Пароли не совпадают!",
        });
      } else {
        GoNextPass = true;
        this.setState({
          errorPass: null,
        });
      }
    }

    if (!/[^\s]/gim.test(this.state.username)) {
      GoNextLog = false;
      this.setState({
        error: "Никнейм не может быть пустым",
      });
    } else {
      GoNextLog = true;
      this.setState({
        error: null,
      });
    }

    if (GoNextLog && GoNextPass) {
      var connect = new Client("https://localhost:7277");
      let dateB = new Date(this.state.date);
      //let testDate = new Date("2022-12-17T10:25:40.059Z");
      var data = new CreateUserModel({
        name: this.state.username,
        email: this.state.email,
        password: this.state.password,
        retryPassword: this.state.retrypassword,
        birthDate: dateB,
        about: this.state.description,
      });

      var response = connect.registerUser(data);

      response
        .then((res) => {
          console.log("res !!!", res);
          //if (res.ok){
          this.setState({
            redirect: true,
          });
          //}
        })
        .catch((error) => {
          console.log("error !!!", error);
          this.setState({
            redirect: false,
            error: error.response.replace(/"/g, ""),
          });
        });
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="row mx-0 auth-wrapper">
        {this.state.redirect ? <Navigate push to="/" /> : null}

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

        <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card">
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">
                        Создать аккаунт
                      </h2>

                      <form onSubmit={this.handleSubmit}>
                        <div className="text-danger">{this.state.error}</div>

                        <div className="form-outline mb-3">
                          <input
                            className="form-control form-control-lg"
                            type="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            name="username"
                            required
                          />
                          <label className="form-label" htmlFor="username">
                            Ваш никнейм
                          </label>
                        </div>

                        <div className="form-outline mb-3">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name="email"
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Ваш Email
                          </label>
                        </div>

                        <div className="text-danger">
                          {this.state.errorPass}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="floatingPassword"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                            required
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Пароль
                          </label>
                        </div>

                        <div className="form-outline mb-3">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="retrypassword"
                            value={this.state.retrypassword}
                            onChange={this.handleInputChange}
                            name="retrypassword"
                            required
                          />
                          <label className="form-label" htmlFor="retrypassword">
                            Повторите пароль
                          </label>
                        </div>

                        <div className="form-outline mb-3">
                          <textarea
                            className="form-control"
                            // id="exampleFormControlTextarea1"
                            rows="2"
                            type="description"
                            id="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            name="description"
                          ></textarea>
                          <label className="form-label" htmlFor="description">
                            О вас
                          </label>
                        </div>

                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            min="1910-01-01"
                            max="2023-01-01"
                            required
                            id="date"
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            name="date"
                          />
                          <label htmlFor="inputDate">
                            Введите дату рождения
                          </label>
                        </div>

                        <button
                          className="w-100 btn btn-lg btn-primary"
                          type="submit"
                        >
                          Зарегистрироваться
                        </button>

                        <p className="text-center text-muted mt-3 mb-0">
                          У вас уже есть учетная запись?{" "}
                          <Nav.Link href="/">
                            <u>Войдите здесь</u>
                          </Nav.Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
