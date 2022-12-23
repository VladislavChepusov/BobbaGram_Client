import React from "react";
import Container from "react-bootstrap/Container";
import "../styles/app.css";

export default class UploadImage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OldContent: null,
      isLoaded: false,
      imageURLs: null,
    };
  }

  componentDidMount(prevProps) {
    var size = this.props.content["length"];
    const newImageUrls = [];
    for (var i = 0; i < size; i++) {
      newImageUrls.push(URL.createObjectURL(this.props.content[i]));
    }
    this.setState({
      OldContent: this.props.content,
      imageURLs: newImageUrls,
      isLoaded: true,
    });
  }

  componentDidUpdate(prevProps) {
    var count = 0;

    if (this.props.content != this.state.OldContent) {
      this.setState({
        OldContent: this.props.content,
      });

      var size = this.props.content["length"];
      const newImageUrls = [];
      for (var i = 0; i < size; i++) {
        newImageUrls.push(URL.createObjectURL(this.props.content[i]));
      }
      this.setState({
        OldContent: this.props.content,
        imageURLs: newImageUrls,
        isLoaded: true,
      });

      count = count + 1;
      if (count < 1) {
        this.forceUpdate();
      }
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Загрузка....</div>;
    } else
      return (
        <>
          <Container>
            <div className="ui card ">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {this.state.imageURLs.map((imageSrc, index) => (
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to={index}
                      className="active"
                    ></li>
                  ))}
                </ol>

                <div className="carousel-inner">
                  {this.state.imageURLs.map(
                    (imageSrc, index) =>
                      (index == 0 && (
                        <div className="carousel-item active ">
                          <img
                            className="d-block w-100 "
                            src={imageSrc}
                            alt="=слайд"
                          />
                        </div>
                      )) || (
                        <div className="carousel-item ">
                          <img
                            className="d-block w-100"
                            src={imageSrc}
                            alt="=слайд"
                          />
                        </div>
                      )
                  )}
                </div>

                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
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
            </div>
          </Container>
        </>
      );
  }
}
