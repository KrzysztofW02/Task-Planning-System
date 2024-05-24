import "./Event.css"

function EventComponent(){
    
    return (
      <>
        <div className="container eventContainer">
          <div className="row ctc">
            <div className="col ctc">
              <h1>Witaj,</h1><br/>
              <h2>{"nazwa użytkownika"}</h2>
            </div>
            <div className="row ctc mt-5">
              <div className="col ctc">
                <p>Info</p>
              </div>
              <div className="col ctc">Kalendarz</div>
              <div className="col ctc">Wydarzenia</div>
            </div>
          </div>
        </div>
      </>
    );
}

export default EventComponent;
