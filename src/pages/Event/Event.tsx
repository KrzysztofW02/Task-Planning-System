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
                <p>?info?</p>
              </div>
              <div className="col ctc">kalendarz</div>
              <div className="col ctc">wydarzenia</div>
            </div>
          </div>
        </div>
      </>
    );
}

export default EventComponent;
