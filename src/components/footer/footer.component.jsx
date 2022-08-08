import './footer.styles.scss'

const Footer = () => {

  return(
    <div className='footer-container'>
      <div>
        <p>Website by Luke Gruenwald</p>
      </div>
      <div>
        <a href="https://linkedin.com/in/lucasgruenwald" target="_blank">
          <img
            id="foot-1"
            src="https://img.icons8.com/plasticine/2x/linkedin.png"
          />
        </a>
        <a href="https://github.com/lucasgruenwald" target="_blank">
          <img
            id="foot-2"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          />
        </a>
      </div>
    </div>
  )
}

export default Footer;