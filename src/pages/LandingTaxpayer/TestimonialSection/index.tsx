import { createRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Carousel, Space } from "antd";
import { CarouselRef } from "antd/lib/carousel";

import Wrapper from "../../../components/Wrapper";
import { getClassNames } from "../../../helpers/format";

import Quotes from "../../../assets/svgs/quotes.svg";
import CarouselRight from "../../../assets/svgs/carousel-right.svg";
import CarouselLeft from "../../../assets/svgs/carousel-left.svg";
import DotsGroupGreen from "../../../assets/svgs/dots-group3.svg";
import DotsGroupBlue from "../../../assets/svgs/dots-group4.svg";
import styles from "./index.module.css";

const TestimonialSection = () => {
  const { t } = useTranslation();
  const carouselRef = createRef<CarouselRef>();

  const carouselData = [
    {
      text: t("landing.testimonials.feedbacks.item1.text"),
      subtext: t("landing.testimonials.feedbacks.item1.subtext"),
    },
    {
      text: t("landing.testimonials.feedbacks.item2.text"),
      subtext: t("landing.testimonials.feedbacks.item2.subtext"),
    },
    {
      text: t("landing.testimonials.feedbacks.item3.text"),
      subtext: t("landing.testimonials.feedbacks.item3.subtext"),
    },
  ];

  return (
    <section className={styles.container}>
      <img
        src={require("../../../assets/images/testimonial-img1.png")}
        className={getClassNames(styles.img)}
        alt="TaxPayer 1"
      />
      <img
        src={require("../../../assets/images/testimonial-img2.png")}
        className={getClassNames(styles.img)}
        alt="TaxPayer 2"
      />
      <img
        src={require("../../../assets/images/testimonial-img3.png")}
        className={getClassNames(styles.img)}
        alt="TaxPayer 3"
      />
      <img
        src={require("../../../assets/images/testimonial-img4.png")}
        className={getClassNames(styles.img)}
        alt="TaxPayer 4"
      />

      <Wrapper>
        <h1 className={styles.title}>{t("landing.testimonials.title")}</h1>

        <div className={styles.contentContainer}>
          <Carousel
            ref={carouselRef}
            effect="fade"
            dots={false}
            className={styles.carousel}
          >
            {carouselData.map((item, index) => (
              <div key={`carouselItem_${index}`}>
                <div className={styles.carouselItem}>
                  <img
                    src={Quotes}
                    className={styles.quotes}
                    alt="Taxpayers feedbacks"
                  />
                  <p className={styles.text}>{item.text}</p>
                  <span className={styles.text}>{item.subtext}</span>
                </div>
              </div>
            ))}
          </Carousel>

          <div className={styles.carouselNavigation}>
            <Space size={0}>
              <Button type="link" onClick={() => carouselRef.current?.prev()}>
                <img src={CarouselLeft} alt="Left" />
              </Button>
              <Button type="link" onClick={() => carouselRef.current?.next()}>
                <img src={CarouselRight} alt="Right" />
              </Button>
            </Space>
          </div>

          <img
            src={DotsGroupGreen}
            className={styles.greenDots}
            alt="Green dots"
          />
          <img
            src={DotsGroupBlue}
            className={styles.blueDots}
            alt="Blue dots"
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default TestimonialSection;
