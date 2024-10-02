import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const HomeSlider = () => {
    return (
        <div className="container">
            <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper">
                <SwiperSlide><img src="src\assets\slider\slide1.jpg" /></SwiperSlide>
                <SwiperSlide><img src="src\assets\slider\slide2.jpg" /></SwiperSlide>
                <SwiperSlide><img src="src\assets\slider\slide3.jpg" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeSlider;