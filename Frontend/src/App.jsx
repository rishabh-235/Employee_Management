import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DesktopMainPage from './pages/desktoppages/DesktopMainPage';
import DashboardPage from './pages/desktoppages/DashboardPage';
import LeadsPage from './pages/desktoppages/LeadsPage';
import EmployeesPage from './pages/desktoppages/EmployeesPage';
import SettingsPage from './pages/desktoppages/SettingsPage';
import ProfilePage from './pages/desktoppages/ProfilePage';
import MobileMainPage from './pages/mobilepages/MobileMainPage';
import MobileDashBoard from './pages/mobilepages/MobileDashBoard';
import MobileLeads from './pages/mobilepages/MobileLeads';
import MobileSchedule from './pages/mobilepages/MobileSchedule';
import MobileProfile from './pages/mobilepages/MobileProfile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/admindashboard' element={<DesktopMainPage />}>
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='leads' element={<LeadsPage />} />
            <Route path='employees' element={<EmployeesPage />} />
            <Route path='settings' element={<SettingsPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='logout' element={<ProfilePage />} />
          </Route>

          <Route path='/employeedashboard' element={<MobileMainPage />}>
            <Route path='dashboard' element={<MobileDashBoard />} />
            <Route path='leads' element={<MobileLeads />} />
            <Route path='schedule' element={<MobileSchedule />} />
            <Route path='profile' element={<MobileProfile />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App