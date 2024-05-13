import "./Home.css"

function HomeComponent() {
  return (
    <>
      <div className="HomeComponent">
        <div className="col-sm-10 HomeText">
          <h1>Witaj,</h1>
          <br></br>
          <h2>Zaloguj się, aby przejść dalej</h2>
        </div>
        <div className="col-sm-2">
            <button className="btn-primary btnhomelogin">Zaloguj Się</button>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;