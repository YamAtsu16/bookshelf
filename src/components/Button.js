import PropTypes from 'prop-types';

const Button = ({ onClick, children, style, className }) => {
  return (
    <button className={`btn ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Button;
