import * as _ from 'lodash';
import * as moment from 'moment';

import { Param } from './../models/';

// TODO: merge with data class with mobx
// TODO: mobx, computed
// tslint:disable-next-line:variable-name
export const Params = new Map<string, Param>([
  ['botActive', async function botActive() {
    try {
      this.data.history.push('HbotActive');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'botActive',
      }));
      _.set(
        this.data, [
          'bot',
          'active',
        ],
        true);

      const _botActive = _.get(this.data, [
        'bot',
        'active',
      ]);

      return _botActive;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'botActive',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'botActive',
      }));
    }
  }],
  ['requestStageCode', async function requestStageCode() {
    try {
      this.data.history.push('HrequestStageCode');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));

      // TODO: Enums
      const requestStageCode = _.get(this.data, [
        'request',
        'stageCode',
      ]);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        requestStageCode: requestStageCode,
        value: 'VALUE',
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));

      return requestStageCode;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));
    }
  }],
  ['requestStageId', async function requestStageId() {
    try {
      this.data.history.push('HrequestStageId');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestStageId',
      }));

      // TODO: Enums
      const requestStageId = _.get(this.data, [
        'request',
        'stageId',
      ]);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        requestStageId: requestStageId,
        value: 'VALUE',
        callType: 'CONDITION',
        call: 'requestStageId',
      }));

      return requestStageId;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestStageId',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestStageId',
      }));
    }
  }],
  ['requestType', async function requestType() {
    try {
      this.data.history.push('HrequestType');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestType',
      }));
      // TODO: Enums
      const requestType = _.get(this.data, [
        'request',
        'requestTypeCode',
      ]);

      return requestType;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestType',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestType',
      }));
    }
  }],
  ['requestStageCode', async function requestStageCode() {
    try {
      this.data.history.push('HrequestStageCode');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));

      // TODO: Enums
      const requestStageCode = _.get(this.data, [
        'request',
        'requestStageCode',
      ]);

      return requestStageCode;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));

      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestStageCode',
      }));
    }
  }],
  ['resolutionType', async function resolutionType() {
    try {
      this.data.history.push('HresolutionType');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'resolutionType',
      }));
      const resolutionType = _.get(this.data, [
        'request',
        'resolutionId',
      ]);

      return resolutionType;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'resolutionType',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'resolutionType',
      }));
    }
  }],
  ['requestActual', async function requestActual() {
    try {
      this.data.history.push('HrequestActual');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestActual',
      }));

      const now = moment();
      const exp = moment(this.data.request.dueDate);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: {
          now: now.toISOString(),
          exp: exp.toISOString(),
        },
        callType: 'CONDITION',
        call: 'requestActual',
      }));

      if (!exp.isAfter(now)) {
        throw new Error('Request not actual');
      }

      return true;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestActual',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestActual',
      }));
    }
  }],
  ['requestTargetsCount', async function requestTargetsCount() {
    try {
      this.data.history.push('HrequestTargetsCount');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestTargetsCount',
      }));

      const requestTargetsCount = _.size(this.data.request.targets);

      return requestTargetsCount;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestTargetsCount',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestTargetsCount',
      }));
    }
  }],

  ['requestTarget', async function requestTarget() {
    try {
      this.data.history.push('HrequestTarget');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestTarget',
      }));

      const requestTarget = _.get(this.data, [
        'request',
        'targets',
        0,
        'targetId',
      ]);

      return requestTarget;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestTarget',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestTarget',
      }));
    }
  }],
  ['scenarioActive', async function scenarioActive() {
    try {
      this.data.history.push('HscenarioActive');
      _.set(
        this.data, [
          'scenario',
          'active',
        ],
        true);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'scenarioActive',
      }));

      const scenarioActive = _.get(this.data, [
        'scenario',
        'active',
      ]);

      return scenarioActive;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'scenarioActive',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'scenarioActive',
      }));
    }
  }],
  ['requestTime', async function requestTime() {
    try {
      this.data.history.push('HrequestTime');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'requestTime',
      }));
      const last = moment(this.data.request.stageStartDate);
      const now = moment();
      const diff = Math.floor(moment.duration(now.diff(last)).asMinutes());
      this.data.requestTime = diff;
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: {
          last: last.toISOString(),
          now: now.toISOString(),
        },
        callType: 'CONDITION',
        call: 'requestTime',
      }));
      return diff;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'requestTime',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'requestTime',
      }));
    }
  }],
  ['ordersSum', async function ordersSum() {
    try {
      this.data.history.push('HordersSum');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'ordersSum',
      }));
      let sum = 0;

      const shipments = _.get(this.data.orders, [
        '0',
        'deliveries',
        '0',
        'shipmentOrders',
      ]);

      _.each(shipments, (shipment) => {
        if (_.size(shipment.shipmentOrderItems) !== 0) {
          _.each(shipment.shipmentOrderItems, (item) => {
            sum += item.price * item.quantity;
          });
        }
      });

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: sum,
        callType: 'CONDITION',
        call: 'ordersSum',
      }));
      return sum;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'ordersSum',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'ordersSum',
      }));
    }

    return true;
  }],
  ['orderActiveItemsCount', async function orderActiveItemsCount() {
    try {
      this.data.history.push('HorderActiveItemsCount');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'orderActiveItemsCount',
      }));
      let orderActiveItemsCount = 0;

      const shipments = _.get(this.data.orders, [
        '0',
        'deliveries',
        '0',
        'shipmentOrders',
      ]);

      _.each(shipments, (shipment) => {
        if (_.size(shipment.shipmentOrderItems) !== 0) {
          _.each(shipment.shipmentOrderItems, (item) => {
            if (!item.shipmentOrderItemCanceled) {
              orderActiveItemsCount += 1;
            };
          });
        }
      });

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: orderActiveItemsCount,
        callType: 'CONDITION',
        call: 'orderActiveItemsCount',
      }));
      return orderActiveItemsCount;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'orderActiveItemsCount',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'orderActiveItemsCount',
      }));
    }
  }],
  ['lastStep', async function lastStep() {
    try {
      this.data.history.push('HlastStep');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'lastStep',
      }));

      const last = _.slice(this.data.history, -2)[0];
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'lastStep',
        last,
      }));

      return last;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'lastStep',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'lastStep',
      }));
    }
  }],
  ['history', async function history() {
    try {
      this.data.history.push('Hhistory');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'history',
      }));
      const history = this.data.history;

      return history;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'history',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'history',
      }));
    }
  }],
  ['success', async function success() {
    try {
      this.data.history.push('Hsuccess');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'success',
      }));

      return true;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'success',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'success',
      }));
    }
  }],
  ['failure', async function failure() {
    try {
      this.data.history.push('Hfailure');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'failure',
      }));

      return null;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'failure',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'failure',
      }));
    }
  }],
  ['test', async function test() {
    try {
      this.data.history.push('Htest');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'CONDITION',
        call: 'test',
      }));
      // const result = this.data.request.resolutionId;
      return 31;
      // return result;
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'CONDITION',
        call: 'test',
      }));
      return null;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'CONDITION',
        call: 'test',
      }));
    }
  }],
]);
