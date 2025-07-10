import './style/mobileschedule.css';
import MobileSearchbarHeader from '../../components/MobileSearchbarHeader';
import MobileScheduleCard from '../../components/MobileScheduleCard';
import { useGetScheduledLeadsQuery } from '../../redux/slices/API/lead.apiSlice';
import { useSelector } from 'react-redux';

function MobileSchedule() {
  const { user } = useSelector((state) => state.user);
  const {data: leads} = useGetScheduledLeadsQuery({user: user?._id || ''});
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