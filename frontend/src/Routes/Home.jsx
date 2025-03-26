import React, { useEffect } from 'react'
import Header from "./../components/Header";
import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import Carousel from './../components/Casrousal';
import { getProducts } from '../redux/actions/productAction';
import { useDispatch,useSelector } from 'react-redux';
// import Slide from '../components/slide';
import MidSection from './../components/MidSection';
import { Box,styled } from '@mui/material';

function Home() {
    const {products}=useSelector(state=>state.getProducts);
    console.log(products);
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getProducts())
    },[dispatch])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:3000/product/67e17be6f453531978e02614");
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

    return (  
      <>
        <div style={{margin:"0",width:"100%",height:"100%"}}>
        <Header />
        <Nav/>
        <main className="main-content">
        <Carousel/>
        {/* <MidSlide products={products} /> */}
        <MidSection/>
        {/* <Slide
                    data={products} 
                    title='Discounts for You'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Suggested Items'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Top Selection'
                    timer={false} 
                    multi={true} 
                />
                <Slide
                    data={products} 
                    title='Recommended Items'
                    timer={false} 
                    multi={true} 
                /> */}
        </main>
        <Footer />
        </div>
      </>
    );
  }

const Component = styled(Box)`
  display: flex;
`

const LeftComponent = styled(Box)(({ theme}) => ({
  width: '83%',
  [theme.breakpoints.down('md')]: {
      width: '100%'
  }
}))

const RightComponent = styled(Box)(({ theme}) => ({
  marginTop: 10,
  background: '#FFFFFF',
  width: '17%',
  marginLeft: 10,
  padding: 5,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
      display: 'none'
  }
}));

const MidSlide = ({ products }) => {
  const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

  return (
      <Component>
          <LeftComponent>
              <Slide 
                  data={products} 
                  title='Deals of the Day'
                  timer={true} 
                  multi={true} 
              />
          </LeftComponent>
          <RightComponent>
              <img src={adURL} style={{width: 217}}/>
          </RightComponent>
      </Component>
  )
}


export default Home