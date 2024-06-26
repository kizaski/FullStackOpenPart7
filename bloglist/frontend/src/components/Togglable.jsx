import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className="pb-2">
      <div style={hideWhenVisible}>
        <button
          className="m-2 rounded-md p-2 outline-double"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="m-2 rounded-md px-2 py-1 outline-double"
          onClick={toggleVisibility}
        >
          {props.buttonHideLabel}
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
