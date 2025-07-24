import React from 'react';
import { Plus } from 'lucide-react';

const CreateCollabButton = () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 shadow-md flex items-center gap-2 transition-all duration-200">
      <Plus size={20} />
      Create Collab
    </button>
  );
};

export default CreateCollabButton;
