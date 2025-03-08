import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import './Index.css';
import { PlayCircle } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();
const [isOpen, setIsOpen] = useState(false);

  // Video URLs for different languages
  const videos = {
    en: "https://www.youtube.com/embed/N-xhvzPONxA", // English Video
    hi: "https://www.youtube.com/embed/exampleHindi", // Hindi Video (Replace with actual link)
    te: "https://www.youtube.com/embed/1dunLe5SicU"  // Telugu Video
  };

  // Get the selected language from localStorage or default to i18n.language
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || i18n.language);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    setSelectedLanguage(newLanguage); // Update selected language state
  };


  return (
    <div className='index-bg'>
      <div className="index-container">
        <div className="index-card">
          <h1 className="index-title">{t('welcome')}</h1>
          <p className="index-description">{t('description')}</p>

          <div className="language-select">
            <label htmlFor="language">{t('select_language')}:</label>
            <select id="language" onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="te">తెలుగు</option>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mb-8">
            <div className="tv">{t('tutorial_video')}</div>
      {/* Video Icon */}
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <PlayCircle size={40} className="text-blue-600 hover:text-blue-800 transition" />
      </button>

      {/* Video Modal (Popup) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            {/* Embedded Video */}
            <iframe
  width="600"
  height="350"
  src={videos[selectedLanguage]}
  title="Video"
  frameborder="0"
  allowfullscreen
></iframe>

          </div>
        </div>
      )}
    </div><br/>
          <div className="button-group">
            <Link to="/signup" className="index-button signup-button">{t('signup')}</Link>
            <Link to="/login" className="index-button login-button">{t('login')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
