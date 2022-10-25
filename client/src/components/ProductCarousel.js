import React from "react";
import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listTopProductsAPI } from "../actions/product.actions";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, loading, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProductsAPI());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-dark body"
      style={{
        height: "400px",
      }}
    >
      {products &&
        products.map((product) => (
          <Carousel.Item
            key={product._id}
            // style={{ height: "70vh", border: "2px solid red" }}
          >
            <Link to={`/product/${product._id}`}>
              <Image
                style={
                  {
                    // border: "1px solid white",
                    // marginLeft: "auto",
                    // marginLeft: "8%",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }
                }
                src={product.image}
                alt={product.name}
                fluid
              ></Image>
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} <span>- ₹</span> {product.price}
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
    // <Carousel>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src="holder.js/800x400?text=First slide&bg=373940"
    //       alt="First slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>First slide label</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src="holder.js/800x400?text=Second slide&bg=282c34"
    //       alt="Second slide"
    //     />

    //     <Carousel.Caption>
    //       <h3>Second slide label</h3>
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src="holder.js/800x400?text=Third slide&bg=20232a"
    //       alt="Third slide"
    //     />

    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
  );
};

export default ProductCarousel;
