// import { useEffect, useState } from "react";

// import {
//   Card,
//   Col,
//   Row,
//   Typography,
//   Tooltip,
//   Progress,
//   Upload,
//   message,
//   Button,
//   Timeline,
//   Radio,
// } from "antd";
// import {
//   ToTopOutlined,
//   MenuUnfoldOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import Paragraph from "antd/lib/typography/Paragraph";

// import Echart from "../components/chart/EChart";
// import LineChart from "../components/chart/LineChart";

// import ava1 from "../assets/images/logo-shopify.svg";
// import ava2 from "../assets/images/logo-atlassian.svg";
// import ava3 from "../assets/images/logo-slack.svg";
// import ava4 from "../assets/images/logo-spotify.svg";
// import ava5 from "../assets/images/logo-jira.svg";
// import ava6 from "../assets/images/logo-invision.svg";
// import team1 from "../assets/images/team-1.jpg";
// import team2 from "../assets/images/team-2.jpg";
// import team3 from "../assets/images/team-3.jpg";
// import team4 from "../assets/images/team-4.jpg";
// import card from "../assets/images/info-card-1.jpg";
// import AxiosClient from "../networks/AxiosRequest";
// import { KEY_STORAGE } from "../constants";

// const { Title, Text } = Typography;

// function Home() {
//   useEffect(() => {
//     (async () => {
//       const token = localStorage.getItem(KEY_STORAGE.TOKEN);

//       await AxiosClient.post(
//         "/products",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//     })();
//   }, []);

//   const [reverse, setReverse] = useState(false);

//   const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

//   const count = [
//     {
//       today: "Today’s Sales",
//       title: "$53,000",
//       persent: "+30%",
//       icon: <DollarIcon />,
//       bnb: "bnb2",
//     },
//     {
//       today: "Today’s Users",
//       title: "3,200",
//       persent: "+20%",
//       icon: <ProfileIcon />,
//       bnb: "bnb2",
//     },
//     {
//       today: "New Clients",
//       title: "+1,200",
//       persent: "-20%",
//       icon: <HeartIcon />,
//       bnb: "redtext",
//     },
//     {
//       today: "New Orders",
//       title: "$13,200",
//       persent: "10%",
//       icon: <CartIcon />,
//       bnb: "bnb2",
//     },
//   ];

//   const list = [
//     {
//       img: ava1,
//       Title: "Soft UI Shopify Version",
//       bud: "$14,000",
//       progress: <Progress percent={60} size="small" />,
//       member: <MemberAvatars />,
//     },
//     // Add more items here
//   ];

//   const timelineList = [
//     {
//       title: "$2,400 - Redesign store",
//       time: "09 JUN 7:20 PM",
//       color: "green",
//     },
//     // Add more items here
//   ];

//   const uploadProps = {
//     name: "file",
//     action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//     headers: {
//       authorization: "authorization-text",
//     },
//     onChange(info) {
//       if (info.file.status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === "done") {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };

