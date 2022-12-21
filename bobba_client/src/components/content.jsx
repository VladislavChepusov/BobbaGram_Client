import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/app.css";
import Nav from "react-bootstrap/Nav";
export default class Content extends React.Component {
  render(props) {
    return (
      <>
        <div class="ui card">
          <div class="content">
            <div class="right floated meta">
              {this.props.time.getDate() +
                "/" +
                (Number(this.props.time.getMonth()) + 1) +
                "/" +
                this.props.time.getFullYear()}
            </div>

            <Nav.Link href={"/user/" + this.props.name}>
              <img class="ui avatar image" src={this.props.user} />
              {this.props.name}
            </Nav.Link>
          </div>

          {this.props.contents.length == 1 && (
            <div class="image">
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
              id= {"carouselExampleIndicators"+this.props.POSTINDEX}
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                {this.props.contents.map((_item, index) => (
                  <li
                    data-target={"#carouselExampleIndicators"+this.props.POSTINDEX}
                    data-slide-to={index}
                    class="active"
                  ></li>
                ))}
              </ol>

              <div class="carousel-inner">
                {this.props.contents.map(
                  (_item, index) =>
                    (index == 0 && (
                      <div class="carousel-item active ">
                        <img
                          class="d-block w-100"
                          src={"https://localhost:7277" + _item.contentLink}
                          alt="=слайд"
                        />
                      </div>
                    )) || (
                      <div class="carousel-item ">
                        <img
                          class="d-block w-100"
                          src={"https://localhost:7277" + _item.contentLink}
                          alt="=слайд"
                        />
                      </div>
                    )
                )}
              </div>

              <a
                class="carousel-control-prev"
                href={"#carouselExampleIndicators"+this.props.POSTINDEX}
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href={"#carouselExampleIndicators"+this.props.POSTINDEX}
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          )}

          {/*<div class="image">
            <img className="Storyimg" src={this.props.url} />
          </div>*/}

          <div class="content">
            <span class="right floated">
              <i class="bookmark outline icon big"></i>
            </span>
            <i class="heart outline icon big"></i>
            <i class="comment outline icon big"></i>
            <i class="paper plane outline icon big"></i>
          </div>

          <div class="content">
            <i>{this.props.description}</i>
          </div>

          <div class="extra content">
            <div class="ui large transparent left icon input">
              <i class="heart outline icon"></i>
              <input type="text" placeholder="Add Comment..." />
            </div>
          </div>
        </div>
      </>
    );
  }
}
