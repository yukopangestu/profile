import logo from './logo.svg';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div class="profile-container">
        <div class="profile-header">
            <img src="profile-picture.jpg" alt="Profile Picture" class="profile-picture"></img>
            <h1>Yuko Pangestu</h1>
            <p>Tech Lead | Web Developer | Teamplayer</p>
        </div>

        <div class="section">
            <h2>About Me</h2>
            <p>In need of passionate website programmer? Here I am. I am ready to take any challenge that comes into me.</p>
        </div>

        <div class="section">
            <h2>Skills</h2>
            <ul>
                <li>HTML5 & CSS3</li>
                <li>JavaScript</li>
                <li>Responsive Design</li>
                <li>UI/UX Design</li>
            </ul>
        </div>

        <div class="section">
            <h2>Contact</h2>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <i class="bi bi-mailbox"></i>
                <p style={{marginLeft: '10px'}}> <a href="mailto:yuko.pangestu@gmail.com" target='_blank' rel='noreferrer'>yuko.pangestu@gmail.com</a></p>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <i class="bi bi-linkedin"></i>
                <p style={{marginLeft: '10px'}}><a href='https://www.linkedin.com/in/yukopangestu' target='_blank' rel='noreferrer'>yukopangestu</a></p>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <i class="bi bi-github"></i>
                <p style={{marginLeft: '10px'}}><a href="https://github.com/yukopangestu" target='_blank' rel='noreferrer'>github.com/yukopangestu</a></p>
            </div>
        </div>
    </div>
  );
}

export default App;
