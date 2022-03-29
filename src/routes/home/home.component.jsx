import { Outlet } from 'react-router-dom'

import Directory from '../../components/directory/directory.component'

const Home = () => {
    const categories = [
        {
            id: 1,
            title: 'Title 1',
            imageUrl: 'https://ak.picdn.net/shutterstock/videos/19762045/thumb/1.jpg',
          },
          {
            id: 2,
            title: 'Title 2',
            imageUrl: 'https://ak.picdn.net/shutterstock/videos/19762045/thumb/1.jpg',
          },
          {
            id: 3,
            title: 'Title 3',
            imageUrl: 'https://ak.picdn.net/shutterstock/videos/19762045/thumb/1.jpg',
          },
          {
            id: 4,
            title: 'Title 4',
            imageUrl: 'https://ak.picdn.net/shutterstock/videos/19762045/thumb/1.jpg',
          },
          {
            id: 5,
            title: 'Title 5',
            imageUrl: 'https://ak.picdn.net/shutterstock/videos/19762045/thumb/1.jpg',
          }
        ]

        return (
          <div>
            <Outlet />
            <Directory categories={categories}/>
          </div>
        )
}


  export default Home;
