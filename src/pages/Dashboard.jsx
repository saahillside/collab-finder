import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader'
// import TipOfTheDay from '../components/dashboard/TipOfTheDay';
import CreateCollabButton from '../components/dashboard/CreateCollabButton';
import RecentAddedCollabs from '../components/dashboard/RecentAddedCollab';


const Dashboard = () => {
  return (
    <div className="bg-black min-h-screen">
        <DashboardHeader />
         <div className="p-4 space-y-8">

            {/* <div className="bg-black p-6 rounded-xl shadow-md"> */}
              <RecentAddedCollabs isGlobal = {false} isHome = {true} />
            {/* </div> */}
            
            {/* <div className="bg-black p-6 rounded-xl shadow-md"> */}
            <RecentAddedCollabs isGlobal = {true} isHome = {true}/>

            {/* </div> */}
            
        </div>
    </div>
  );
};

export default Dashboard;
