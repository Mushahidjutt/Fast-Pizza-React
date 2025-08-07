import React from 'react'
import Header from '../components/common/layout/Header'

export default function MainPage() {
  return (
    <div>
        <Header/>
     <main className='mx-auto max-w-3xl tracking-widest'>
        <div className='my-10 px-4 text-center sm:my-16'>
            <h1 className='mb-8  text-xl font-semibold md:text-3xl'>
                The best pizza.
                <br />
                <span className='text-yellow-500'>
                    Straight out of the oven, straight to you.
                </span>

            </h1>

            <p className='mb-4 text-sm text-stone-600 md:text-base'> 👋 Welcome! Please start by telling us your name:</p>

        </div>
        
     </main>
    </div>
  )
}
