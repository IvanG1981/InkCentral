import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
export function PreviewCarrousel(  { previews }  ){   
  return(
    <Carousel>
      {!!previews && previews.map(( file, index ) => {
        return(
          <Carousel.Item>
            <Card.Img src={ file.preview } className="artistProfileImage" alt="main tattoo" className="cardImage" />
            <Carousel.Caption>
              <h3> {index+1} </h3>
            </Carousel.Caption>
          </Carousel.Item>
        )      
      })}  
    </Carousel>
  )
}


