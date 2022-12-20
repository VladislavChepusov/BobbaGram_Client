import React from "react";
import Header from "../components/Header";
import Content from "../components/content";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import Container from "react-bootstrap/Container";
import "../styles/app.css";
import NotFoundPage from "./NotFoundPage";
export default class StartPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      redirect: false,

      Contents: null,

    };
  }


 // подгрузка данных
 componentDidMount(prevProps) {
  // Рефрешы токенов
  TokenMidelware();
  var connect = new Client("https://localhost:7277");
  var UserData = connect.getSubscriptionPosts();
  UserData.then((res) => {

    console.log("startPageres", res);
    this.setState({
      Contents:res,
      isLoaded: true,
        error: false,

    });
    return res.id;
  }).catch((error) => {
    console.log("startPageError", error);
    this.setState({
      error: true,
      isLoaded: true,
    });
  });
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
      return <div>Загрузка....</div>;
    } else

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
                      name={_item.author.name}
                      time= {_item.created}
                      contents={_item.contents}
                      user={
                        _item.author.avatarLink !== null
                          ? "https://localhost:7277" +
                          _item.author.avatarLink
                          : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                      }
                      likes="5k liked"
                      description={_item.description}

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
