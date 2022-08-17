import './directory.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component';

// save these imports to add entries to firebase 
// import { useEffect } from 'react';
// import { addCollectionAndDocuments } from '../../utils/firebase/firebase.utils';
// import SHOP_DATA from '../../shop-data';

  const categories = [
    {
        id: 1,
        title: 'Leashes',
        imageUrl: 'https://www.earthdog.com/resize/Shared/Images/Product/solid-hemp-leashes/leashes-hanging.jpg?bw=500&bh=500',
        route: 'shop/leashes'
      },
      {
        id: 2,
        title: 'Harnesses',
        imageUrl: 'https://www.rei.com/media/59afcec8-4b98-45c6-bff4-97fb2c3822b1?size=784x588',
        route: 'shop/harnesses'
      },
      {
        id: 3,
        title: 'Collars',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0153/0485/1556/products/collar-eton-dog-collar-2_d2138917-055f-4164-a1ce-ad7c711b9bd5_900x.jpg?v=1619029896',
        route: 'shop/collars'
      },
      {
        id: 4,
        title: 'Bandanas',
        imageUrl: 'https://m.media-amazon.com/images/I/91Wlp-TEkOL._AC_SX466_.jpg',
        route: 'shop/bandanas'
      },
      {
        id: 5,
        title: 'Accessories',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/56b7d0fbd51cd4ba74a56129/1614202128733-KISIH05TRWVS0HIYM3G3/112+%E2%80%94%E2%80%94+fd+-+dog+bowl+-+mix+-+group+%E2%80%94+32909.jpg?format=1000w',
        route: 'shop/accessories'
      }
   ]
        
  const Directory = () => {

    // useEffect(() => {
    //   addCollectionAndDocuments('categories', SHOP_DATA)
    // })
    
    return(
      <div aria-label="Directory Container" className="directory-container">
        {categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
    </div>
    )
  }

  export default Directory;