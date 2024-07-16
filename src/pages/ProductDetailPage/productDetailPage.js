import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import "../../App.css";

import SliderList from "../../components/SliderList/sliderList";
import ProductDetailComp from "../../components/ProductDetailComp/productDetailComp";
import { getProductByRequest } from "../../services/productServices";
import LoadingTheme from "../../components/LoadingTheme/loadingTheme";

const ProductDetailPage = () => {
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductByRequest(`_id=${param.id}`);
        if (response && response.data && response.data.length > 0) {
          const productData = response.data[0];
          setProduct(productData);

          const allResponse = await getProductByRequest();
          const allData = allResponse.data;
          const categoryArray = productData.category;

          const relatedDataFilter = allData
            .filter((item) => {
              if (item._id !== param.id) {
                return item.category.some((category) =>
                  categoryArray.includes(category)
                );
              }
            })
            .slice(0, 10);
          setRelatedProducts(relatedDataFilter);
        } else {
          console.log("Error: Product not found");
        }
      } catch (error) {
        console.error("Error while fetching product:", error);
      }
    };

    fetchProduct();
  }, [param.id]);

  useEffect(() => {
    const handleResize = () => {
      const paymentSecLE1200 = document.querySelector(
        "[data-payment-section-le1200]"
      );
      const paymentSecGE1200 = document.querySelector(
        "[data-payment-section-ge1200]"
      );

      if (paymentSecLE1200 && paymentSecGE1200) {
        // Check if elements are not null
        if (window.innerWidth >= 1200) {
          paymentSecGE1200.classList.add("active");
          paymentSecGE1200.style.display = "block";
          paymentSecLE1200.classList.remove("active");
        } else {
          paymentSecGE1200.classList.remove("active");
          paymentSecGE1200.style.display = "none";
          paymentSecLE1200.classList.add("active");
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [product]);

  if (!product || !relatedProducts) {
    return <LoadingTheme />;
  }

  return (
    <div className="container">
      <ProductDetailComp product={product} />
      <div className="slider-list-cart common-wrapper">
        <SliderList
          products={relatedProducts}
          title={"Có thể bạn quan tâm"}
          related={param.id}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
