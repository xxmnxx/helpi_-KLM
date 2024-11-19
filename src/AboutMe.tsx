import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';


const AboutMe: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <header style={{ backgroundColor: '#FFECCC' }} />
      <Container fluid style={{ backgroundColor: '#FFECCC', minHeight: '100vh', paddingTop: '50px' }}>
      <Button onClick={() => navigate('/')} variant="primary" className="home-button">Go to Home</Button>
        <Row className="mt-5">
          <Col>
            <h2>Kate Geiszler</h2>
            <p>Kate .... edit</p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h2>Leah Marcelli</h2>
            <p>Leah Marcelli is a senior at the University of Delaware. She currently studies Mathematics with minors in 
               Computer Science and Statistics. She is very excited to be working on this project to gain experience in software development .</p>

          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h2>Morgan Nutto</h2>
            <p>Moran .. edit</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutMe;
