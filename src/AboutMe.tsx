import { Button ,Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './App.css';


const AboutMe: React.FC = () => {
   const navigate = useNavigate();
   const goToHome = () => {
    navigate('/');
   }
   <Button onClick={() => navigate('/')} variant="primary" className="home-button">Go to Home</Button>
   return(
      <><header style={{ backgroundColor: '#FFECCC' }} /><Container>
           <Button onClick={goToHome} variant="primary" style={{
               position: 'absolute', left: '30px', top: '30px', width: '150px', height: '50', backgroundColor: '#053225'}}>
                Go to Home</Button>
       </Container></>
   )
}
export default AboutMe;