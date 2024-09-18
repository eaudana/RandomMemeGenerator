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


  async function downloadMeme() {
    if (currentMeme) {
      try {
        /*This line makes an HTTP request to get data from currentMeme.url. The await keyword tells JavaScript to wait until the data is received. The response is expected in the form of a "blob" (which is binary data, like an image or file).

 */
        const response = await axios.get(currentMeme.url, {
          responseType: "blob",
        });

        //This creates a new Blob object from the response.data (the downloaded file) and specifies its type (like "image/jpeg") using the content type provided in the server's response headers.
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const link = document.createElement("a");

        //This converts the Blob data into a URL that can be used as the href for the link element, allowing it to point to the downloaded file.
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
      <button className="form-button" onClick={generateMeme}>
        Generate Meme
      </button>
      {currentMeme && (
        <div className="meme-container">
          <h3>{currentMeme.name}</h3>
          <img
            src={currentMeme.url}
            alt={currentMeme.name}
            style={{ width: "300px", height: "auto" }}
          />
          <button className="download-button" onClick={downloadMeme}>
            Download Meme
          </button>
        </div>
      )}
    </div>
  );
}
