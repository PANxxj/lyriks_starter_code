import {Error,Loader,SongCard} from '../components/'
import {genres} from '../assets/constants'
import { useEffect, useState } from 'react';
import api from '../Api';
import { useDispatch, useSelector } from 'react-redux';
// import { useGetTopChartsQuery } from '../redux/services/shazamCore';


const Discover = () => {
    // const {data,isFetching,error}=useGetTopChartsQuery()/
    // console.log('useGetTopChartQuery',useGetTopChartsQuery());
    const dispatch=useDispatch()
    const { activeSong,isPlaying } =useSelector((state)=> state.player)
    const [data,setData]=useState([])
    const [customLoader,setCustomLoader]=useState(false)
    const [customError,setCustomError]=useState(false)


    console.log('datadata',data);
    const getSongs=async()=>{
        setCustomLoader(true)
        try{
            const res=await api.get('songs')
            console.log(res.data);
            setData(res.data)
        }catch(error){
            console.log(error);
            setCustomError(true)
        }
        finally{
            setCustomLoader(false)
        }
    }
    const genreTitle='pop'
    useEffect(()=>{
        getSongs()
    },[])
    if (customLoader) return <Loader title='Loading songs...'/>
    if (customError) return <Error />

return(
<div  className='flex flex-col'>
    <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select name="" id="" onChange={()=>{}} value='' className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'> 
            {genres.map((item)=> <option key={item.value} value={item.value}>{item.title}</option>)}
        </select>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song,i)=>(
            <SongCard key={song.id} song={song} i={i} activeSong={activeSong} isPlaying={ isPlaying} data={data}/>
        ))}
    </div>
</div>
)};

export default Discover;
