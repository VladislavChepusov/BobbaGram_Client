import "../styles/app.css";
import React from "react";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <body>
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
              <h1 className="display-1 fw-bold">404</h1>
              <p className="fs-3">
                {" "}
                <span className="text-danger">ууупсс!</span> Страница не
                найдена! :с
              </p>
              <p className="lead">Страница, которую вы ищете, не существует</p>
              <a href="/" className="btn btn-primary">
                Go Home
              </a>
            </div>
          </div>
        </body>
      </>
    );
  }
}
