import React from 'react'
import './style/mobileschedule.css';
import MobileSearchbarHeader from '../../components/MobileSearchbarHeader';
import MobileScheduleCard from '../../components/MobileScheduleCard';

function MobileSchedule() {
  return (
    <div className="mobile-schedule-container">
        <MobileSearchbarHeader />
        <div className='mobile-schedule-list'>
            <MobileScheduleCard />
            <MobileScheduleCard />
            <MobileScheduleCard />
            <MobileScheduleCard />
        </div>
    </div>
  )
}

export default MobileSchedule