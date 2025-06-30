import React, { useContext, useEffect } from 'react'
import { DataContext, getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';
import { useNavigate, useParams } from 'react-router-dom';

const Carousel = () => {
    const navigate = useNavigate();
    const { data, fetchAllProducts } = getData();

    useEffect(() => {
        fetchAllProducts();
    }, []);


    const SamplePrevArrow = (props) => {
        const {className , style , onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex : 3}}>
                <AiOutlineArrowLeft className='arrows' style={{...style , display : "block" , borderRadius : "10px" , background : "#000" , color : "white" , position : "absolute" , padding : "2px" , left: "50px" }}/>
            </div>
        )
    }
    const SampleNextArrow = (props) => {
        const {className , style , onClick} = props;
        return (
            <div onClick={onClick} className={`${className}`} style={{zIndex : 3}}>
                <AiOutlineArrowRight className='arrows' style={{...style , display : "block" , borderRadius : "10px" , background : "#000" , color : "white" , position : "absolute" , padding : "2px" , right: "50px" }}/>
            </div>
        )
    }

    var settings = {
        dots: false,
        autoplay : true,
        autoplaySpeed : 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow : <SampleNextArrow to="next"/> ,
        prevArrow : <SamplePrevArrow to="prev"/>
    };

    return (
        <div>
            <Slider {...settings}>

                {
                    data?.slice(0,7)?.map((item,index) => {
                        return (
                            <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10 px-4'>
                                <div className='flex flex-col-reverse md:flex-row gap-10 justify-center h-[600px] items-center px-4 my-20 md:my-0'>
                                    <div className='md:space-y-6 space-y-3'>
                                        <h3 className='text-red-500 font-semibold text-sm font-sans'>Powering Your World With the best in Electronics</h3>
                                        <h1 className='md:text-4xl text-2xl font-bold uppercase md:line-clamp-3 line-clamp-2 md:w-[500px] text-white'>{item.title}</h1>
                                        <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
                                        <div className='w-full flex justify-center md:justify-start'>
                                            <button className='bg-gradient-to-r from-red-500 to-violet-500 text-white px-3 py-2 rounded-md cursor-pointer' onClick={()=> navigate(`/products/${item.id}`)}>Shop Now</button>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={item.image} alt={item.title} className='rounded-2xl w-[250px] hover:scale-105 transition-all shadow-2xl shadow-red-400 cursor-pointer' onClick={()=> navigate(`/products/${item.id}`)} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
            <Category/>
        </div>
    )
}

export default Carousel