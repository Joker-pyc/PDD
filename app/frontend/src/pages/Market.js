import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import Chatbot from '../components/Chatbot';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MarketContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const MarketHeading = styled(motion.h1)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProductCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductName = styled.h3`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
`;

const BuyButton = styled(motion.button)`
  margin-top: ${props => props.theme.spacing.md};
`;

const carouselImages = [
  '../images/plant1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
];

const products = [
  { id: 1, name: 'Organic Fertilizer', price: '$19.99', image: 'https://example.com/fertilizer.jpg' },
  { id: 2, name: 'Garden Hose', price: '$24.99', image: 'https://example.com/hose.jpg' },
  { id: 3, name: 'Pruning Shears', price: '$14.99', image: 'https://example.com/shears.jpg' },
  { id: 4, name: 'Plant Pot Set', price: '$29.99', image: 'https://example.com/pots.jpg' },
];

const Market = () => {
  return (
    <MarketContainer>
      <MarketHeading
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Plant Care Market
      </MarketHeading>

      <Carousel images={carouselImages} />

      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
            <BuyButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add to Cart
            </BuyButton>
          </ProductCard>
        ))}
      </ProductGrid>

      <Chatbot />
    </MarketContainer>
  );
};

export default Market;