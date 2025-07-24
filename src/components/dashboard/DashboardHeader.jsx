// import React from 'react';

// const DashboardHeader = () => {
//   return (
//     <div className="w-full h-60 bg-[#1e293b] flex items-center justify-center text-center shadow-md pl-8">
//       <h1 className="text-4xl md:text-5xl font-semibold text-white">
//         hello <span className="text-blue-400">Saahil</span>, ready to create?
//       </h1>
//     </div>
//   );
// };

// export default DashboardHeader;


import React from 'react';
import bwstudio from '../../images/bwstudio.jpg';
import {useAuth} from '../../context/AuthContext'

const DashboardHeader = () => {
  const {currentUser} = useAuth();

  return (
    <div
      className="w-full h-60 bg-[center_top_20%] bg-cover bg-no-repeat flex items-center justify-center text-center shadow-md relative"
      style={{
        backgroundImage: `url(${bwstudio})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Text */}
      <h1 className="text-4xl md:text-5xl font-semibold text-white relative z-10">
        hello <span className="text-blue-400">{currentUser}</span>, ready to create?
      </h1>
    </div>
  );
};

export default DashboardHeader;
