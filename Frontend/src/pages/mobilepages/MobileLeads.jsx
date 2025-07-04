import "./style/mobileleads.css";
import MobileSearchbarHeader from "../../components/MobileSearchbarHeader";
import MobileLeadCard from "../../components/MobileLeadCard";
import { useSelector } from "react-redux";

function MobileLeads() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="mobile-leads-container">
      <MobileSearchbarHeader />
      <div className="mobile-leads-list">
        {user?.assignedLeads?.map((lead, index) => (
          <MobileLeadCard key={index} lead={lead} />
        ))}
      </div>
    </div>
  );
}

export default MobileLeads;
