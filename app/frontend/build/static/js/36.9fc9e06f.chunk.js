"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[36],{9472:(e,i,t)=>{t.r(i),t.d(i,{default:()=>v});t(5043);var a=t(5464),r=t(6779),o=t(4975),n=t(8385),l=(t(4014),t(5084),t(3874),t(5856),t(579));const s=(0,a.Ay)(r.P.div)`
  width: 100%;
  height: 500px;
  margin-bottom: ${e=>e.theme.spacing.xl};
  border-radius: ${e=>e.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${e=>e.theme.boxShadow.large};

  @media (max-width: ${e=>e.theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${e=>e.theme.breakpoints.mobile}) {
    height: 300px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${e=>e.theme.colors.primary};
  }

  .swiper-pagination-bullet-active {
    background-color: ${e=>e.theme.colors.primary};
  }
`,m=a.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,c=a.Ay.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${e=>e.theme.spacing.md};
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  backdrop-filter: blur(4px);
`,d=e=>{let{images:i}=e;return(0,l.jsx)(s,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:(0,l.jsx)(o.RC,{modules:[n.Ij,n.dK,n.Vx,n._R],spaceBetween:30,centeredSlides:!0,autoplay:{delay:5e3,disableOnInteraction:!1},pagination:{clickable:!0},navigation:!0,effect:"fade",loop:!0,children:i.map(((e,i)=>(0,l.jsxs)(o.qr,{children:[(0,l.jsx)(m,{src:e.src,alt:e.alt}),(0,l.jsx)(c,{children:e.caption})]},i)))})})};var p=t(8032);const h=a.Ay.div`
  padding: ${e=>e.theme.spacing.xl};
`,g=(0,a.Ay)(r.P.h1)`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.xl};
`,x=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing.lg};
`,b=(0,a.Ay)(r.P.div)`
  background-color: ${e=>e.theme.colors.glass};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,u=a.Ay.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${e=>e.theme.borderRadius.small};
  margin-bottom: ${e=>e.theme.spacing.md};
`,j=a.Ay.h3`
  margin-bottom: ${e=>e.theme.spacing.sm};
`,y=a.Ay.p`
  font-weight: bold;
  color: ${e=>e.theme.colors.secondary};
`,$=(0,a.Ay)(r.P.button)`
  margin-top: ${e=>e.theme.spacing.md};
`,w=["../images/plant1.jpg","https://example.com/image2.jpg","https://example.com/image3.jpg"],f=[{id:1,name:"Organic Fertilizer",price:"$19.99",image:"https://example.com/fertilizer.jpg"},{id:2,name:"Garden Hose",price:"$24.99",image:"https://example.com/hose.jpg"},{id:3,name:"Pruning Shears",price:"$14.99",image:"https://example.com/shears.jpg"},{id:4,name:"Plant Pot Set",price:"$29.99",image:"https://example.com/pots.jpg"}],v=()=>(0,l.jsxs)(h,{children:[(0,l.jsx)(g,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{duration:.5},children:"Plant Care Market"}),(0,l.jsx)(d,{images:w}),(0,l.jsx)(x,{children:f.map((e=>(0,l.jsxs)(b,{whileHover:{scale:1.05},whileTap:{scale:.95},children:[(0,l.jsx)(u,{src:e.image,alt:e.name}),(0,l.jsx)(j,{children:e.name}),(0,l.jsx)(y,{children:e.price}),(0,l.jsx)($,{whileHover:{scale:1.1},whileTap:{scale:.9},children:"Add to Cart"})]},e.id)))}),(0,l.jsx)(p.A,{})]})}}]);
//# sourceMappingURL=36.9fc9e06f.chunk.js.map