import React, { PropTypes } from 'react';
import { Button, Icon, Header, Table } from 'semantic-ui-react';
import moment from 'moment';

import Asset from '../../../components/stellar/Asset';
import AccountId from '../../../components/stellar/AccountId';
import AmountComponent from '../../../components/stellar/Amount';

function PaymentArrow({ toMe }) {
  return (
    <div>
      {toMe ? <Icon name="arrow left" color="green" /> : <Icon name="arrow right" color="red" />}
    </div>
  );
}
PaymentArrow.propTypes = {
  toMe: PropTypes.bool.isRequired,
};

class Payments extends React.Component {
  getDate(transaction) {
    const mo = moment(transaction.created_at);
    return mo.calendar();
  }

  getPaymentRow(payment, index) {
    const isToMyAccount = this.props.account.account_id === payment.to;
    const externalAccount = isToMyAccount ? payment.from : payment.to;
    const network = this.props.network;
    return (
      <Table.Row key={index} positive={isToMyAccount} negative={!isToMyAccount}>
        <Table.Cell>
          <PaymentArrow toMe={isToMyAccount} />
        </Table.Cell>
        <Table.Cell>
          <AmountComponent payment={payment} />
        </Table.Cell>
        <Table.Cell>
          <Asset {...payment} />
        </Table.Cell>
        <Table.Cell>
          <a className="no-style" href={`/?accountId=${externalAccount}&network=${network}`} target="_blank">
            <AccountId accountId={externalAccount} />
          </a>
        </Table.Cell>
        <Table.Cell>
          {payment.transaction.memo}
        </Table.Cell>
        <Table.Cell>
          {this.getDate(payment.transaction)}
        </Table.Cell>
        <Table.Cell>
          <Button
            circular
            basic
            compact
            icon="external"
            onClick={this.openTransaction(payment.transaction)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  getPathPaymentRow(payment, index) {
    const isToMyAccount = this.props.account.account_id === payment.to;
    return (
      <Table.Row key={index} positive={isToMyAccount} negative={!isToMyAccount}>
        <Table.Cell>
          <PaymentArrow toMe={isToMyAccount} />
        </Table.Cell>
        <Table.Cell>
          <AmountComponent payment={payment} />
        </Table.Cell>
        <Table.Cell>
          <AccountId accountId={isToMyAccount ? payment.from : payment.to} />
        </Table.Cell>
        <Table.Cell>
          <Asset
            asset_type={payment.source_asset_type}
            asset_issuer={payment.source_asset_issuer}
            asset_code={payment.source_asset_code}
          />
        </Table.Cell>
        <Table.Cell>
          <Asset {...payment} />
        </Table.Cell>
        <Table.Cell>
          {payment.transaction.memo}
        </Table.Cell>
        <Table.Cell>
          {this.getDate(payment.transaction)}
        </Table.Cell>
        <Table.Cell>
          <Button
            circular
            basic
            compact
            icon="external"
            onClick={this.openTransaction(payment.transaction)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  openTransaction(transaction) {
    return e => {
      e.preventDefault();
      const id = transaction.id;
      const network = this.props.network;
      const baseUrl = network === 'test' ? 'http://testnet.stellarchain.io/tx/' : 'https://stellarchain.io/tx/';
      const url = `${baseUrl}${id}`;
      window.open(url);
    }
  }

  render() {
    const directPayments = this.props.payments.slice().reverse();
    const pathPayments = this.props.pathPayments.slice().reverse();

    return (
      <div>
        <Header as="h2" textAlign="center">Account payments</Header>
        <Table singleLine size="small" compact unstackable definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Account</Table.HeaderCell>
              <Table.HeaderCell>Memo</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Open</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {directPayments.length ?
              directPayments.map(::this.getPaymentRow)
              :
              <Table.Row>
                <Table.Cell />
                <Table.Cell colSpan="5" textAlign="center">No payments</Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>

        <Header as="h3">Path payments</Header>
        <Table singleLine size="small" compact unstackable definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Account</Table.HeaderCell>
              <Table.HeaderCell>From asset</Table.HeaderCell>
              <Table.HeaderCell>To asset</Table.HeaderCell>
              <Table.HeaderCell>Memo</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Open</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {pathPayments.length ?
              pathPayments.map(::this.getPathPaymentRow)
              :
              <Table.Row>
                <Table.Cell />
                <Table.Cell colSpan="5" textAlign="center">No path payments</Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

Payments.propTypes = {
  account: PropTypes.object,
  payments: PropTypes.array,
  pathPayments: PropTypes.array,
  network: PropTypes.string,
};

export default Payments;
