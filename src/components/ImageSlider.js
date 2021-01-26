import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
export function ImageSlider( {images} ){   
  return(
    <Carousel>
      {!!images && images.map(( image, index ) => {
        return(
          <Carousel.Item>
            <Card.Img src={ image } className="artistProfileImage" alt="main tattoo" />
            <Carousel.Caption>
              <h3> {index+1} </h3>
            </Carousel.Caption>
          </Carousel.Item>
        )      
      })}  
    </Carousel>
  )
}