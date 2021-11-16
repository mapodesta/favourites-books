import { Card, Col, Row, Pagination, Button } from 'antd';
import { FieldTimeOutlined, HeartFilled } from '@ant-design/icons';
import '../Cards/cards.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { Colorize } from '../../helpers';

const Fav = () => {
  const navigate = useNavigate();
  const { favs, handleFavourites } = useFetch();

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
          {favs && favs.length !== 0
            ? favs.map((inf, index) => {
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
                          onClick={() => handleFavourites(inf, index)}
                          style={{
                            color: Colorize(inf),
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
            total={favs?.length}
            defaultPageSize={6}
            onChange={handleFavourites}
          />
        </div>
      </div>
    </>
  );
};

export default Fav;
