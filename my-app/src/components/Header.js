import PropTypes from 'prop-types';
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => { // destructured object for props instead of props 
  
  return (
    <header className='header'> 
      <h1> {title}</h1>
      <Button 
        color={showAdd ? 'red': 'green'}
        text={showAdd ? 'Close': 'Add'} 
        onClick={onAdd}></Button>  
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
