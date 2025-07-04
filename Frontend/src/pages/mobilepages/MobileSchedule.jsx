import './style/mobileschedule.css';
import MobileSearchbarHeader from '../../components/MobileSearchbarHeader';
import MobileScheduleCard from '../../components/MobileScheduleCard';
import { useGetScheduledLeadsQuery } from '../../redux/slices/API/lead.apiSlice';

function MobileSchedule() {
  const {data: leads} = useGetScheduledLeadsQuery();
  return (
    <div className="mobile-schedule-container">
        <MobileSearchbarHeader />
        <div className='mobile-schedule-list'>
            {leads?.map(lead => (
              <MobileScheduleCard key={lead._id} lead={lead} />
            ))}
        </div>
    </div>
  )
}

export default MobileSchedule