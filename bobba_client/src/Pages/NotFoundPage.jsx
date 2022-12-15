import "../styles/app.css";
import React from "react";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <body>
          <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
              <h1 class="display-1 fw-bold">404</h1>
              <p class="fs-3">
                {" "}
                <span class="text-danger">ууупсс!</span> Страница не найдена! :с
              </p>
              <p class="lead">Страница, которую вы ищете, не существует</p>
              <a href="/" class="btn btn-primary">
                Go Home
              </a>
            </div>
          </div>
        </body>
      </>
    );
  }
}
