import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Card = ({ image, name, breed, gender, age, location, postedDate }) => {
  return (
    <div className="w-[300px] rounded-md border bg-purple-50 m-1">
      <img
        src={image}
        alt={name}
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {name} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-2 text-sm text-gray-600"><strong>Breed:</strong> {breed}</p>
        <p className="text-sm text-gray-600"><strong>Gender:</strong> {gender}</p>
        <p className="text-sm text-gray-600"><strong>Age:</strong> {age}</p>
        <p className="text-sm text-gray-600"><strong>Location:</strong> {location}</p>
        <p className="text-sm text-gray-600"><strong>Posted Date:</strong> {postedDate}</p>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
export default Card