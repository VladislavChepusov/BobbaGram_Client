import React from "react";
import Header from "../components/Header";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware, IsAuthTokens } from "../LogicApi/RefreshToken";
import "../styles/app.css";
import NotFoundPage from "./NotFoundPage";
import UploadImage from "../components/UploadImage";
import { Navigate } from "react-router-dom";

const MAX_LENGTH = 5;

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: true, // исправить на false
      redirecLogin: false,
      redirectAcute: false,

      FileContents: null,
      description: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.UploadPost = this.UploadPost.bind(this);
    this.fileInput = React.createRef();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount(prevProps) {
    if (!IsAuthTokens()) {
      this.setState({
        redirecLogin: true,
      });
    }
  }
  handleSubmit(event) {
    if (Array.from(this.fileInput.current.files).length > MAX_LENGTH) {
      alert(`Вы не можете загрузить больше ${MAX_LENGTH} файлов`);
      this.fileInput.current.value = "";
      this.setState({
        FileContents: null,
      });
    } else {
      this.setState({
        FileContents: this.fileInput.current.files,
      });
    }
    event.preventDefault();
  }

  UploadPost() {
    if (this.state.FileContents != null) {
      TokenMidelware();
      var connect = new Client("https://localhost:7277");

      const MassFiles = [];
      var size = this.fileInput.current.files["length"];
      for (var i = 0; i < size; i++) {
        MassFiles.push({
          data: this.fileInput.current.files[i],
          fileName: this.fileInput.current.files[0].name,
        });
      }

      var DowloadData = connect.uploadFiles(MassFiles);
      DowloadData.then((res) => {
        console.log("res", res);
        connect
          .createPost({
            description: this.state.description,
            contents: res,
          })
          .then((res2) => {
            console.log("пост создался" + res2);
            this.setState({
              redirectAcute: true,
            });
          })
          .carch((error2) => {
            console.log("Ошибка создания потса" + error2);
          });
      }).catch((error) => {
        console.log("error", error);
      });
    } else {
      alert("Необходимо загрузить хотя бы 1 фото");
    }
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <Header />
          <NotFoundPage />
        </>
      );
    } else if (!this.state.isLoaded) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      );
    } else
      return (
        <>
          <Header />
          {this.state.redirecLogin ? <Navigate push to="/" /> : null}
          {this.state.redirectAcute ? <Navigate push to="/acute" /> : null}

          <div className="Main"></div>

          <div className="container">
            <div className="row">
              <div className="col-6 float-left">
                {this.state.FileContents == null && (
                  <img
                    src="https://img.freepik.com/premium-vector/blank-photo-flat-blue-simple-icon-with-long-shadowxa_159242-10176.jpg"
                    className="img-fluid"
                    alt="Responsive image"
                  ></img>
                )}

                {this.state.FileContents != null && (
                  <UploadImage content={this.state.FileContents} />
                )}

                <br></br>
                <br></br>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <div className="example-2">
                      <div className="form-group">
                        {/*  <input
                          name="file"
                          type="file"
                          id="input__file"
                          class="input input__file"
                          ref={this.fileInput}
                          accept="image/*"
                          onChange={this.handleSubmit}
                          multiple
                        />*/}

                        <input
                          name="file"
                          id="file"
                          className="input-file"
                          type="file"
                          ref={this.fileInput}
                          accept="image/*"
                          onChange={this.handleSubmit}
                          multiple
                        />
                        <label
                          htmlFor="file"
                          className="btn btn-tertiary js-labelFile"
                        >
                          <i className="icon fa fa-check"></i>
                          <span className="js-fileName">Загрузить файл</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="example-2">
                      <div className="form-group">
                        <button
                          name="save"
                          id="save"
                          className="input-file"
                          onClick={this.UploadPost}
                          multiple
                        />

                        <label
                          htmlFor="save"
                          className="btn btn-tertiary js-labelFile"
                        >
                          <i className="fa fa-plus"></i>
                          <span className="js-fileName"> Создать пост !</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
                />
                <br></br> <br></br>
                <div className="row">
                  <div className="form-outline mb-4">
                    <textarea
                      className="form-control"
                      rows="3"
                      maxLength="300"
                      type="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      name="description"
                    ></textarea>
                    <label className="form-label" htmlFor="description">
                      Добавить подпись
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
}
