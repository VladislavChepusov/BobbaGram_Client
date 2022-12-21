import React from "react";
import { Navigate } from "react-router-dom";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import "../styles/app.css";

export default class DeletePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: null,
    };

    this.DeletePost = this.DeletePost.bind(this);
  }

  DeletePost(event) {
    TokenMidelware();
    var connect = new Client("https://localhost:7277");
    connect
      .deletePost(this.props.PostId)
      .then((res) => {
        console.log("delPost rest " + res);
        this.setState({
          redirect: true,
        });
      })
      .catch((error) => {
        console.log("delPost error " + error);
        this.setState({
          redirect: false,
          error: error.response.replace(/"/g, ""),
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Navigate push to="/acute" /> : null}

        <span className="right floated">
          <i
            className="close  icon big"
            type="button"
            data-toggle="modal"
            data-target={"#exampleModalCenter" + this.props.POSTINDEX}
          >
            {" "}
          </i>
        </span>

        <div
          className="modal fade"
          id={"exampleModalCenter" + this.props.POSTINDEX}
          tabIndex={this.props.POSTINDEX}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={"exampleModalLongTitle" + this.props.POSTINDEX}
                >
                  Удаление поста ||{this.props.description}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Вы уверены,что хотите удалить данный пост?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={this.DeletePost}
                >
                  Да
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
