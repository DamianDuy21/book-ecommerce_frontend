import DefaultLayout from "../layouts/DefaultLayout/defaultLayout.js"
import BuyNowPage from "../pages/BuyNowPage/buyNowPage.js"
import CartDetailPage from "../pages/CartDetailPage/cartDetailPage.js"
import HistoryPage from "../pages/HistoryPage/historyPage.js"
import HomePage from "../pages/HomePage/homePage.js"
import ManagePage from "../pages/ManagePage/managePage.js"
import ProductDetailPage from "../pages/ProductDetailPage/productDetailPage.js"
import ProfilePage from "../pages/ProfilePage/profilePage.js"
import ProtectedAdmin from "../pages/ProtectedAdmin/protectedAdmin.js"
import ProtectedSignInUser from "../pages/ProtectedSignInUser/protectedSignInUser.js"
import ReceiptDetailPage from "../pages/ReceiptDetailPage/receiptDetailPage.js"
import RelatedProductPage from "../pages/RelatedProductPage/relatedProductPage.js"
import SearchedProductPage from "../pages/SearchedProductPage/searchedProductPage.js"

const Routes = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "product-detail/:id",
                element: <ProductDetailPage />
            },
            {
                path: "searched-products",
                element: <SearchedProductPage />
            },
            {
                path: "related-products/:id",
                element: <RelatedProductPage />
            },
            {
                path: "/",
                element: <ProtectedSignInUser />,
                children: [
                    {
                        path: "cart-detail",
                        element: <CartDetailPage />
                    },
                    {
                        path: "receipt-detail/:id",
                        element: <ReceiptDetailPage />
                    },
                    {
                        path: "buy-now/:id",
                        element: <BuyNowPage />
                    },
                    {
                        path: "profile/:id",
                        element: <ProfilePage />
                    },
                    {
                        path: "history/:id",
                        element: <HistoryPage />
                    },
                    {
                        path: "/",
                        element: <ProtectedAdmin />,
                        children: [
                            {
                                path: "manage",
                                element: <ManagePage />
                            },
                        ]
                    },
                ]
            }
        ]
    }
]

export default Routes