import PropTypes from 'prop-types';


const Button = ({color, text, onClick}) => {
  // const onClick = () => {   // because it is not going to have the same click
  //                           // it is better off as props 
  //   console.log(e)
  //}
  return (
    <button onClick={onClick}  // setting this 
    style={{ backgroundColor: color}}
      className='btn'>
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
