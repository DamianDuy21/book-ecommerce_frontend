
import { Button, Checkbox, Col, Divider, Form, Input, Row, Slider } from 'antd';
import "./styles.css"
import { ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { doSearchName } from '../../redux/SearchNameReducer/searchNameReducer';
import { getCategories } from '../../services/productServices';
const SiderMenu = (props) => {
    const { isOverlay, setCollapsed } = props
    const searchNameReducer = useSelector(state => state.searchName.searchName)
    const [range, setRange] = useState([0, 1000000]);
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000000)
    const [searchNameForm] = useForm()
    const [filterForm] = useForm()
    const [categories, setCategories] = useState([])
    const nav = useNavigate()
    const dispatch = useDispatch()
    const formItemStyle = {
        marginBottom: "8px",
        width: "100%"
    }
    const onFinish = async (e) => {
        const searchName = e.pSearchName || "all"
        setCollapsed(true)
        dispatch(doSearchName({
            searchName: ''
        }))

        nav(`searched-products?name=${searchName}`)

    }
    const onChange = async (e) => {
        const searchName = (e.target.value)
        dispatch(doSearchName({
            searchName: searchName
        }))
    }
    const onChangeCheckBox = (checkedValues) => {
        // console.log('checked = ', checkedValues);
    };

    const handleSliderChange = (value) => {
        setRange(value);
        setMinPrice(value[0] / 100 * 1000000)
        setMaxPrice(value[1] / 100 * 1000000)
    };

    const onFilterFinish = (e) => {
        let filter = {
            category: [],
            priceRange: [0, 1000000]
        }
        if (e.category) {
            filter.category = e.category
        }
        if (e.priceRange) {
            filter.priceRange = [e.priceRange[0] * 10000, e.priceRange[1] * 10000]
        }

        let queryString = `searched-products?price_gte=${filter.priceRange[0]}&price_lte=${filter.priceRange[1]}&category=`
        let cateQueryString = filter.category.join(",")
        queryString = queryString.concat(cateQueryString)
        dispatch(doSearchName({
            searchName: ''
        }))
        if (isOverlay) {
            setCollapsed(true)
        }
        nav(queryString)
    }
    const handleResetFilter = () => {
        filterForm.resetFields()
        setMinPrice(0)
        setMaxPrice(1000000)
    }
    useEffect(() => {
        searchNameForm.setFieldsValue({ pSearchName: searchNameReducer });
        const fetchCategories = async () => {
            const response = await getCategories()
            if (response) {
                let cateArray = response.data.data.map(item => {
                    return item.name
                })
                setCategories(cateArray)
            }
        }
        fetchCategories()
    }, [searchNameReducer, searchNameForm, categories]);
    return (
        <div className='siderMenu'>
            {isOverlay ? (<>

                <div className='title small-title' style={{
                    textAlign: "center",
                    padding: "12px 0 12px 0px",
                }}>Bộ lọc</div>
                <Form autoComplete="off"
                    onFinish={onFinish}
                    onChange={onChange}
                    style={{
                        padding: "6px 12px 0px 12px"
                    }}
                    form={searchNameForm}
                >
                    <Form.Item
                        name="pSearchName"
                        style={formItemStyle}
                    >
                        <Input placeholder='Tên sản phẩm...' />
                    </Form.Item>
                    <Form.Item
                        style={formItemStyle}
                    >
                        <Button style={{ width: "100%", marginTop: "0px" }} type="primary" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form></>) : (<>

                </>)}

            <Form
                onFinish={onFilterFinish}
                form={filterForm}
            >
                <div className='category-section'>
                    {isOverlay ? (<><Divider /></>) : (<></>)}

                    <div className='title small-title' style={{ position: "relative" }}>Thể loại
                        <div className='reload-icon grow-button' onClick={handleResetFilter}>
                            <ReloadOutlined />
                        </div>
                    </div>

                    <Form.Item name="category" style={{ marginBottom: "0px" }}>
                        <Checkbox.Group
                            style={{
                                width: '100%',
                            }}
                            onChange={onChangeCheckBox}
                        >

                            <Row gutter={[0, 12]}>
                                {categories && (
                                    categories.map(item => {
                                        return (
                                            <Col span={24}>
                                                <Checkbox value={item}>{item}</Checkbox>
                                            </Col>
                                        )
                                    })
                                )}


                            </Row>
                        </Checkbox.Group>
                    </Form.Item>


                </div>
                <div className='price-section'>
                    <Divider />
                    <div className='title small-title'>Khoảng giá</div>
                    <Form.Item name="priceRange" style={{ margin: "-12px 0 0 0" }}>
                        <Slider
                            range={{
                                draggableTrack: true,
                            }}
                            defaultValue={[0, 10000000]}
                            value={range}
                            onChange={handleSliderChange}
                        />
                    </Form.Item>

                    <Row gutter={[12, 12]}>
                        <Col span={24}><span style={{ display: "inline-block", width: "32px" }}>Từ:</span> <span style={{ fontWeight: "550" }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minPrice)}
                        </span></Col>
                        <Col span={24}><span style={{ display: "inline-block", width: "32px" }}>Đến:</span> <span style={{ fontWeight: "550" }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(maxPrice)}
                        </span></Col>
                    </Row>

                    <Button style={{ width: "100%", marginTop: "12px" }} type="primary" htmlType="submit">
                        Áp dụng
                    </Button>
                </div >
            </Form>
        </div>
    )
}
export default SiderMenu