import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default class Carousel extends React.Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={215}
        isPlaying={true}
        totalSlides={3}
        interval={5000}
      >
        <Slider>
          <Slide index={0}>
            <a href="">
              <Image
                className="image-0"
                src="https://images.unsplash.com/photo-1506606401543-2e73709cebb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </a>
          </Slide>
          <Slide index={1}>
            <Image
              className="image-1"
              src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fyesofcorsa.com%2Fwp-content%2Fuploads%2F2015%2F10%2F2421_desert.jpg&f=1&nofb=1"
            />
          </Slide>
          <Slide index={2}><Image
              className="image-2"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.yd5YMOiTydGlSjXgw-PEsQHaEo%26pid%3DApi&f=1"
            /></Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}
