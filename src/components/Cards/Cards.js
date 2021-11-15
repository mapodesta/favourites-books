import { Card, Col, Row, Select, Pagination, Button } from 'antd';
import { FieldTimeOutlined, HeartFilled } from '@ant-design/icons';
import './cards.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { Colorize } from '../../helpers';

const Cards = () => {
  const { Option } = Select;
  let navigate = useNavigate();

  const {
    dataToShow,
    totalData,
    handleChangeName,
    handleChangePage,
    handleFavourites,
  } = useFetch();

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
            defaultValue={localStorage.getItem('selected')}
            style={{ width: '20% ' }}
            onChange={handleChangeName}
            placeholder="Select your News"
          >
            <Option value="reactjs">React</Option>
            <Option value="angular">Angular</Option>
            <Option value="vuejs">VueJS</Option>
          </Select>
        </div>
        <Row gutter={[0, 50]}>
          {dataToShow.length !== 0
            ? dataToShow.map((inf, index) => {
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
            total={totalData?.length}
            defaultPageSize={6}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;
