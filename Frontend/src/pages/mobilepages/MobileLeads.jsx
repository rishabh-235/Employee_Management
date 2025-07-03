import React from 'react'
import './style/mobileleads.css';
import MobileSearchbarHeader from '../../components/MobileSearchbarHeader';
import MobileLeadCard from '../../components/MobileLeadCard';

function MobileLeads() {
  return (
    <div className='mobile-leads-container'>
      <MobileSearchbarHeader />
      <div className='mobile-leads-list'>
        <MobileLeadCard />
        <MobileLeadCard />
        <MobileLeadCard />
        <MobileLeadCard />
      </div>
    </div>
  )
}

export default MobileLeads