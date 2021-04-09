import React from "react";

function ParkingLotContainer(props) {
  const data = props.props;
  const companyName = data.name;
  const rating = data.rating;
  const reviewCount = data.review_count;
  const url = data.url;

  const yelpFormula = (rating, reviewCount) => {
    const yelpScore = (reviewCount * rating) / (reviewCount + 1);
    return yelpScore.toFixed(2);
  };
  return (
    <div className="flex-col">
      <div className="lg:mx-12 md:mx-8 sm:mx-6 mx-4 shadow-xl">
        <div className="">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-200 ">
            {" "}
            <h1 className="text-xl text-center tracking-wide py-3">
              {companyName}
            </h1>
          </div>

          {/* Card Body */}
          <div className="">
            {/* Image */}
            <div className="inline-block align-top">
              <img src={data.image_url} alt="parking lot" className="cropped" />
            </div>
            {/* Card Body Info */}
            <div className="inline-block align-top mx-5">
              <p className="text-lg my-5">{data.location.address1}</p>
              <p className="text-lg my-5">{data.phone}</p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="foot">
          <span className="float-left text-white">
            <p className="inline-block mx-2">⭐</p>
            <strong>
              {"  "}
              {yelpFormula(rating, reviewCount)}
            </strong>
          </span>
          <a href={url}>
            <button className="float-right text-white">
              <p className="">View Yelp</p>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ParkingLotContainer;
