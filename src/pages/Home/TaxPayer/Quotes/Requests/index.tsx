import { Col, Divider, message, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../../../redux/store";
import Wrapper from "../../../../../components/Wrapper";
import {
  deleteQuoteRequest,
  getQuoteRequests,
  getQuotes,
} from "../../../../../redux/quotesSlice";
import { IDeleteQuoteRequest, IRequestProps } from "./index.props";
import Button from "../../../../../components/Button";
import {
  ITaxPayerBusinessQuoteRequest,
  ITaxPayerIndividualQuoteRequest,
} from "../../../../../redux/quotesSlice/index.props";
import { utc } from "../../../../../helpers/date";

import styles from "./index.module.css";

const Requests = (props: IRequestProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { businessQuoteRequests = [], individualQuoteRequests = [] } =
    useSelector((state: RootState) => state.quotes);
  const { className } = props;

  const onDelete = async (payload: IDeleteQuoteRequest) => {
    try {
      await dispatch(deleteQuoteRequest(payload));
      dispatch(getQuoteRequests());
      dispatch(getQuotes());
    } catch (e: any) {
      message.error(e.data.errorMessage || t("errors.global"));
    }
  };

  const renderQuoteRequests = (
    requests:
      | ITaxPayerIndividualQuoteRequest[]
      | ITaxPayerBusinessQuoteRequest[],
    isIndividual: boolean,
  ) =>
    requests.map(item => (
      <Row
        key={`request_${item.id}`}
        gutter={[0, 20]}
        justify="space-between"
        align="middle"
        className={styles.row}
      >
        <Col>
          <Space size={5} direction="vertical">
            <p className={styles.description}>
              {isIndividual ? t("quotes.individual") : t("quotes.business")}
            </p>

            <p className={styles.date}>{utc(item.createdDate, "LLL")}</p>
          </Space>
        </Col>
        <Col>
          <Button
            text="Delete"
            type="link"
            onClick={() =>
              onDelete({ taxPreparationId: item.id, isIndividual })
            }
          />
        </Col>
      </Row>
    ));

  return (
    <Wrapper className={className}>
      <div className={styles.container}>
        <h2>{t("quotes.waiting_requests")}</h2>
        <Divider className={styles.divider} />

        {individualQuoteRequests.length > 0 &&
          renderQuoteRequests(individualQuoteRequests, true)}

        {businessQuoteRequests.length > 0 &&
          renderQuoteRequests(businessQuoteRequests, false)}
      </div>
    </Wrapper>
  );
};

export default Requests;
