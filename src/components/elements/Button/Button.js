import PropTypes from 'prop-types';

const Button = ({ title, color, click}) => {
    return (
        <button className="btn" style={{ backgroundColor: color}} onClick={click}>{title}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Button
