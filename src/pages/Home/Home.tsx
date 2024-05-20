import "./Home.css"

function HomeComponent() {
  return (
    <>
      <div className="container HomeComponent">
        <div className="row" style={{display:'flex'}}>
          <div className="col-sm-8">
            <div className="HomeText">
              <h1>Witaj,</h1>
              <br></br>
              <h2>Zaloguj się, aby przejść dalej</h2>
            </div>
          </div>
          <div className="col-sm-4">
            <button className="btnn">Zaloguj Się</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;