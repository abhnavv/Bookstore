import React, { useEffect, useState }  from 'react'
import Header from '../../user/components/UserHead'
import background from "../../assets/bk4.jpeg"
import { FcSearch } from "react-icons/fc";
import featuredImage from '../../assets/featuredImage.png'
import testimonialImage from '../../assets/testimonialimage.jpeg'
import { Link ,useNavigate} from 'react-router-dom';
import { homePageBooksAPI } from '../../services/allApi';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useContext } from 'react';
import SearchContext, { searchContext } from '../../context/SearchContext';
import { toast } from 'react-toastify';
function Home() {
  const [homeBooks,setHomeBooks] = useState([])
  // console.log(homeBooks);
  const navigate = useNavigate()
  const {searchKey,setSearchKey} = useContext(searchContext)

  useEffect(() => {
    getBooks()
  },[])
  const getBooks = async() => {
    const res = await homePageBooksAPI()
    if(res.status===200){
      setHomeBooks(res.data)
    }
  }

  const handleSearch = () => {
    if(!searchKey){
      toast.warning("Please input a book title here !")
    }else if(!sessionStorage.getItem("token")){
      toast.warning("Please Login!!")
      setTimeout(()=>{
        navigate('/login')
      },1000)
    }else if(searchKey && sessionStorage.getItem("token")){
      navigate('/all-books')
    }else{
      toast.error("Something went wrong !")
    }
  }
  return (
    <div>
    <Header/>
    {/* the baground image seaction and searchbar */}
      <div className='relative overflow-hidden h-100'>
          <div style={{backgroundImage:`url(${background})`}} className='bg-cover w-full bg-center bg-no-repeat absolute inset-0 blur-xs scale-105'>

          </div>
          {/* contents text */}
          <div className='relative z-10 flex flex-col items-center justify-center text-white h-full'>
            <h1 className='text-5xl font-extrabold font-serif' style={{fontFamily:"Lavishly Yours",fontStyle:'normal'}}>Wonderfull Gifts</h1>
            <p className='text-gray-300 font-serif mt-2'>Give your family and freinds a book</p>
            <div className='flex relative items-center mt-5 px-5 md:px-0 md:w-100'>
              <input type="text" className='bg-white rounded-2xl w-full md:w-100 h-9 text-black px-10 py-3 border-gray-100 shadow' placeholder='search Book' onChange={(e)=>setSearchKey(e.target.value)}
              />
              <FcSearch className='absolute text-black right-5 md:right-2 text-2xl' onClick={handleSearch}
              />
            </div>
  
          </div>
      </div>
      {/* new arrival section */}
      <div className='mx-16 my-6'>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <h1 className='text-2xl font-bold'>NEW ARRIVALS</h1>
            <h2 className='text-lg font-bold'>Explore Our Latest Collection</h2>
          </div>
          {/* books cards */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6  md:justify-items-center justify-items-center items-center text-center'>
          { 
          homeBooks?.length > 0 ?
            homeBooks?.map(book =>(
              
              <div key={book._id} className='shadow-xl hover:shadow-2xl transition-shadow duration-300 p-5 w-full max-w-64 rounded-lg'>
                <img src={book?.imageUrl} alt="" className='w-full h-64 object-contain'/>
                <div className='mt-3 text-center'>
                  <h1 className='text-blue-500'>{book?.author}</h1>
                  <h2>{book?.title}</h2>
                  <h2 className='flex items-center justify-center'><FaIndianRupeeSign />
                  {book?.price}</h2>
                </div>
              </div>             
          
            ))
            :
            <p className='font-bold text-center my-3'>Loading....</p>
        }
         </div>
          {/* explore more button */}
          <div className='flex items-center justify-center mt-9 w-full'>
            <Link to={'/all-books'} className='bg-blue-900 px-4 rounded-xs py-2 text-white'>Explore More</Link>
          </div>
        </div>
      
        {/* featred authors */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-20'>
            <div className='flex flex-col items-center justify-center'>
              <h2 className='text-md font-bold'>FEATURED AUTHORS</h2>                                 <h1 className='text-2xl font-bold'>Captivates with every word</h1>
              <p className='text-md font-bold mt-8'>
                Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.
                
              </p>
              <p className='text-md font-bold mt-8' >Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>
            </div>
            <div>
              <img src={featuredImage} alt="" className='object-cover h-full'/>
            </div>
        </div>
        {/* Testimonials */}
        <div className='flex flex-col items-center justify-center mt-20 font-bold'>
            <h1 className='text-2xl '>TESTIMONIALS</h1>
            <h2 className='text-xl'>See What Others Are Saying</h2>
            <img src={testimonialImage} alt="" className='h-40 w-40 rounded-full my-3'/>
            <h3 className='text-lg'>Treesa Joseph</h3>
            <p className='text-sm mt-3 mb-15'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit distinctio similique ea voluptas. Optio fuga magni, enim, molestiae nemo molestias deserunt reprehenderit reiciendis qui cupiditate, velit similique mollitia! Expedita. Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
      </div>
    </div>
  )
}

export default Home
