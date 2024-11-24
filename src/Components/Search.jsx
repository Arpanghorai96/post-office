import React, { useState } from "react";

const Search = () => {
  const [postal, setPostal] = useState([]);
  const [pincode, setPincode] = useState("");
  const [error,setError]=useState();

  const fetchData = async () => {
    const data = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const json = await data.json();
    if (pincode.length !== 6 || isNaN(pincode)) {
        setError("Please enter a valid 6-digit pincode.");
        setPostal([]);
        return;
      }
      else if (json[0].Status === "Error") {
        setError(json[0].Message || "No data found for this pincode.");
        setPostal([]);
      }
      else{
        setPostal(json[0].PostOffice);
      }
      setError("");

   
    // console.log(json[0].PostOffice);

    
  };
  return (
    <div className="flex flex-col ml-4">
      <p>Enter Pincode</p>
      <input
        type="number"
        name=""
        id=""
        value={pincode}
        placeholder="Pincode"
        onChange={(e) => {
          setPincode(e.target.value);
        }}
        className="flex px-3 border border-black w-4/5"
      />
      <button
        className="p-2 px-3 bg-black w-fit text-white rounded mt-2"
        onClick={fetchData}
      >
        Lookup
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {postal.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold">Post Office Details</h2>
          <ul className="columns-2">
            {postal.map((office, index) => (
              <li key={index} className="mt-2 border border-black pb-2 w-60 p-3">
                <p>
                  <strong>Name:</strong> {office.Name}
                </p>
                <p>
                  <strong>Pincode:</strong> {office.Pincode}
                </p>
                <p>
                  <strong>District:</strong> {office.District}
                </p>
                <p>
                  <strong>State:</strong> {office.State}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
