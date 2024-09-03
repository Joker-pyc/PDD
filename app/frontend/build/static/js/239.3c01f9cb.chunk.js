"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[239],{1650:(e,r,t)=>{t.d(r,{A:()=>i});const i=t(5464).Ay.div`
  background: ${e=>e.theme.glass.background};
  backdrop-filter: ${e=>e.theme.glass.backdropFilter};
  -webkit-backdrop-filter: ${e=>e.theme.glass.backdropFilter};
  border-radius: ${e=>e.theme.glass.borderRadius};
  border: ${e=>e.theme.glass.border};
  box-shadow: ${e=>e.theme.glass.boxShadow};
  padding: ${e=>e.theme.spacing.lg};
  transition: all ${e=>e.theme.transitions.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>e.theme.boxShadow.large};
  }
`},4239:(e,r,t)=>{t.r(r),t.d(r,{default:()=>R});var i=t(5043),o=t(5464),s=t(6779),n=t(797),a=t(5692),l=t(7856),d=t(7719),c=t(6210),m=t(7095),h=t(4281);const p="http://localhost:5000/api";var g=t(1650),x=t(8032),u=t(579);const b=o.Ay.div`
  width: 100%;
  height: 10px;
  background-color: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.small};
  margin: 1rem 0;
  overflow: hidden;
`,y=(0,o.Ay)(s.P.div)`
  height: 100%;
  background-color: ${e=>e.theme.colors.secondary};
  border-radius: ${e=>e.theme.borderRadius.small};
`,j=e=>{let{progress:r}=e;return(0,u.jsx)(b,{children:(0,u.jsx)(y,{initial:{width:0},animate:{width:`${r}%`},transition:{duration:.5}})})},f=(0,o.Ay)(s.P.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`,w=o.Ay.h1`
  color: ${e=>e.theme.colors.text};
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
`,$=(0,o.Ay)(g.A)`
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>e.theme.boxShadow.large};
  }
`,A=(0,o.Ay)(n.A)`
  width: 64px;
  height: 64px;
  color: ${e=>e.theme.colors.primary};
  margin-bottom: 1rem;
`,k=o.Ay.p`
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.textSecondary};
`,v=o.Ay.img`
  max-width: 100%;
  max-height: 400px;
  margin-top: 2rem;
  border-radius: 10px;
  box-shadow: ${e=>e.theme.boxShadow.medium};
`,S=(0,o.Ay)(s.P.button)`
  background-color: ${e=>e.theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 2rem auto;

  &:hover {
    background-color: ${e=>e.theme.colors.secondary};
    transform: translateY(-2px);
  }
`,z=(0,o.Ay)(s.P.div)`
  margin-top: 3rem;
`,D=(0,o.Ay)(g.A)`
  margin-bottom: 1.5rem;
  padding: ${e=>e.theme.spacing.lg};

  h3 {
    color: ${e=>e.theme.colors.primary};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.4rem;

    svg {
      margin-right: 1rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`,P=o.Ay.a`
  display: inline-flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.secondary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: ${e=>e.theme.spacing.md};
  font-weight: 600;

  &:hover {
    background-color: ${e=>e.theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    margin-right: 0.8rem;
  }
`,R=()=>{const[e,r]=(0,i.useState)(null),[t,o]=(0,i.useState)(null),[s,n]=(0,i.useState)(""),[g,b]=(0,i.useState)(0),y=(0,i.useCallback)((e=>{r(e[0])}),[]),{getRootProps:R,getInputProps:C,isDragActive:F}=(0,h.VB)({onDrop:y});return(0,u.jsxs)(f,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},children:[(0,u.jsx)(w,{children:"AI Plant Disease Detection"}),(0,u.jsxs)($,{...R(),children:[(0,u.jsx)("input",{...C()}),F?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(A,{}),(0,u.jsx)(k,{children:"Drop the image here ..."})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(A,{}),(0,u.jsx)(k,{children:"Drag 'n' drop an image here, or click to select a file"})]}),e&&(0,u.jsx)(v,{src:URL.createObjectURL(e),alt:"Selected plant"})]}),(0,u.jsxs)(S,{onClick:async()=>{if(e){const t=new FormData;t.append("image",e);try{const e=await(async e=>{const r=await fetch(`${p}/submit`,{method:"POST",body:e});if(!r.ok)throw new Error("Image submission failed");return r.json()})(t);o(e),n(e.title)}catch(r){console.error("Error submitting image:",r)}finally{b(0)}}},whileHover:{scale:1.05},whileTap:{scale:.95},children:["Analyze",(0,u.jsx)(a.A,{size:24,style:{marginLeft:"1rem"}})]}),g>0&&(0,u.jsx)(j,{progress:g}),t&&(0,u.jsxs)(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[(0,u.jsxs)(D,{children:[(0,u.jsxs)("h3",{children:[(0,u.jsx)(l.A,{size:24})," Detected Disease"]}),(0,u.jsx)("p",{children:t.title})]}),(0,u.jsxs)(D,{children:[(0,u.jsxs)("h3",{children:[(0,u.jsx)(d.A,{size:24})," Description"]}),(0,u.jsx)("p",{children:t.description})]}),(0,u.jsxs)(D,{children:[(0,u.jsxs)("h3",{children:[(0,u.jsx)(c.A,{size:24})," Prevention Steps"]}),(0,u.jsx)("p",{children:t.prevent})]}),(0,u.jsxs)(D,{children:[(0,u.jsxs)("h3",{children:[(0,u.jsx)(m.A,{size:24})," Recommended Supplement"]}),(0,u.jsx)("p",{children:t.supplement_name}),(0,u.jsxs)(P,{href:t.supplement_buy_link,target:"_blank",rel:"noopener noreferrer",children:[(0,u.jsx)(m.A,{size:20}),"Buy Now"]})]})]}),(0,u.jsx)(x.A,{diseaseContext:s,initialMessage:t?`The detected disease is ${t.title}. ${t.description}`:""})]})}}}]);
//# sourceMappingURL=239.3c01f9cb.chunk.js.map