import logo from './logo.svg';
import './App.css';

function MapComponent() {
  return (
    <div className="MapComponent">
      <header className="MapComponent-header">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4485751.709027774!2d-157.505!3d20.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bffdb064f79e005%3A0x4b7782d274cc8628!2sHawaii!5e1!3m2!1sen!2sus!4v1749844644497!5m2!1sen!2sus" 
        width="800" 
        height="650" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        location= "Hawaii">
          </iframe> 
      </header>
    </div>
  );
}


export default MapComponent;
