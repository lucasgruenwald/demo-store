import { Outlet } from 'react-router-dom'

import Directory from '../../components/directory/directory.component'
import Footer from '../../components/footer/footer.component'

const Home = () => {

        return (
          <div>
            <Directory />
            <Outlet />
            <Footer />
          </div>
        )
}


  export default Home;
