import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/app.css";
//Нужен ли этот файл
class Recomend extends React.Component {
  render(props) {
    return (
      <>
        <Row style={{ margin: "2em" }}>
          <Row>
            <Col>
              {" "}
              <img className="Storyimg" src={this.props.url} />
              <b style={{ "margin-left": "2em", "margin-top": "-2em" }}>
                {this.props.name}
              </b>
              <br />
              <small
                style={{
                  "margin-left": "6em",
                  "margin-top": "-1em !impoertant",
                }}
              >
                Follows you
              </small>
            </Col>
          </Row>
          <Col style={{ "margin-top": "0.8em", "margin-left": "2em" }}>
            <a href="/">Follow </a>
          </Col>
        </Row>
      </>
    );
  }
}

export default Recomend;
