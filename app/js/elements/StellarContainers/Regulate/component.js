import React, { PropTypes } from 'react';
import { Segment, Loader, Image, Grid, Card, Button, Header, Table } from 'semantic-ui-react';
import moment from 'moment';
import { StellarServer } from 'stellar-toolkit';


import Asset from '../../../components/stellar/Asset';
import AccountId from '../../../components/stellar/AccountId';
import AmountComponent from '../../../components/stellar/Amount';
import Balances from '../../../elements/StellarContainers/Balances/component';
import Payments from '../../../elements/StellarContainers/PaymentsViewer/component';

const { getServerInstance, getAccount } = StellarServer;

class Regulate extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  selectUser(user) {
    this.setState({
      user,
      userAccount: null,
      userTransactions: null,
    });
    getAccount(user.account_id)
      .then(userAccount => this.setState({userAccount}));
    getServerInstance().payments().forAccount(user.account_id).order('asc').call()
      .then(result => result.records)
      .then(payments => payments.filter(payment => (
        (payment.type === 'payment') && (payment.from !== payment.to)
      )))
      .then(userTransactions => this.setState({userTransactions}));
  }

  getUsersRow(user, index) {
    return (
      <Table.Row key={index} onClick={() => this.selectUser(user)}>
        <Table.Cell>
          {user.account_id}
        </Table.Cell>
        {/*<Table.Cell>*/}
        {/*{user.stellar_address}*/}
        {/*</Table.Cell>*/}
      </Table.Row>
    );
  }

  renderUserTable() {
    return (
      <div>
        <Header as="h2" textAlign="center">User accounts</Header>
        <Table singleLine size="small" compact fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Account ID</Table.HeaderCell>
              {/*<Table.HeaderCell>Username</Table.HeaderCell>*/}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.props.users.map(::this.getUsersRow)
            }
          </Table.Body>
        </Table>
      </div>
    );
  }

  renderUser(user) {
    if(!user) return null;
    return (
      <div>
        <Header as="h2" textAlign="center">User details</Header>
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='/assets/images/matthew.png' />
            <Card.Header>
              {user.stellar_address}
            </Card.Header>
            <Card.Meta className="wraptext">
              {user.account_id}
            </Card.Meta>
            <Card.Description>
              This user has been registered on Dex
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>Allow</Button>
              <Button basic color='red'>Revoke</Button>
            </div>
          </Card.Content>
        </Card>
        <Segment>
          {
            this.state.userAccount ?
              <Balances balances={this.state.userAccount.balances} canSign={false} />
              :
              <Loader active />
          }
        </Segment>
        <Segment>
          {
            (this.state.userAccount && this.state.userTransactions) ?
              <Payments account={this.state.userAccount} payments={this.state.userTransactions} pathPayments={[]} />
              :
              <Loader active />
          }
        </Segment>
      </div>
    );
  }

  render() {
    return (
      <Grid celled stretched>
        <Grid.Column width={5}>
          {this.renderUserTable()}
        </Grid.Column>
        <Grid.Column width={11}>
          {this.renderUser(this.state.user)}
        </Grid.Column>
      </Grid>
    );
  }
}

Regulate.propTypes = {
  account: PropTypes.object,
  payments: PropTypes.array,
  pathPayments: PropTypes.array,
};

export default Regulate;
