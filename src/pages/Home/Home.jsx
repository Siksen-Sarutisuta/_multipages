import "./Home.css";
import myImage from "../../IMG/438051564_1218873432408257_6568321225370464418_n.jpg";
const Home = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {/* Instructor Image */}
        <div style={{ flex: 1 }}>
          <img
            src={myImage}
            alt="Instructor"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>

        {/* Course Information */}
        <div style={{ flex: 2 }}>
          <h2 style={{ color: "#333" }}>
            CSI205 Front End Software Development
          </h2>
          <p>My Coding skills</p>
          <ul>
            <li>
              <b>HTML:</b> (HyperText Markup Language): It’s the structure of a webpage, like the skeleton. It defines the layout and content (e.g., text, images) on the web.
            </li>
            <li>
              <b>CSS:</b> It’s the design of the webpage. CSS styles the HTML by adding colors, fonts, spacing, and layouts.
            </li>
            <li>
              <b>JS:</b> It’s the brain of the webpage. JS makes the webpage interactive, like handling button clicks or loading data without refreshing the page.
            </li>
            <li>
              <b>React:</b> A JavaScript library for building dynamic web apps. It helps create reusable components (like building blocks) to make development faster and more efficient.
            </li>
            <li>
              <b>Python:</b> A popular programming language known for being easy to read and versatile. It’s used in web development, data science, automation, and more.
            </li>
          </ul>
          
        </div>
      </div>

      {/* Instructor Information */}
      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #ddd",
          paddingTop: "20px",
        }}
      >
        <p>
          <h3><strong>Siksen Sarutisuta</strong></h3>
          <br />
          Computer Science and Software Development Innovation Dept. (CSI)
          <br />
          Sripatum University (SPU)
        </p>
      </div>
    </div>
  );
};

export default Home;
