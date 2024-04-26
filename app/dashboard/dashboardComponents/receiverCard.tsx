const ReceiverCard = () => {
  return (
    <div className="card bg-white shadow-xl mx-auto items-center w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="card-body">
          <div className="flex flex-row justify-between items-center mb-4">
            <h2 className="card-title">Mottagare</h2>
            <button className="btn text-red-500 bg-white border-red-500 hover:bg-red-200">
              Rensa
            </button>
          </div>
          <button className="btn btn-primary btn-sm w-44 font-mono font-thin mb-2">
            Använd hemadress
          </button>
          <div className="border rounded py-4 px-4 shadow-inner mb-4">
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">Företagsnamn</span>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="my-2 bg-gray-200">
              <p className="text-xs px-1">
                Obs: Använd prefixet "Firma" för enskild firma för att undvika
                extra avgifter och förtydliga att det inte är en privatperson.
              </p>
            </div>

            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">Adress(Ej boxadress)</span>
              <input type="text" className="input input-bordered w-full" />
            </div>

            <div className="flex mb-4">
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="label-text">Postnummer</span>
                <input
                  type="text"
                  className="input input-bordered w-32 mr-3 max-w-xs"
                />
              </div>

              <div className="flex flex-col mb-4 md:mb-0">
                <span className="label-text">Stad</span>
                <input type="text" className="input input-bordered min-w-64" />
              </div>
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">Land</span>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="border-2 rounded py-4 px-4 border-gray-200">
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">Kontaktnamn</span>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">Telefon</span>
              <input type="text" className="input input-bordered w-full" />
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <span className="label-text">E-postadress</span>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Spara mottagare i adressboken</span>
              <input type="checkbox" className="toggle" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverCard;