//   return (
//     <div className="layout-content">
//       <Row className="rowgap-vbox" gutter={[24, 0]}>
//         {count.map((c, index) => (
//           <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
//             <Card bordered={false} className="criclebox">
//               <div className="number">
//                 <Row align="middle" gutter={[24, 0]}>
//                   <Col xs={18}>
//                     <span>{c.today}</span>
//                     <Title level={3}>
//                       {c.title} <small className={c.bnb}>{c.persent}</small>
//                     </Title>
//                   </Col>
//                   <Col xs={6}>
//                     <div className="icon-box">{c.icon}</div>
//                   </Col>
//                 </Row>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Row gutter={[24, 0]}>
//         <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
//           <Card bordered={false} className="criclebox h-full">
//             <Echart />
//           </Card>
//         </Col>
//         <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
//           <Card bordered={false} className="criclebox h-full">
//             <LineChart />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[24, 0]}>
//         <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
//           <Card bordered={false} className="cardbody criclebox h-full">
//             <div className="project-ant">
//               <div>
//                 <Title level={5}>Projects</Title>
//                 <Paragraph className="lastweek">
//                   done this month<span className="blue">40%</span>
//                 </Paragraph>
//               </div>
//               <div className="ant-filtertabs">
//                 <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
//                   <Radio.Group onChange={onChange} defaultValue="a">
//                     <Radio.Button value="a">ALL</Radio.Button>
//                     <Radio.Button value="b">ONLINE</Radio.Button>
//                     <Radio.Button value="c">STORES</Radio.Button>
//                   </Radio.Group>
//                 </div>
//               </div>
//             </div>
//             <div className="ant-list-box table-responsive">
//               <table className="width-100">
//                 <thead>
//                   <tr>
//                     <th>COMPANIES</th>
//                     <th>MEMBERS</th>
//                     <th>BUDGET</th>
//                     <th>COMPLETION</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {list.map((d, index) => (
//                     <tr key={index}>
//                       <td>
//                         <h6>
//                           <img src={d.img} alt="" className="avatar-sm mr-10" /> {d.Title}
//                         </h6>
//                       </td>
//                       <td>{d.member}</td>
//                       <td>
//                         <span className="font-weight-bold text-xs">{d.bud}</span>
//                       </td>
//                       <td>
//                         <div className="percent-progress">{d.progress}</div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="uploadfile shadow-none">
//               <Upload {...uploadProps}>
//                 <Button type="dashed" className="ant-full-box" icon={<ToTopOutlined />}>
//                   <span className="click">Click to Upload</span>
//                 </Button>
//               </Upload>
//             </div>
//           </Card>
//         </Col>
//         <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
//           <Card bordered={false} className="criclebox h-full">
//             <div className="timeline-box">
//               <Title level={5}>Orders History</Title>
//               <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
//                 this month <span className="bnb2">20%</span>
//               </Paragraph>
//               <Timeline pending="Recording..." className="timelinelist" reverse={reverse}>
//                 {timelineList.map((t, index) => (
//                   <Timeline.Item color={t.color} key={index}>
//                     <Title level={5}>{t.title}</Title>
//                     <Text>{t.time}</Text>
//                   </Timeline.Item>
//                 ))}
//               </Timeline>
//               <Button
//                 type="primary"
//                 className="width-100"
//                 onClick={() => setReverse(!reverse)}
//               >
//                 <MenuUnfoldOutlined /> REVERSE
//               </Button>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[24, 0]}>
//         <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
//           <Card bordered={false} className="criclebox h-full">
//             <Row gutter={[24, 0]}>
//               <Col xs={12} sm={8}>
//                 <img src={card} alt="" className="width-100" />
//               </Col>
//               <Col xs={12} sm={16}>
//                 <Title level={5}>Business Investment</Title>
//                 <Text className="font-weight-light">
//                   <span className="font-weight-bold">+2.5% </span> over last month
//                 </Text>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//         <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
//           <Card bordered={false} className="criclebox h-full">
//             <Row>
//               <Col xs={12}>
//                 <Title level={5}>New members</Title>
//               </Col>
//               <Col xs={12} className="text-right">
//                 <Button type="link" icon={<RightOutlined />}>View All</Button>
//               </Col>
//             </Row>
//             <div className="team-box">
//               <ul>
//                 <li>
//                   <img src={team1} alt="" className="avatar-sm" />
//                   <Text>Albert B. - CEO</Text>
//                 </li>
//                 <li>
//                   <img src={team2} alt="" className="avatar-sm" />
//                   <Text>Jack B. - Manager</Text>
//                 </li>
//                 <li>
//                   <img src={team3} alt="" className="avatar-sm" />
//                   <Text>Susan H. - Developer</Text>
//                 </li>
//                 <li>
//                   <img src={team4} alt="" className="avatar-sm" />
//                   <Text>Linda J. - Designer</Text>
//                 </li>
//               </ul>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Select, DatePicker, message } from "antd";
import ReactECharts from "echarts-for-react";
import StatisticsService from "../services/OrderApi"; // Đảm bảo đường dẫn đúng
import { Dayjs } from "dayjs";
import { EChartsOption } from "echarts";

const { Option } = Select;

const Home = () => {
  const [chartData, setChartData] = useState<EChartsOption | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [timePeriod, setTimePeriod] = useState("daily");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (timePeriod === "daily" && dateRange) {
          const response = await StatisticsService.getRevenueByDay(
            dateRange[0].format("YYYY-MM-DD"),
            dateRange[1].format("YYYY-MM-DD")
          );
          data = response.data;
        } else if (timePeriod === "monthly") {
          const response = await StatisticsService.getRevenueByMonth(
            year,
            month
          );
          data = response.data;
        } else if (timePeriod === "yearly") {
          const response = await StatisticsService.getRevenueByYear(year);
          data = response.data;
        }

        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data", error);
        message.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [timePeriod, dateRange, year, month]);

  const formatChartData = (data: any): EChartsOption => {
    return {
      xAxis: {
        type: "category",
        data: data.dates, // Dữ liệu trục X từ API
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.values, // Dữ liệu trục Y từ API
          type: "line",
          smooth: true, // Làm cho đường biểu đồ mượt mà
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    };
  };

  return (
    <div className="layout-content">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card bordered={false} className="criclebox">
            <Select
              defaultValue="daily"
              style={{ width: 120 }}
              onChange={setTimePeriod}
            >
              <Option value="daily">Daily</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>
            {timePeriod === "daily" && (
              <DatePicker.RangePicker
                onChange={(dates, dateStrings) => {
                  if (dates && dates.length === 2) {
                    const [start, end] = dates as [Dayjs, Dayjs];
                    setDateRange([start, end]);
                  } else {
                    setDateRange(null);
                  }
                }}
                style={{ marginTop: 16 }}
              />
            )}
            {timePeriod === "monthly" && (
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Select
                    value={month}
                    onChange={setMonth}
                    style={{ width: "100%" }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <Option key={m} value={m}>
                        {m}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    value={year}
                    onChange={setYear}
                    style={{ width: "100%" }}
                  >
                    {Array.from(
                      { length: 10 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((y) => (
                      <Option key={y} value={y}>
                        {y}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            )}
            {chartData && (
              <ReactECharts
                option={chartData}
                style={{ height: "400px", marginTop: "16px" }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
