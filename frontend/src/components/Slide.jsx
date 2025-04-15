import { Button, Divider, Box, Typography, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link, useNavigate } from "react-router-dom";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const Component = styled(Box)` margin-top: 10px; background: #ffffff; `;
const Deal = styled(Box)` display: flex; padding: 15px 20px; `;
const DealText = styled(Typography)` font-size: 22px; font-weight: 600; margin-right: 25px; `;
const Timer = styled(Box)` color: #7f7f7f; margin-left: 10px; display: flex; align-items: center; `;
const ViewAllButton = styled(Button)` margin-left: auto; background-color: #2874f0; font-size: 13px; `;
const Image = styled("img")({ width: "200px", height: "auto", maxHeight: "400px" });
const Text = styled(Typography)` font-size: 14px; margin-top: 5px; `;
const RenderTimer = styled(Box)(({ theme }) => ({ [theme.breakpoints.down("sm")]: { display: "none" } }));

const MultiSlide = ({ data, timer, title }) => {
  const timerURL = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => (
    <RenderTimer variant="span">
      {hours} : {minutes} : {seconds} Left
    </RenderTimer>
  );

  const navigate = useNavigate();

  return (
    <Component>
      <Deal>
        <DealText>{title}</DealText>
        {timer && (
          <Timer>
            <img src={timerURL} style={{ width: 24 }} alt="timer" />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Timer>
        )}
        <ViewAllButton
          variant="contained"
          color="primary"
          onClick={() => navigate("/category", { state: { title, products: data } })}
        >
          View All
        </ViewAllButton>
      </Deal>
      <Divider />
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        centerMode={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {data.map((temp, index) => (
          <Link
            key={index} // Ensure React re-renders correctly
            to="/productDetail"
            state={{ products: temp }}
            style={{ textDecoration: "none" }}
          >
            <Box textAlign="center" padding="25px 15px">
              <Image src={(temp.images?.[0].replace("/128/128/","/500/500/")) || "fallback-image.jpg"} alt={temp.name || "Product"} />
              <Text style={{ fontWeight: 600, color: "#212121" }}>
                {temp.name ? temp.name.split("-")[0].substring(0, 50) + "..." : "No Name"}
              </Text>
              <Text style={{ color: "black" }}>
                {Number(temp.price || 0).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })}
              </Text>
            </Box>
          </Link>
        ))}
      </Carousel>
    </Component>
  );
};

const Slide = (props) => {
  return props.multi === true && <MultiSlide {...props} />;
};

export default Slide;
