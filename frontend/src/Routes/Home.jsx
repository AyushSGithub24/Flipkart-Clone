import Slide from "../components/Slide";
import { Box, styled } from "@mui/material";
// export default Home
import React, { useEffect } from "react";
import Header from "./../components/Header";
import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import Carousel from "./../components/Casrousal";
import { getProducts } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import MidSection from "./../components/MidSection";

function Home() {
  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function getLaptop() {
    if (!Array.isArray(products)) return []; // Avoid errors if products is undefined
    return products.filter(
      (item) =>
        item.name?.toLowerCase().includes("laptop") ||
        (item.tags && item.tags?.includes("laptop"))
    );
  }
  function getPhone() {
    if (!Array.isArray(products)) return []; // Avoid errors if products is undefined
    return products.filter(
      (item) =>
        item.name?.toLowerCase().includes("phone") ||
        (item.tags && item.tags?.includes("phone"))
    );
  }
  function getAc() {
    if (!Array.isArray(products)) return []; // Avoid errors if products is undefined
    return products.filter((item) =>
      item.name?.toLowerCase().includes("AC") || item.name?.toLowerCase().includes("air-conditioner") ||
      (item.tags && (item.tags?.includes("AC")||item.tags?.includes("air-conditioner")))
    );
  }
  function getTv() {
    if (!Array.isArray(products)) return []; // Avoid errors if products is undefined
    return products.filter((item) =>
      item.name?.toLowerCase().includes("TV") || item.name?.toLowerCase().includes("Telivision") ||
      (item.tags && (item.tags?.includes("TV")||item.tags?.includes("Television")||item.tags?.includes("tv")))
    );
  }
  const laptop = getLaptop();
  const phones = getPhone();
  const AC=getAc();
  const TV=getTv();
  return (
    <>
      <div className="w-full h-full">
        <Header />
        <Nav />
        <main className="main-content">
          <Carousel />
          <MidSlide products={laptop} />
          <MidSection idx={3} />
          <Slide
            data={phones}
            title="Mobile Phones"
            timer={false}
            multi={true}
          />
           <MidSection idx={0} />
           <Slide
            data={AC}
            title="Air Conditioner"
            timer={false}
            multi={true}
          />
           <Slide
            data={TV}
            title="TV"
            timer={false}
            multi={true}
          />
          <MidSection idx={2} />
          
        </main>
        <Footer />
      </div>
    </>
  );
}

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: "83%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  marginTop: 10,
  background: "#FFFFFF",
  width: "17%",
  marginLeft: 10,
  padding: 5,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MidSlide = ({ products }) => {
  const adURL =
    "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";

  return (
    <Component>
      <LeftComponent>
        <Slide data={products} title="Laptops" timer={true} multi={true} />
      </LeftComponent>
      <RightComponent>
        <img src={adURL} style={{ width: 217 }} />
      </RightComponent>
    </Component>
  );
};
export default Home;
