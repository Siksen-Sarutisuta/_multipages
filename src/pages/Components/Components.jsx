import Counter from "../../components/counter/counter";
import Timer from "../../components/Timer";
import "./Components.css";
import "../../components/Timer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Add from "../../components/Add/Add";
import Temp from "../../components/temp/temp";

function Components() {
  let value = 0;

  return (
    <>
      <div className="Name">
        <h3>REACT COMPONENTS</h3>
      </div>
      <div className="components"> {/* Corrected this line */}
        <div className="main-content">
          <div className="counter-timer">
            <div className="counter-container">
              <Counter name={"Counter"} value={value} />
            </div>
            <div className="timer-container">
              <Timer />
            </div>
          </div>
          <div className="add-container">
            <Add aValue={10} bValue={20} />
          </div>
        </div>
        <div className="temp-container">
          <Temp />
        </div>
        <div className="Name">
          <h3>นายศิกเษณย์ ศรุติสุต รหัส 66062718</h3>
        </div>
      </div>
    </>
  );
}


export default Components;
