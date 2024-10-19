import { Container,Button } from 'react-bootstrap';
import './App.css';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate(); 
  
    const goToHome = () => {
      navigate('/');
    };
  
  
    return (
      <Container style={{ marginTop: '30px', width: '1000px', height: '500px', marginBottom: '200px'}}>
        <header className="App-Header" style={{ padding: '20px' }}>
            <h1>Career Quiz</h1>
            <div>By: Morgan Nutto, Leah Marcelli, Kate Geiszler</div>
          </header>
        <Container style={{ border: '1px solid black', padding: '30px', width: '1000px', height: '400px' }}>
          <h2> Congrats! You finished the Quiz</h2>

          <Button onClick={goToHome} variant="primary"style ={{position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50'}}>
            Go to Home
          </Button>
       </Container>
      </Container>
    )
  }
  export default HomePage;