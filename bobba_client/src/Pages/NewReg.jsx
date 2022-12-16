import React from "react";
import { Nav } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default class NewRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: false,

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
    alert(
      "A name was submitted: " +
        this.state.email +
        "|" +
        this.state.password +
        "|" +
        this.state.description
    );
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

                      <form>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example1cg"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            Ваш никнейм
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            Ваш Email
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form3Example4cg"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Пароль
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form3Example4cdg"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cdg"
                          >
                            Повторите пароль
                          </label>
                        </div>

                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">
                            Example textarea
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="2"
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <label for="inputDate">Введите дату:</label>
                          <input type="date" class="form-control" />
                        </div>
                        <button
                          className="w-100 btn btn-lg btn-primary"
                          type="submit"
                        >
                          Зарегистрироваться
                        </button>

                        <p className="text-center text-muted mt-5 mb-0">
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
