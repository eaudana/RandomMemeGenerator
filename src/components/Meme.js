import "./Meme.css";
import axios from "axios";
import { useState, useEffect } from "react";



export default function Meme() {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(null);

  const getMemes = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(response.data.data.memes);
    } catch (e) {
      console.log("An error occurred: ", e);
    }
  };

  useEffect(() => {
    getMemes();
  }, []);

  function generateMeme() {
    if (memes.length > 0) {
      const randomIndex = Math.floor(Math.random() * memes.length);
      setCurrentMeme(memes[randomIndex]);
    }
  }

  // function downloadMeme() {
  //   if (currentMeme) {
  //     const link = document.createElement('a');
  //     link.href = currentMeme.url;
  //     link.download = currentMeme.name;
  //     link.click();
  //   }
  // }

  async function downloadMeme() {
    if (currentMeme) {
      try {
        const response = await axios.get(currentMeme.url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${currentMeme.name}.jpg`;
        link.click();
        window.URL.revokeObjectURL(link.href);
      } catch (e) {
        console.log("An error occurred while downloading the meme: ", e);
      }
    }
  }
  
  return (
    <div className="form">
      <button className="form-button" onClick={generateMeme}>Generate Meme</button>
      {currentMeme && (
        <div className="meme-container">
          <h3>{currentMeme.name}</h3>
          <img
            src={currentMeme.url}
            alt={currentMeme.name}
            style={{ width: "300px", height: "auto" }}
          />
           <button className="download-button" onClick={downloadMeme}>Download Meme</button>
        </div>
      )}
    </div>
  );
}
