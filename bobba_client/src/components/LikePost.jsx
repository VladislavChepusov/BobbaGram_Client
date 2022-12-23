import React from "react";

import "../styles/app.css";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import { UserNameInToken } from "../LogicApi/Tokens";

export default class LikePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black",
      ILiked: false,
      Likes: [],
      render: false, //Set render state to false
    };
    this.rever = this.rever.bind(this);
  }

  // Клик лайка будет тут
  rever(event) {
    var connect = new Client("https://localhost:7277");
    if (this.state.ILiked) {
      //  не лайкнуть пост
      connect
        .deleteLikeFromPost({
          entityId: this.props.PostId,
        })
        .catch((er) => {
          console.log("error deleteLikeFromPost" + er);
        });

      this.setState({
        color: "black",
        ILiked: false,
      });
    } else {
      // лайкнуть пост
      connect
        .likeThePost({
          entityId: this.props.PostId,
        })
        .catch((er) => {
          console.log("error likeThePost" + er);
        });
      this.setState({
        color: "red",
        ILiked: true,
      });
    }

    event.preventDefault();
  }

  // ошибка на сервере (нужно переписывать а тут пока костыль)
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();
    var RealSlimShady = UserNameInToken();
    var connect = new Client("https://localhost:7277");
    var requestLikes = connect.getPostLikes(this.props.PostId);
    requestLikes
      .then((Govno) => {
        //console.log("res Govno " + Govno.length);
        this.setState({
          isLoaded: true,
          error: false,
        });
        return Govno;
      })
      .then((Govnos) => {
        var Likes = [];
        Govnos.map((_item) =>
          connect
            .getUserById(_item.userId)
            .then((res) => {
              Likes.push(res);
              if (RealSlimShady == res.name) {
                this.setState({
                  color: "red",
                  ILiked: true,
                });
              }
            })
            .then((res) => {
              this.setState({
                Likes,
                error: false,
              });
              //console.log("eto pizda" + Likes);
            })
            .catch((errorSubscribers) => {
              console.log("error Likes", errorSubscribers);
              this.setState({
                error: true,
                isLoaded: true,
              });
            })
        );
      })
      .catch((errorSubscribers) => {
        console.log("error Likes", errorSubscribers);
        this.setState({
          error: true,
          isLoaded: true,
        });
      });

    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 1 second, set render to true
      }.bind(this),
      1
    );
  }

  render(props) {
    let renderContainer = false; //By default don't render anything
    if (this.state.render) {
      //If this.state.render == true, which is set to true by the timer.
      renderContainer = (
        <>
          <i
            data-toggle="modal"
            data-target={"#exampleModalLong" + this.props.PostId}
          >
            {" "}
            {this.props.likes + " liked"}{" "}
          </i>

          <i
            className="heart outline icon big"
            style={{ color: this.state.color }}
            onClick={this.rever}
          >
            {" "}
          </i>

          <div
            className="modal fade"
            id={"exampleModalLong" + this.props.PostId}
            tabIndex={"1" + this.props.PostId}
            role="dialog"
            aria-labelledby={"exampleModalLongTitle" + this.props.PostId}
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    id={"exampleModalLongTitle" + this.props.PostId}
                  >
                    Лайкнули
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

                {this.state.Likes.length > 0 && (
                  <ul className="list-group  m-15">
                    {this.state.Likes.map((_item) => (
                      <a
                        href={"/user/" + _item.name}
                        className=" nav-link  link-dark  "
                      >
                        <br></br>
                        <li key={_item.name}>
                          <div className="container border-bottom border-secondary  border-3 rounded-1 rounded-pill">
                            <div className="row">
                              <div className="col-2">
                                <img
                                  className="Storyimg "
                                  src={
                                    _item.avatarLink !== null
                                      ? "https://localhost:7277" +
                                        _item.avatarLink
                                      : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                                  }
                                />
                              </div>
                              <div className="col-6 ">
                                <div
                                  className="float-left fs-5"
                                  style={{
                                    position: "absolute",
                                    bottom: "25%",
                                  }}
                                >
                                  {_item.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </a>
                    ))}

                    <br></br>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      ); //Add dom elements
    }
    return renderContainer; //Render the dom elements, or, when this.state == false, nothing.
  }

  // }
}
