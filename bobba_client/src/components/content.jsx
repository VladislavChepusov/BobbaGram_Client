import React from "react";
import "../styles/app.css";
import Nav from "react-bootstrap/Nav";
import DeletePost from "../components/DeletePost";
import LikePost from "../components/LikePost";
export default class Content extends React.Component {
  render(props) {
    return (
      <>
        <div className="ui card">
          <div className="content">
            <Nav.Link href={"/post/" + this.props.PostId}>
              <div className="right floated meta">
                {this.props.time.getDate() +
                  "/" +
                  (Number(this.props.time.getMonth()) + 1) +
                  "/" +
                  this.props.time.getFullYear()}
              </div>
            </Nav.Link>
            <Nav.Link href={"/user/" + this.props.name}>
              <img className="ui avatar image" src={this.props.user} />
              {this.props.name}
            </Nav.Link>
          </div>

          {this.props.contents.length == 1 && (
            <div className="image">
              <img
                className="Storyimg"
                src={
                  "https://localhost:7277" + this.props.contents[0].contentLink
                }
              />
            </div>
          )}

          {this.props.contents.length > 1 && (
            <div
              id={"carouselExampleIndicators" + this.props.POSTINDEX}
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {this.props.contents.map((_item, index) => (
                  <li
                    data-target={
                      "#carouselExampleIndicators" + this.props.POSTINDEX
                    }
                    data-slide-to={index}
                    className="active"
                  ></li>
                ))}
              </ol>

              <div className="carousel-inner">
                {this.props.contents.map(
                  (_item, index) =>
                    (index == 0 && (
                      <div className="carousel-item active ">
                        <img
                          className="d-block w-100"
                          src={"https://localhost:7277" + _item.contentLink}
                          alt="=слайд"
                        />
                      </div>
                    )) || (
                      <div className="carousel-item ">
                        <img
                          className="d-block w-100"
                          src={"https://localhost:7277" + _item.contentLink}
                          alt="=слайд"
                        />
                      </div>
                    )
                )}
              </div>

              <a
                className="carousel-control-prev"
                href={"#carouselExampleIndicators" + this.props.POSTINDEX}
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href={"#carouselExampleIndicators" + this.props.POSTINDEX}
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          )}

          {/*<div class="image">
            <img className="Storyimg" src={this.props.url} />
          </div>*/}

          <div className="content">
            {this.props.RealSlimShady == this.props.name && (
              <DeletePost
                PostId={this.props.PostId}
                POSTINDEX={this.props.POSTINDEX}
                description={this.props.description}
              />
            )}

            {/* {this.props.likes + " liked"}
            <i> </i>
            <i className="heart outline icon big"> </i>
            <i className="heart outline icon big" style={{color:this.state.color}} onClick ={this.rever}> </i>*/}

            <LikePost likes={this.props.likes} PostId={this.props.PostId} />

            <i className="comment outline icon big"></i>
          </div>

          <div className="content">
            <i>
              <strong>
                {this.props.name}
                {": "}
              </strong>
              {this.props.description}
            </i>
          </div>

          {/*
           {this.props.comments.length > 0  && ( <div className="content">
            <i>
              <strong>
                {this.props.name}
                {": "}
              </strong>
              {this.props.comments[0].commentText}
            </i>
          </div>)} 

          */}

          <div className="extra content">
            <div className="ui large transparent left icon input">
              <i className="heart outline icon"></i>
              <input type="text" placeholder="Add Comment..." />
            </div>
          </div>
        </div>
      </>
    );
  }
}
