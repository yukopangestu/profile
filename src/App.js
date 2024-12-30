import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="profile-container">
        <div class="profile-header">
            <img src="profile-picture.jpg" alt="Profile Picture" class="profile-picture"></img>
            <h1>Yuko Pangestu</h1>
            <p>Web Developer | Designer</p>
        </div>

        <div class="section">
            <h2>About Me</h2>
            <p>Passionate web developer with experience in creating responsive and user-friendly websites. Skilled in HTML, CSS, and JavaScript.</p>
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
            <p>Email: yuko.pangestu@gmail.com</p>
            <p>LinkedIn: <a href='https://www.linkedin.com/in/yukopangestu' target='_blank'>yukopangestu</a></p>
            <p>GitHub: github.com/johndoe</p>
        </div>
    </div>
  );
}

export default App;
