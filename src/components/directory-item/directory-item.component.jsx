import './directory-item.styles.scss'
// import * as Sentry from "@sentry/react";
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {

    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => {
        // Sentry.addBreadcrumb({
        //     category: "directory",
        //     message: `Custom Breadcrumb: Clicked category ${title}`,
        // });
        navigate(route);
    }

    return(
        <div aria-label={`${title} Directory Container`} className="directory-item-container" onClick={onNavigateHandler}>
            <div aria-label={`${title} Directory Background`} className="background-image" style={{'backgroundImage': `url(${imageUrl})`}}/>

            <div aria-label={`${title} Directory Text Body`} className="body">
                <h2 aria-label={`${title} Directory Title`}>{title}</h2>
            </div>
      </div>
    );
}

export default DirectoryItem;