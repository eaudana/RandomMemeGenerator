import "./Footer.css";
import githubLogo from "../assets/github-logo.png";

export default function Footer() {
  return (
    <div>
      <footer>
        <img src={githubLogo} alt="GitHub Logo" />
        <a className="pacifico-regular" href="https://github.com/eaudana">
          Github: eaudana
        </a>
      </footer>
    </div>
  );
}
