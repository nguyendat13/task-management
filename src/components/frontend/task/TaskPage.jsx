import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import TaskMenu from "./TaskMenu";

const TaskPage =()=> {
      const [menuOpen, setMenuOpen] = useState(false);
    
  return (
    <>
      {/* Button mở menu (chỉ hiện khi menu đóng) */}
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="absolute top-6 left-8 z-20 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all"
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          )}
     {/* Task menu (truyền props) */}
      <TaskMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </>
   
  );
};

export default TaskPage;
