import { Button } from "antd";
import Carousell from "../../components/Carousel/carousel";
import { useEffect, useState } from "react";
import SliderList from "../../components/SliderList/sliderList";
import { getProductByRequest } from "../../services/productServices";
import LoadingTheme from "../../components/LoadingTheme/loadingTheme";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();
  const [lastestProducts, setLastestProducts] = useState();
  const [mostBuyProducts, setMostBuyProducts] = useState();
  const [mostDiscountProducts, setMostDiscountProducts] = useState();
  const [type, setType] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    const getProducts = async () => {
      const responseLastestProducts = await getProductByRequest(
        "limit=10&page=1&sort=-createdAt"
      );
      const responseMostBuyProducts = await getProductByRequest(
        "limit=10&page=1&sort=-sold"
      );
      const responseMostDiscountProducts = await getProductByRequest(
        "limit=10&page=1&sort=-discount"
      );

      if (
        responseLastestProducts &&
        responseMostBuyProducts &&
        responseMostDiscountProducts
      ) {
        // console.log(responseLastestProducts);
        // console.log(responseMostBuyProducts);
        // console.log(responseMostDiscountProducts);
        const LP = responseLastestProducts.data;
        const BP = responseMostBuyProducts.data;
        const DP = responseMostDiscountProducts.data;
        setMostBuyProducts(BP);
        setMostDiscountProducts(DP);
        setLastestProducts(LP);
      }
    };
    getProducts();
  }, []);

  if (!lastestProducts || !mostBuyProducts || !mostDiscountProducts) {
    return <LoadingTheme />;
  } else {
    return (
      <>
        <div className="container-homePage">
          <div className="carousel-section">
            <Carousell />
          </div>
          <div
            className="filter-section common-wrapper"
            style={{ padding: "16px 16px 2px 16px" }}
          >
            <div className="medium-title" style={{ marginBottom: "12px" }}>
              Tìm kiếm theo
            </div>
            <div className="option-buttons">
              <Button
                className="option-button"
                onClick={() => {
                  nav(`/searched-products?sort=-createdAt`);
                }}
              >
                Mới nhất
              </Button>
              <Button
                className="option-button"
                onClick={() => {
                  nav(`/searched-products?sort=-sold`);
                }}
              >
                Bán chạy nhất
              </Button>
              <Button
                className="option-button"
                onClick={() => {
                  nav(`/searched-products?sort=-discount`);
                }}
              >
                Giảm giá nhiều nhất
              </Button>
              <Button
                className="option-button"
                onClick={() => {
                  nav(`/searched-products?sort=price`);
                }}
              >
                Giá tăng dần
              </Button>
              <Button
                className="option-button"
                onClick={() => {
                  nav(`/searched-products?sort=-price`);
                }}
              >
                Giá giảm dần
              </Button>
            </div>
          </div>

          <div
            className="common-wrapper"
            style={{ marginTop: "16px", padding: "16px 16px 24px 16px" }}
          >
            <SliderList
              products={lastestProducts}
              title={"Sản phẩm mới"}
              related={"-createdAt"}
            />
          </div>
          <div
            className="common-wrapper"
            style={{ marginTop: "16px", padding: "16px 16px 24px 16px" }}
          >
            <SliderList
              products={mostBuyProducts}
              title={"Sản phảm bán chạy"}
              related={"-sold"}
            />
          </div>
          <div
            className="common-wrapper"
            style={{
              marginTop: "16px",
              marginBottom: "0px",
              padding: "16px 16px 24px 16px",
            }}
          >
            <SliderList
              products={mostDiscountProducts}
              title={"Sản phẩm giảm giá nhiều"}
              related={"-discount"}
            />
          </div>
        </div>
      </>
    );
  }
};

export default HomePage;
