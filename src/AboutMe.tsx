import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';
import kate from './Images/about_me_pic.jpg';
import leah from './Images/leah.jpg';
import morgan from './Images/morgan.jpg';
//import background from './Images/background.jpg';


function AboutMe() {
  const navigate = useNavigate();

  return (
    <>
      <header style={{ backgroundColor: '#FFECCC' }} />
      <Container className= "about-me-background" fluid style={{ backgroundColor: '#FFECCC', minHeight: '100vh', paddingTop: '50px' }}>
        <Button onClick={() => navigate('/')} variant="primary" className="home-button">Go to Home</Button>
        <h1 className = 'about-me-header' style={{ fontFamily: "palatino", textAlign: "center" }}>About Us!</h1>
        <Row>
          <Container className="about-me-container">
            <Row>
              <Col md={8}>
                <h2>Kate Geiszler</h2>
                <p>Kate Geiszler is a senior at the University of Delaware, majoring in Chemical Engineering with a minor in Computer Science.
                  She is passionate about pursuing a career in process engineering but has always wanted to explore software engineering for fun.
                </p>
              </Col>
              <Col md={4} style={{ marginRight: 'auto' }}>
                <img className='about-me-image' src={kate} alt="kate" />
              </Col>
            </Row>
          </Container>

        </Row>

        <Row>
          <Col>
            <Container className="about-me-container" style={{ textAlign: "right", marginLeft: "auto" }}>
              <Row>
                <Col md={4} style={{ marginRight: 'auto' }}>
                  <img className='about-me-image' src={leah} alt="Leah" /> {/*change picture lol*/}
                </Col>
                <Col md={6}>
                  <h2>Leah Marcelli</h2>
                  <p>Leah Marcelli is a senior at the University of Delaware. She currently studies Mathematics with minors in
                    Computer Science and Statistics. She is very excited to be working on this project to gain experience in software engineering.</p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row>
          <Container className="about-me-container">
            <Row>
              <Col md={8}>
                <h2>Morgan Nutto</h2>
                <p>Morgan Nutto is a Senior at the University of Delaware, studying Computer Science with a minor in Linguistics.
                  She also hopes to pursue a career in the Artificial Intelligence field after graduation with a focus on Natural Language Processing.</p>
              </Col>
              <Col md={4} style={{ marginRight: 'auto' }}>
                <img className='about-me-image' src={morgan} alt="Morgan" /> 
              </Col>
            </Row>
          </Container>

        </Row>

      </Container>
    </>
  );
}

export default AboutMe;
