import './App.css';
{/* import DarkMode from './DarkMode.tsx';*/ }
import sunImage from './assets/sun.jpg';
import AdditionalInfo from './AdditionalInfo.tsx';


function App() {
  return <>
    {/* <div><DarkMode /></div> */}
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand nav-font" href="#">spacechurro</a>
      </div>
    </nav>
    <div className="space-gradient-background" />
    <div className="space-gradient-background-2" />
    <div className="left-container mb-3">
      <div className="mt-3 image-container">
        <img src={sunImage} alt="Sun" />
      </div>
      <div className="mt-1 input-group">
        <button className="btn bg-body-secondary" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
        <input type="text" className="form-control" placeholder="Enter Celestial Body" />
        <button className="btn bg-body-secondary" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <label>Find</label>
        </button>
      </div>
      <div className="mt-1 form-group">
        <textarea
          className="form-control bg-secondary text-white"
          id="outputBox"
          rows={8}
          readOnly
        >
          Server Response Here.
        </textarea>
      </div>
    </div>
    <div><AdditionalInfo /></div>
  </>
}

export default App;
