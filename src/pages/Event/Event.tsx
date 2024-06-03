import "./Event.css";

function EventComponent() {
  return (
    <>
      <div className="container eventContainer">
        <div className="row ctc">
          <div className="card" style={{ width: "32rem" }}>
            <div className="card-body">
              <h5 className="card-title">Wydarzenia</h5>
              <p className="card-text">
                <ul>
                  {/*kod mapowania wydarzenia na li*/}
                  <li
                  style={{
                    textDecoration:'none',
                  }}>
                    
                  </li>
                </ul>
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dodaj wydarzenie"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventComponent;
