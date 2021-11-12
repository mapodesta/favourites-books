import { Card, Col, Row, Pagination, Button } from 'antd';
import { FieldTimeOutlined, HeartFilled } from '@ant-design/icons';
import '../Cards/cards.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';

const Fav = () => {
  let navigate = useNavigate();

  const [dataPagination, setDataPagination] = useState([]);
  const [toPagination, setToPagination] = useState(6);
  const [infoFavs, setInfoFavs] = useState([]);

  useEffect(() => {
    setInfoFavs(JSON.parse(localStorage.getItem('data')));
  }, []);

  const handlePageChangeFav = (value) => {
    if (parseInt(value) === 1) {
      setToPagination(6);
      return setDataPagination(infoFavs.slice(0, 6));
    }
    setDataPagination(infoFavs.slice(toPagination, value * 6));
    setToPagination(value * 6);
  };

  return (
    <>
      <Header />
      <div className="Container">
        <div className="button-section">
          <Button size={'50px'} onClick={() => navigate('/')}>
            All
          </Button>
          <Button size={'50px'} onClick={() => navigate('/favs')}>
            Favs
          </Button>
        </div>
        <Row gutter={[0, 50]}>
          {dataPagination && dataPagination.length !== 0
            ? dataPagination.map((inf, index) => {
                return (
                  <Col className="gutter-row" xs={12} key={index}>
                    <div className="card-content">
                      <Card>
                        <div onClick={() => window.open(inf.story_url)}>
                          <p>
                            {parseInt(
                              Date.parse(new Date()) / 3600000 -
                                Date.parse(inf.created_at) / 3600000
                            )}
                            {'  hours ago'}
                            <FieldTimeOutlined />{' '}
                          </p>

                          <p>{inf.author}</p>
                        </div>
                      </Card>
                      <div className="icon-style">
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
            total={infoFavs?.length}
            defaultPageSize={6}
            onChange={handlePageChangeFav}
          />
        </div>
      </div>
    </>
  );
};

export default Fav;
