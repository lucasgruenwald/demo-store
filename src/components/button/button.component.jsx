import './button.styles.scss';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted'
};

const Button = ({ children, buttonType, isLoading = false, ...otherProps }) => {

  return(
    <button disabled={isLoading} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
      {isLoading ? <div className='loading-spinner'></div> : children}
    </button>
  );
};

export default Button;