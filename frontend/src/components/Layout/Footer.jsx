import { Container, Row, Col } from "reactstrap"
import Heart from '../../assets/images/heart.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="ftfx">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © INVOIS.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                Made with love <img src={Heart} width={30} alt="animated-heart" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
