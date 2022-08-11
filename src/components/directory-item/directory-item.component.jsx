import './directory-item.styles.scss'
import * as Sentry from "@sentry/react";
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {

    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => {
        Sentry.addBreadcrumb({
            category: "directory",
            message: `Custom Breadcrumb: Clicked category ${title}`,
        });
        navigate(route);
    }

    return(
        <div className="directory-item-container" onClick={onNavigateHandler}>
            <div className="background-image" style={{'backgroundImage': `url(${imageUrl})`}}/>

            <div className="body">
                <h2>{title}</h2>
            </div>
      </div>
    );
}

export default DirectoryItem;