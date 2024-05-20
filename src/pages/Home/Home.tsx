import "./Home.css"

function HomeComponent() {
  return (
    <>
      <div className="container HomeComponent">
        <div className="row" style={{display:'flex', flexDirection:'column'}}>
          <div className="col1">
            <div className="HomeText">
              <h1>Witaj,</h1>
              <br></br>
              <h2>Zaloguj się, aby przejść dalej</h2>
            </div>
          </div>
          <div className="col2">
            <button className="btnn">Zaloguj Się</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;