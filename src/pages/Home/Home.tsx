import "./Home.css"

function HomeComponent() {
  return (
    <>
      <div className="HomeComponent">
        <div className="row">
          <div className="col-sm-8 HomeText">
            <h1>Witaj,</h1>
            <br></br>
            <h2>Zaloguj się, aby przejść dalej</h2>
          </div>
          <div className="col-sm-2 btngrid">
            <button className="btn-primary btnhomelogin">Zaloguj Się</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 infogrid">
          
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;