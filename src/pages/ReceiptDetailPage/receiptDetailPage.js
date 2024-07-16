import {
  FileTextOutlined,
  SmileOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Radio, Result, Space, Steps, Table } from "antd";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import PaymentInfo from "../../components/PaymentInfo/paymentInfo";
import { useSelector } from "react-redux";
import PaymentReceipt from "../../components/PaymentReceipt/paymentReceipt";
import ReceiptDetailReceipt from "../../components/ReceiptDetailReceipt/receiptDetailReceipt";
import ReceiptDetailInfo from "../../components/ReceiptDetailInfo/receiptDetailInfo";
import { getReceipts } from "../../services/receiptServices";
import LoadingTheme from "../../components/LoadingTheme/loadingTheme";
const ReceiptDetailPage = () => {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  const [receipt, setReceipt] = useState();
  const params = useParams();
  const receiptId = params.id;
  useEffect(() => {
    const fetchReceipt = async () => {
      const response = await getReceipts(`_id=${receiptId}`);
      if (response) {
        console.log(response);
        setReceipt(response.data[0]);
      }
    };
    fetchReceipt();

    window.scrollTo(0, 0);
  }, [params.id]);

  if (!receipt) {
    return <LoadingTheme />;
  } else
    return (
      <>
        <div className="container cart-container">
          <div className="steps-2">
            <Steps
              direction="vertical"
              size="small"
              current={step}
              items={[
                {
                  title: "Check",
                  icon: (
                    <div
                      onClick={() => {
                        // window.scrollTo(0, 0);
                        // setStep(0)
                      }}
                    >
                      <FileSearchOutlined />
                    </div>
                  ),
                },
                {
                  title: "Info",
                  icon: (
                    <div
                      onClick={() => {
                        // window.scrollTo(0, 0);
                        // setStep(1)
                      }}
                    >
                      <FileTextOutlined />
                    </div>
                  ),
                },
                // {
                //     title: 'Done',
                //     icon: <SmileOutlined />,
                // },
              ]}
            />
          </div>
          <div className="steps-1">
            <Steps
              current={step}
              items={[
                {
                  title: "Check",
                  icon: (
                    <div
                      onClick={() => {
                        // window.scrollTo(0, 0);
                        // setStep(0)
                      }}
                    >
                      <FileSearchOutlined />
                    </div>
                  ),
                },
                {
                  title: "Info",
                  icon: (
                    <div
                      onClick={() => {
                        // window.scrollTo(0, 0);
                        // setStep(1)
                      }}
                    >
                      <FileTextOutlined />
                    </div>
                  ),
                },
                // {
                //     title: 'Done',
                //     icon: <SmileOutlined />,
                // },
              ]}
            />
          </div>

          {step == 0 ? (
            <>
              <ReceiptDetailReceipt
                type={1}
                data={receipt.products}
                shipment={receipt.shipPay}
                setStep={setStep}
              />
            </>
          ) : (
            <>
              {step == 1 ? (
                <>
                  <ReceiptDetailInfo
                    type={1}
                    data={receipt}
                    shipment={receipt.shipPay}
                    setStep={setStep}
                  />
                </>
              ) : (
                <>
                  <div className="cart-info common-wrapper cart-done">
                    <Result
                      icon={<SmileOutlined />}
                      title="Đơn hàng của bạn đã được tiếp nhận!"
                      extra={
                        <Button
                          onClick={() => {
                            nav("/");
                          }}
                          type="primary"
                        >
                          Tiếp tục mua hàng
                        </Button>
                      }
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </>
    );
};
export default ReceiptDetailPage;
