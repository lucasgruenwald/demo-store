import './categories.styles.scss'

const App = () => {

  const categories = [
    {
      id: 1,
      title: 'In Stock',
    },
    {
      id: 2,
      title: 'New Items',
    },
    {
      id: 3,
      title: 'Upholstery',
    },
    {
      id: 4,
      title: 'Bradington Young',
    },
    {
      id: 5,
      title: 'Sam Moore',
    }
  ]

  return (
    <div className="categories-container">
      {categories.map(({title, id}) => (
        <div key={id} className="category-container">
        <div className="background-image"/>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
      ))}
      
      
    </div>
  );
}

export default App;
