import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import { useEffect, useState } from "react";
import AxiosRequestNode from "../../networks/AxiosRequestNode";

function EChart() {
  const { Title, Paragraph } = Typography;
  const [orderChart, setorderChart] = useState();
  useEffect(() => {
    (async () => {
      const dashboard = await AxiosRequestNode.post(
        "/dashboard/get-order-chart"
      );
      console.log("dashboard", dashboard);
      if ((dashboard.code == 0) && dashboard?.data) {
        setorderChart(Object.values(dashboard?.data));
      }
    })();
  }, []);

  const items = [
    {
      Title: "3,6K",
      user: "Users",
    },
    {
      Title: "2m",
      user: "Clicks",
    },
    {
      Title: "$772",
      user: "Sales",
    },
    {
      Title: "82",
      user: "Items",
    },
  ];
  return (
    <>
      <div id="chart">
      <Title level={5} className="pb-3">Đơn hàng trong ngày hôm nay: </Title>
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={[
            {
              name: "Đơn hàng",
              data: orderChart,
              color: "#fff",
            },
          ]}
          type="bar"
          height={300}
        />
      </div>
      {/* <div className="chart-vistior">
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}

export default EChart;
