import React from 'react'
import Card from "../components/Utility/Card.jsx"
function Adopt() {

    const petData = [
      {
        image: 'https://via.placeholder.com/150',
        name: 'Buddy',
        breed: 'Golden Retriever',
        gender: 'Male',
        age: '2 years',
        location: 'San Francisco, CA',
        postedDate: '2024-07-17'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Luna',
        breed: 'Siberian Husky',
        gender: 'Female',
        age: '1 year',
        location: 'Seattle, WA',
        postedDate: '2024-07-20'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Charlie',
        breed: 'German Shepherd',
        gender: 'Male',
        age: '3 years',
        location: 'Los Angeles, CA',
        postedDate: '2024-07-18'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Bella',
        breed: 'French Bulldog',
        gender: 'Female',
        age: '6 months',
        location: 'Chicago, IL',
        postedDate: '2024-07-22'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Max',
        breed: 'Labrador Retriever',
        gender: 'Male',
        age: '4 years',
        location: 'Denver, CO',
        postedDate: '2024-07-19'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Daisy',
        breed: 'Poodle',
        gender: 'Female',
        age: '5 years',
        location: 'Miami, FL',
        postedDate: '2024-07-21'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Oscar',
        breed: 'Mixed Breed',
        gender: 'Male',
        age: '1 year',
        location: 'Austin, TX',
        postedDate: '2024-07-17'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Lily',
        breed: 'Yorkshire Terrier',
        gender: 'Female',
        age: '2 years',
        location: 'Phoenix, AZ',
        postedDate: '2024-07-20'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Bailey',
        breed: 'Beagle',
        gender: 'Male',
        age: '3 years',
        location: 'San Antonio, TX',
        postedDate: '2024-07-18'
      },
      {
        image: 'https://via.placeholder.com/150',
        name: 'Lucy',
        breed: 'Dachshund',
        gender: 'Female',
        age: '4 years',
        location: 'San Diego, CA',
        postedDate: '2024-07-22'
      }
    ];
    
  
  return (
    <div>Adopt
      <div className='flex flex-row flex-wrap gap-2 justify-between align-middle'>
       {petData.map((item) =>{
          return(
            <Card  key={item.name} {...item} />
          )
       })}
      </div>
    </div>
  )
}

export default Adopt