import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../components/DashProfile.jsx';
import DashSidebar from '../components/DashSidebar.jsx';
import DashPosts from '../components/DashPosts.jsx';
import DashUsers from '../components/DashUsers.jsx';
import DashComments from '../components/DashComments.jsx';
import DashboardComp from '../components/DashboardComp.jsx';

export default function Dashboard() {
  // find on which tab the user is (/dashboard?tab=profile)
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search] )
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* profile  */}
      {tab === 'profile' && <DashProfile />}
      {/* posts  */}
      {tab === 'posts' && <DashPosts />}
      {/* users  */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard component  */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}
