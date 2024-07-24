import React from 'react'
import useCountStore from '../../Store/ZustandStore'

function Count() {
    const {count , increment , decrement} = useCountStore()
  return (
    <>
    <h1 className='text-emerald-400 text-xl'>
        {count}
    </h1>
    <button className='p-2 bg-lime-300 m-1' onClick={increment}>  increment</button>
    <button className='p-2 bg-lime-300 m-1' onClick={decrement}>  decrement</button>
    </>
  )
}

export default Count