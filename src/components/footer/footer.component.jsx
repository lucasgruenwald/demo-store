import './footer.styles.scss'
// import * as Sentry from "@sentry/react";

const Footer = () => {

  const function418 = async (event) => {
    event.preventDefault();
    // Sentry.addBreadcrumb({
    //   category: "directory",
    //   message: "Custom Breadcrumb: Clicked Teapot",
    // });
    const response = await fetch('http://httpstat.us/418', {})
  }

  return(
    <div className='footer-container'>
      <div>
        <p>Website by Luke Gruenwald</p>
      </div>
      <div>
        <a href="https://linkedin.com/in/lucasgruenwald" target="_blank">
          <img
            alt="linkedin"
            id="foot-1"
            src="https://img.icons8.com/plasticine/2x/linkedin.png"
          />
        </a>
        <a href="https://github.com/lucasgruenwald" target="_blank">
          <img
            alt="github"
            id="foot-2"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          />
        </a>
        <a aria-label="Teapot Icon" onClick={function418}>
          <img 
            alt='teapot'
            id="foot-3"
            src="https://img.freepik.com/premium-vector/teapot-illustration-cartoon_262962-90.jpg?w=2000"
          />
        </a>
      </div>
    </div>
  )
}

export default Footer;