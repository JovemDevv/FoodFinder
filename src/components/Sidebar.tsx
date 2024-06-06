import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import mapMarkerImg from '../images/FoodFinder-icon.png'

import '../styles/components/sidebar.css'
import { useHistory } from 'react-router-dom'

export default function Sidebar() {
  const history = useHistory()

  return (
    <aside className='app-sidebar'>
        <img src={mapMarkerImg} alt="finder" />

        <footer>
          <button type="button" onClick={() => history.goBack()}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

  )
}