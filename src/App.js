import logo from './logo.svg';
import './App.css';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import ControllableTable from './components/ControllableTable';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const chart = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    chart.current = echarts.init(container.current, theme);
    chart.current.setOption({
      title: {
        // text: 'Temperature Change in the Coming Week'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01', '2023-02-01']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '曼哈顿',
          type: 'line',
          smooth: true,
          data: [-190, 100, 100, 120, 130, 140, 150],
          // markPoint: {
          //   data: [
          //     { type: 'max', name: 'Max' },
          //     { type: 'min', name: 'Min' }
          //   ]
          // },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        {
          name: '国贸',
          type: 'line',
          data: [210, 120, 330, 100, 470, 690, -200],
          smooth: true,
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
            ]
          }
        },
        {
          name: '商业中心',
          type: 'line',
          data: [1500, 120, 830, -800, 170, 190, -1500],
          smooth: true,
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
            ]
          }
        }
      ]
    }, true)
  }, [])

  const navs = ["订单供给", "运力履约", "服务质量", "毛利趋势"]

  const columns = [
    {
      title: '日期',
      dataIndex: 'name',
    },
    {
      title: '区域',
      dataIndex: 'age',
    },
    {
      title: '订单毛利',
      dataIndex: 'address',
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  return (
    <div className="App">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ background: "white", borderRight: "1px solid" }}
        >
          <div style={{ height: 60, width: "100%", lineHeight: "60px", borderBottom: "1px solid" }}>城市经营分析平台</div>
          <Menu
            // theme="dark"
            mode="inline"

            defaultSelectedKeys={['4']}
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: navs[index],
              }),
            )}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                // background: colorBgContainer,
              }}
            >
              <div style={{ background: colorBgContainer, width: "100%", height: 400 }}> <div style={{ width: "calc(100% - 80px)", height: 400, position: "relative", left: -60,top:20 }} ref={container}></div></div>
              <div style={{ background: colorBgContainer, width: "100%", marginTop:30,padding:10 }}>
                <ControllableTable columns={columns} dataSource={data} />
              </div>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;