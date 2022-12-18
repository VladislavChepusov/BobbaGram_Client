import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Client } from "../LogicApi/ApiModels";
import "../styles/app.css";
import { Cookies } from "react-cookie";
export default class Header extends React.Component {

  /*
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null,
    };
  }

*/


  _LogOut(e) {
    var connect = new Client("https://localhost:7277");
    connect.logOut();
    var cookies = new Cookies();
    var date = new Date();
    date.setDate(date.getDate() - 1);
    cookies.set("accessToken", "Удален ", {
      path: "/",
      expires: date,
    });
    localStorage.removeItem("refreshToken");
  }

  render() {
    return (
      <Navbar className="bar auth-wrapper" fixed="top" bg="light" expand="lg">
        <Container>
          <Row>
            <Navbar.Brand href="StartPage">BobbaGram</Navbar.Brand>
          </Row>
          <Row>
            <Form inline = "true">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Row>
          <Row className="last-Row">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/StartPage">
                  <i className=" home icon big"></i>
                </Nav.Link>

                <Nav.Link href="link">
                  <i className="plus square icon big"></i>
                </Nav.Link>
                <Nav.Link href="link">
                  <i className="star  icon big"></i>
                </Nav.Link>

                <Nav.Link href="/setting">
                  <i className=" setting icon big"></i>
                </Nav.Link>

                <Nav.Link className="headerLink" href="/profile">
                  <i className=" user icon big"></i>
                </Nav.Link>

                <Nav.Link href="/" onClick={this._LogOut}>
                  <i className=" logout icon big"></i>
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Row>
        </Container>
      </Navbar>
    );
  }
}
