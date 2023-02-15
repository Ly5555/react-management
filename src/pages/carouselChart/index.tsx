/*
轮播图
*/
import { Button } from "antd";
import React from "react";
import Slider from "react-slick";
import styles from "./css/carousel.module.less";
const CarouselChart = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.carousel}>
      <h2> Single Item </h2>
      <h2>官网:<Button type="link">https://react-slick.neostack.com/</Button></h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};
export default CarouselChart;
