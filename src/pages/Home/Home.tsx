import "./Home.css"

function HomeComponent() {
  return (
    <>
      <div className="container homeContainer">
        <div className="row1">
          <div className="col1">
            <div className="text">
              <h1>Witaj,</h1>
              <br></br>
              <h2>Zaloguj się, aby przejść dalej</h2>
            </div>
          </div>
          <div className="col2">
            <button className="btnn">Zaloguj Się</button>
          </div>
          <div className="col2">
            <button className="btnn">Zarejestruj Się</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;