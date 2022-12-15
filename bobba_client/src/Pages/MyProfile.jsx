import React from "react";
import Header from "../components/Header";
import Content from "../components/content";
import RightBar from "../components/rightbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../styles/app.css";


export default class MyProfile extends React.Component {
    render() {
      return (
        <>
        
        <Header />

          <Col>
            <Container>
            MyProfile
            </Container>
          </Col>
        </>
      );
    }
  }
  