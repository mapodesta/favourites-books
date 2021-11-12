import { Card, Col, Row, Select, Pagination, Button } from 'antd';
import { FieldTimeOutlined, HeartFilled } from '@ant-design/icons';
import './cards.css';
import useFetch from '../../hooks/useFetch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const Cards = () => {
  const { Option } = Select;
  let navigate = useNavigate();
  const [favs, setFavs] = useState([]);

  const handleFavourites = (tarj) => {
    let obj = {
      created_at: tarj.created_at,
      author: tarj.author,
      story_url: tarj.story_url,
      story_title: tarj.story_title,
    };

    setFavs((prev) => [...prev, obj]);
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(favs));
  }, [favs]);

  const { dataPagination, info, handleChangeName, handleChangePage } =
    useFetch();

  return (
    <>
      <div className="Front-End-Test---Home-view">
        <Header />
        <div className="button-section">
          <Button>All</Button>
          <Button onClick={() => navigate('/favs')}>Favs</Button>
        </div>
        <div className="selector">
          <Select
            style={{ width: '20% ' }}
            onChange={handleChangeName}
            placeholder="Select your News"
            defaultValue="Angular"
          >
            <Option value="react">React</Option>
            <Option value="angular">Angular</Option>
            <Option value="vuejs">VueJS</Option>
          </Select>
        </div>
        <Row gutter={[0, 50]}>
          {dataPagination.length !== 0
            ? dataPagination.map((inf, index) => {
                return (
                  <Col className="gutter-row" xs={12} key={index}>
                    <div className="card-content">
                      <Card>
                        <div onClick={() => window.open(inf.story_url)}>
                          <p>
                            {' '}
                            <FieldTimeOutlined />
                            {parseInt(
                              Date.parse(new Date()) / 3600000 -
                                Date.parse(inf.created_at) / 3600000
                            )}
                            {`hours ago by ${inf.author}`}
                          </p>
                          <p>{inf.story_title}</p>
                        </div>
                      </Card>
                      <div
                        className="icon-style"
                        onClick={() => handleFavourites(inf)}
                      >
                        <HeartFilled
                          style={{
                            color: 'red',
                            fontSize: '50px',
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            total={info?.length}
            defaultPageSize={6}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;
