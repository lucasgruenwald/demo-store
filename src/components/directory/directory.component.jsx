import './directory.styles.scss'
import CategoryItem from '../category-item/category-item.component'

const directoryArray = [
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

  const Directory = ({categories}) => {
    return(
      <div className="directory-container">
      {directoryArray.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
    )
  }

  export default Directory;