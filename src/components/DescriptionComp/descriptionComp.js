import { useEffect, useState } from "react";
import "./styles.css";

const DescriptionComp = (props) => {
    const { desContent } = props;
    const [descriptionHeight, setDescriptionHeight] = useState(0);
    const [renderCount, setRenderCount] = useState(0); // State to force re-render

    useEffect(() => {
        const description = document.querySelector("[data-description]");
        if (description) {
            const height = description.clientHeight;
            if (height > 0) {
                setDescriptionHeight(height);
            } else {
                // If description height is 0, force a re-render to measure again
                setRenderCount(prevCount => prevCount + 1);
            }
        }
    }, [renderCount]); // Dependency ensures this effect runs when renderCount changes

    useEffect(() => {
        if (descriptionHeight > 0) {
            const moreDesBtn = document.querySelector("[data-moredes-btn]");
            const lessDesBtn = document.querySelector("[data-lessdes-btn]");
            const desSec = document.querySelector("[data-description-section]");
            const description = document.querySelector("[data-description]");
            const desLayer = document.querySelector("[data-des-layer]");

            const adjustDescription = () => {
                if (description.clientHeight >= 138) {
                    description.style.height = "138px";
                } else {
                    lessDesBtn.style.display = "none";
                    moreDesBtn.style.display = "none";
                    desLayer.style.display = "none";
                    description.style.height = "max-content";
                    desSec.style.height = "max-content";
                }
            };

            adjustDescription();

            const handleMoreClick = () => {
                desSec.classList.add("active");
                description.style.height = "max-content";
            };

            const handleLessClick = () => {
                desSec.classList.remove("active");
                description.style.height = "138px";
            };

            moreDesBtn.addEventListener("click", handleMoreClick);
            lessDesBtn.addEventListener("click", handleLessClick);

            return () => {
                moreDesBtn.removeEventListener("click", handleMoreClick);
                lessDesBtn.removeEventListener("click", handleLessClick);
            };
        }
    }, [descriptionHeight]); // Run this effect when descriptionHeight changes

    return (
        <>
            <div data-description-section className="description-section">
                <div className="tiny-title" style={{ marginBottom: "6px" }}>Mô tả:</div>
                <div data-description className="description">
                    <div data-des-layer className="description-layer"></div>
                    <span data-des-content>
                        {desContent}
                    </span>
                </div>
                <div data-moredes-btn className="moreDes-btn">
                    <span>Xem thêm</span>
                </div>
                <div data-lessdes-btn className="lessDes-btn">
                    <span>Thu gọn</span>
                </div>
            </div>
        </>
    );
};

export default DescriptionComp;
