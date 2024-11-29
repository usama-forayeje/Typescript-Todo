import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";function Footer() {
  return (
    <footer>
    <div className="social-icons">
      <a href="https://www.facebook.com/usama.forayaje?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
        <FaFacebook /> {/* Facebook Icon */}
      </a>
      <a href="https://x.com/forayaje53234" target="_blank" rel="noopener noreferrer">
        <FaTwitter /> {/* Twitter Icon */}
      </a>
      <a href="https://github.com/usama-forayeje" target="_blank" rel="noopener noreferrer">
        <FaGithub /> {/* GitHub Icon */}
      </a>
      <a href="https://www.linkedin.com/in/usama-forayaje/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin /> {/* LinkedIn Icon */}
      </a>
    </div>
  </footer>

  )
}

export default Footer