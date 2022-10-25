import React from 'react'
import { useAppContext } from '../context'

const ViewSelector = () => {
  const {state, changeView} = useAppContext()
  
  const onSelectView = ({target: {value}}) => {
    changeView(value)
  }

  return (
    <div className='view-selector-wrapper'>
      <select className="dropdown" value={state.view} onChange={onSelectView}>
        <option value="list">LIST</option>
        <option value="grid">GRID</option>
      </select>
    </div>
  )
}

export default ViewSelector