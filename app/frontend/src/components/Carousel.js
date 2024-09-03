import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CarouselContainer = styled(motion.div)`
  width: 100%;
  height: 500px;
  margin-bottom: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow.large};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 300px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${props => props.theme.colors.primary};
  }

  .swiper-pagination-bullet-active {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SlideCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.theme.spacing.md};
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  backdrop-filter: blur(4px);
`;

const Carousel = ({ images }) => (
  <CarouselContainer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      effect="fade"
      loop={true}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <SlideImage src={image.src} alt={image.alt} />
          <SlideCaption>{image.caption}</SlideCaption>
        </SwiperSlide>
      ))}
    </Swiper>
  </CarouselContainer>
);

export default Carousel;
