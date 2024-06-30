import { Button, Carousel } from 'antd';
import carousel1 from '../../assets/images/carousel1.jpg';
import carousel2 from '../../assets/images/carousel2.jpeg';
import carousel3 from '../../assets/images/carousel3.jpg';
const Carousell = () => {
    const contentStyle = {
        margin: 0,
        height: '252px',
        color: '#fff',
        lineHeight: '252px',
        textAlign: 'center',
    };
    const carousellStyle = {
        margin: "16px 0",
    };
    return (
        <>

            <Carousel style={carousellStyle} arrows infinite={true}>
                <div>
                    <h3 style={{ ...contentStyle, background: "#0a057b" }}>
                        <img className='img-cover-carousel' src={carousel1} />
                    </h3>
                </div>
                <div>
                    <h3 style={{ ...contentStyle, background: "#ff9800" }}>
                        <img className='img-cover-carousel' src={carousel2} />
                    </h3>
                </div>
                <div>
                    <h3 style={{ ...contentStyle, background: "#ffe1bf" }}>
                        <img className='img-cover-carousel' src={carousel3} />
                    </h3>
                </div>
            </Carousel>
        </>
    )
}
export default Carousell