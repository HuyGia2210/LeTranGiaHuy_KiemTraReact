import './Info.css'
import { info } from '../style.js'


export default function Info(){
    return (
        <>
        <div className={info}>
            <h3 className='text-start px-35 text-3xl'>
                Emma Gonzalez's Recipe Box
            </h3>
            <div className='px-30 flex'>
                <img src="./Avatar 42.png" alt="" />
                <div className='inline-block'>
                    <p className='text-start my-10'>
                        Emma Gonzalez is a deputy editor at Chefify, bringing her expertise as a former cooking editor at The Los Angeles Times. She is also an accomplished author, contributing to numerous cookbooks and food publications. Originally from East Los Angeles, Emma now resides in New York City, where she explores a wide range of culinary delights.
                    </p>
                    <div className='flex'>
                        <p className='text-red-500 py-2'>
                            6.5k Subscribes
                        </p>
                        <button className='mx-5 bg-pink-500 text-white'>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}