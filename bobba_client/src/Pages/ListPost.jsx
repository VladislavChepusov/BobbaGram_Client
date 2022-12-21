import React from "react";
import Header from "../components/Header";
import Content from "../components/content";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/app.css";
import { UserNameInToken } from "../LogicApi/Tokens";
export default class ListPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Contents: [],
    };
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    this.setState({
      Contents: this.props.POSTS,
    });
  }

  render() {
    return (
      <>
        <Header />
        <Row>
          <Col>
            <Container>
              <Container>
                <div className="Main">
                  {this.state.Contents.map((_item, index) => (
                    <Content
                      POSTINDEX={index}
                      name={_item.author.name}
                      time={_item.created}
                      contents={_item.contents}
                      user={
                        _item.author.avatarLink !== null
                          ? "https://localhost:7277" + _item.author.avatarLink
                          : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                      }
                      likes={_item.likesCount}
                      description={_item.description}
                      PostId = {_item.id}
                      RealSlimShady = { UserNameInToken()}
                    />
                  ))}
                </div>
              </Container>
            </Container>
          </Col>
        </Row>
      </>
    );
  }
}
