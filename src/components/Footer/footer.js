const Footer = (props) => {
    const { isOverlay, noSider } = props
    const footerStyle = {
        textAlign: 'center',
        color: '#1677ff',
        backgroundColor: '#fff',
        height: "60px",
        lineHeight: "60px",

    };
    const footerStyle2 = {
        textAlign: 'center',
        color: '#1677ff',
        backgroundColor: '#fff',
        height: "60px",
        lineHeight: "60px",
    };
    return (
        <>
            {/* <div className="small-title" style={isOverlay ? (footerStyle) : (noSider ? (footerStyle) : (footerStyle2))}>
                © 2024 DamianDuy21
            </div> */}
            <div className="small-title" style={(footerStyle)}>
                © 2024 DamianDuy21
            </div>
        </>

    )
}
export default Footer