import * as _ from 'lodash';
import axios from 'axios';

import * as moment from 'moment';

import {
  v4 as uuid,
} from 'uuid';

// import { orderStatus } from './../../../constants';
// TODO use constants

import {
  Fn,
  Data,
  IBlackboard,
} from './../models';

// import {
//   Request,
// } from './../data';

// TODO: merge with data class with mobx
// TODO: mobx, action, reaction
// TODO: class with methods with computed names
// TODO: decorators
// TODO: logger
// TODO: typings for WHOLE infrastructure starting here
/* tslint:disable */
export const Functions = new Map<string, Fn>([
  ['needUpdate', async function needUpdate() {
    try {
      // this.data.runId = await uuid();

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'needUpdate',
      }));
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'needUpdate',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'needUpdate',
      }));
    }

    return true;
  }],
  ['setMeta', async function setMeta() {
    try {

      // await this.storage.keys();
      this.data.history.push('HsetMeta');
      // this.data.runId = await uuid();

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'setMeta',
      }));

      this.data.meta = { from: 'AUTOBOT' };
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'setMeta',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'setMeta',
      }));
    }

    return true;
  }],
  ['setSessionId', async function setSessionId() {
    try {
      this.data.history.push('HsetSessionId');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'setSessionId',
      }));
      this.data.sessionId = this.config.contactService.sessionId;
      // TODO: auth call
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'setSessionId',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'setSessionId',
      }));
    }

    return true;
  }],
  ['getRequest', async function getRequest() {
    try {
      this.data.history.push('HgetRequest');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'getRequest',
      }));
      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.getQueueList}`,
        {
          meta: this.data.meta,
          data: {
            sessionId: this.data.sessionId,
          },
        },
        // );
        // const res = await axios.get(
        // 'http://jsonserver/list', // TODO: must be dynamic
      );

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

      const queueList = res.data.data;

      if (!_.isArray(queueList)) {
        throw new Error(res.data.data);
      }

      const queueKeys = await _.map(queueList, (request) => {
        return parseInt(request.requestId, 10);
      });

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: queueKeys,
        callType: 'queueKeys',
        call: 'getRequest',
      }));

      const lockKeys = await this.storage.keys();

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: lockKeys,
        callType: 'lockKeys',
        call: 'getRequest',
      }));

      const diff = await _.difference(queueKeys, lockKeys);
      const keysToClean = await _.difference(lockKeys, queueKeys);

      await this.storage.clean(keysToClean);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: diff,
        callType: 'diff',
        call: 'getRequest',
      }));

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: keysToClean,
        callType: 'keysToClean',
        call: 'getRequest',
      }));

      let resultList = null;

      if (_.size(diff)) {
        resultList = _.filter(queueList, (request: any) => {
          if (_.includes(diff, request.requestId)) {
            return true;
          }
        });
        console.log(JSON.stringify({
          runId: this.data.runId,
          requestId: _.get(this.data, ['request', 'requestId'], null),
          value: queueKeys,
          callType: 'queueKeys',
          call: 'getRequest',
        }));
      } else {
        resultList = queueList;
      }

      for (let i = 0; i <= this.config.contactService.reCheckTreshold; i++) {
        if (!_.get(resultList, [ i ])) {
          break;
        }

        const free = await this.storage.check(resultList[i].requestId);
        if (!free) {
          continue;
        }

        this.data.request = resultList[i];
        break;
      }

      if (!_.get(this, ['data', 'request'])) {
        throw new Error('There is no free requests');
      }

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: this.data.request,
        callType: 'TASK',
        call: 'getRequest',
      }));

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'getRequest',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'getRequest',
      }));
    }

    return true;
  }],
  ['requestLock', async function requestLock() {
    try {
      this.data.history.push('HrequestLock');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'requestLock',
      }));
      await this.storage.lock(this.data.request.requestId, 90);
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'requestLock',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'requestLock',
      }));
    }

    return true;
  }],
  ['requestLockRelative', async function requestLockRelative() {
    try {
      // !!!!!!!!!!!!!!!!!!!!!!!!!
      this.data.history.push('HrequestLockRelative');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'requestLockRelative',
      }));
      await this.storage.lock(this.data.request.requestId, 10);
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'requestLockRelative',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'requestLockRelative',
      }));
    }

    return true;
  }],
      ['requestLockLong', async function requestLockLong() {
        try {
          this.data.history.push('HrequestLockLong');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'requestLockLong',
      }));
      await this.storage.lock(this.data.request.requestId, 60 * 24 * 30);
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'requestLockLong',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'requestLockLong',
      }));
    }

    return true;
  }],
  ['requestStatusProcess', async function requestStatusProcess() {
    try {
      this.data.history.push('HrequestStatusProcess');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'requestStatusProcess',
      }));
      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.processRequest}`,
        // 'jsonserver:9200',
        {
          meta: this.data.meta,
          data: {
            sessionId: this.data.sessionId,
            requestId: this.data.request.requestId,
          },
        },
      );

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'requestStatusProcess',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'requestStatusProcess',
      }));
    }

    return true;
  }],
  ['getRequestOrderList', async function getRequestOrderList() {
    try {
      this.data.history.push('HgetRequestOrderList');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'getRequestOrderList',
      }));
      this.data.orderIds = _.map(this.data.request.targets, (_data: any) => _data.customerOrderId);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: this.data.orderIds,
        callType: 'TASK',
        call: 'getRequestOrderList',
      }));

      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.getOrderList}`,
      {
        meta: this.data.meta,
        data: {
          sessionId: this.data.sessionId,
          customerOrderId: this.data.orderIds,
          limit: 10
        },
      });
      // const res = await axios.get(
      //   `http://jsonserver/orders`,
      // );

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

      const orders = _.get(res.data, 'data', false);

      if (!orders || !_.isArray(orders)) {
        throw new Error('data is empty');
      }

      this.data.orders = orders;

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'getRequestOrderList',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'getRequestOrderList',
      }));
    }

    return true;
  }],
  ['getOrder', async function getOrder() {
    try {
      this.data.history.push('HgetOrder');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'getOrder',
      }));

      const res = await axios.post(
        `${this.config.omsService.url}${this.config.omsService.API.getOrdersById}`,
      {
        meta: this.data.meta,
        data: this.data.orderIds,
      });
      // const res = await axios.get(
      //   `http://jsonserver/orders`,
      // );

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

      const orders = _.get(res.data, 'data', false);

      if (!orders || !_.isArray(orders)) {
        throw new Error('data is empty');
      }

      this.data.ordersOms = orders;

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'getOrder',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'getOrder',
      }));
    }

    return true;
  }],
  ['stop', async function stop() {
    try {
      this.data.history.push('Hstop');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'stop',
      }));
      throw new Error('BLOCK');

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'stop',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'stop',
      }));
    }

    return true;
  }],
  ['requestStatusHold', async function requestStatusHold() {
    try {
      this.data.history.push('HrequestStatusHold');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'requestStatusHold',
      }));

      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.holdRequest}`,
        {
          meta: this.data.meta,
          data: {
            sessionId: this.data.sessionId,
            requestId: this.data.request.requestId,
          },
        },
      );


      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'requestStatusHold',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'requestStatusHold',
      }));
    }

    return true;
  }],
  ['deliveryStatusConfirm', async function deliveryStatusConfirm() {
    try {
      this.data.history.push('HdeliveryStatusConfirm');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'deliveryStatusConfirm',
      }));

      const delivery = _.get(this.data.orders, [
        '0',
        'deliveries',
        '0',
      ]);

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: delivery,
        callType: 'TASK',
        call: 'deliveryStatusConfirm',
      }));


      let shipmentOrderItems = [];

      for (let shipmentOrder of delivery.shipmentOrders) {
        for (let shipmentOrderItem of shipmentOrder.shipmentOrderItems) {
          if (!shipmentOrderItem.isDelivery) {
            const mapped = {
              id: shipmentOrderItem.shipmentOrderItemId,
              name: shipmentOrderItem.goods.goodsData.name,
            }
            shipmentOrderItems.push(mapped);
          }
        }
      }

      const deliveryRejectResolutionId: any = null;

      const data = {
        sessionId: this.data.sessionId,
        requestId: this.data.request.requestId,
        customerOrderId: delivery.customerOrderId,
        customerId: this.data.orders[0].customerId,
        lastMileOperatorCode: delivery.lastMileOperatorCode,
        lastMileOperatorName: delivery.lastMileOperatorName,
        statuses: delivery.statuses,
        acceptedBy3pl: delivery.acceptedBy3pl,
        registeredBy3pl: delivery.registeredBy3pl,
        deliveryRejectResolutionId,
        delivery: {
            id: delivery.deliveryId,
            dateFrom: delivery.dateFrom,
            dateTo: delivery.dateTo,
            address: delivery.deliveryAddress2,
            recipient: delivery.recipient,
            shipmentOrderItems: shipmentOrderItems
        },
        initialDelivery: {
          address: {
              ...delivery.deliveryAddress2,
              access: delivery.deliveryAddress2.access
          },
          dateFrom: delivery.deliveryDateFrom,
          dateTo: delivery.deliveryDateTo,
          id: delivery.deliveryId,
          recipient: delivery.recipient,
          shipmentOrderItems: shipmentOrderItems
        }
      };

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: data,
        callType: 'TASK',
        call: 'deliveryStatusConfirm',
      }));

      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.confirmOrder}`,
        {
          meta: this.data.meta,
          data
        },
      );

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: res.data,
        callType: 'TASK',
        call: 'deliveryStatusConfirm',
      }));

        if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'deliveryStatusConfirm',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'deliveryStatusConfirm',
      }));
    }

    return true;
  }],
  ['commentAdd', async function commentAdd() {
    try {
      this.data.history.push('HcommentAdd');
      // return true;
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'commentAdd',
      }));

      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.saveComment}`,
        {
          meta: this.data.meta,
          data: {
            sessionId: this.data.sessionId,
            requestId: this.data.request.requestId,
            commentText: `Заявка №${_.get(this.data, ['request', 'requestId'], 'unknown')} обработана роботом`,
            customerOrderId: this.data.orders[0].customerOrderId,
          },
        },
      );

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: res.data,
        callType: 'TASK',
        call: 'commentAdd',
      }));

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'commentAdd',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'commentAdd',
      }));
    }

    return true;
  }],
  ['commentAddFailure', async function commentAddFailure() {
    try {
      this.data.history.push('HcommentAddFailure');
      // return true;
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'commentAddFailure',
      }));
      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.saveComment}`,
        {
          meta: this.data.meta,
          data: {
            sessionId: this.data.sessionId,
            requestId: this.data.request.requestId,
            commentText: `Заявка №${_.get(this.data, ['request', 'requestId'], 'unknown')} НЕ обработана роботом`,
            customerOrderId: this.data.orders[0].customerOrderId,
          },
        },
      );

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: res.data,
        callType: 'TASK',
        call: 'commentAddFailure',
      }));

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'commentAddFailure',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'commentAddFailure',
      }));
    }

    return true;
  }],
  ['eventEmit', async function eventEmit() {
    try {
      this.data.history.push('HeventEmit');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'eventEmit',
      }));

      let event: String;
      if (this.data.orders[0].paymentTypeCode === 'CASH_ON_DELIVERY') {
        event = 'customerOrderFlowEventDeliveryCompositionChanged';
      }

      if (this.data.orders[0].paymentTypeCode === 'CARD_ONLINE') {
        event = 'customerOrderFlowEventDeliveryCompositionPrepaidChanged';
      }

      if (event !== undefined) {
        _.each(this.data.orders[0].deliveries, async delivery => {
          const context = {
            customerOrder: this.data.ordersOms[0],
            phone: this.data.orders[0].customer.phone,
            customerFirstName: this.data.orders[0].customer.firstName,
            deliveryIntervalFrom: moment(delivery.dateFrom).format('HH:mm'),
            deliveryIntervalTo: moment(delivery.dateTo).format('HH:mm'),
            // orderNo: orderNo, WHERE i can find it
            deliveryDate: moment(delivery.dateFrom).format('DD.MM.YYYY'),
            deliveryDealAmount: delivery.payOnDelivery,
            deliveryNo: delivery.deliveryId,
          };
          console.log(JSON.stringify({
            value: context,
            runId: this.data.runId,
            requestId: _.get(this.data, ['request', 'requestId'], null),
            callType: 'TASK',
            call: 'eventEmit',
          }));
          const res = await axios.post(
            `${this.config.cmnService.url}${this.config.cmnService.API.messageSend}`,
            {
              meta: this.data.meta,
              data: {
                sessionId: this.data.sessionId,
                requestId: this.data.request.requestId,
                event: event,
                context: context
              },
            },
          );

          if (_.isEmpty(res.data)) {
            throw new Error('data is empty');
          }

          if (!_.get(res.data, 'success', false)) {
            throw new Error(res.data.error.message);
          }

          console.log(JSON.stringify({
            runId: this.data.runId,
            requestId: _.get(this.data, ['request', 'requestId'], null),
            value: res.data,
            callType: 'TASK',
            call: 'eventEmit',
          }));
        });
      }
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'eventEmit',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'eventEmit',
      }));
    }

    return true;
  }],
  ['eventEmitDeliveryConfirm', async function eventEmitDeliveryConfirm() {
    try {
      this.data.history.push('HeventEmitDeliveryConfirm');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'eventEmitDeliveryConfirm',
      }));

      let event: String;
      if (this.data.orders[0].paymentTypeCode === 'CASH_ON_DELIVERY') {
        event = 'customerOrderFlowEventCustomerAutoconfirmPayOnDelivery';
      }

      if (this.data.orders[0].paymentTypeCode === 'CARD_ONLINE') {
        event = 'customerOrderFlowEventCustomerAutoconfirmPrepaid';
      }

      if (event !== undefined) {
        _.each(this.data.orders[0].deliveries, async delivery => {
          const context = {
            customerOrder: this.data.ordersOms[0],
            phone: this.data.orders[0].customer.phone,
            customerFirstName: this.data.orders[0].customer.firstName,
            deliveryIntervalFrom: moment(delivery.dateFrom).format('HH:mm'),
            deliveryIntervalTo: moment(delivery.dateTo).format('HH:mm'),
            // orderNo: orderNo, WHERE i can find it
            deliveryDate: moment(delivery.dateFrom).format('DD.MM.YYYY'),
            deliveryDealAmount: delivery.payOnDelivery,
            deliveryNo: delivery.deliveryId,
          };
          console.log(JSON.stringify({
            value: context,
            runId: this.data.runId,
            requestId: _.get(this.data, ['request', 'requestId'], null),
            callType: 'TASK',
            call: 'eventEmitDeliveryConfirm',
          }));
          const res = await axios.post(
            `${this.config.cmnService.url}${this.config.cmnService.API.messageSend}`,
            {
              meta: this.data.meta,
              data: {
                sessionId: this.data.sessionId,
                requestId: this.data.request.requestId,
                event: event,
                context: context
              },
            },
          );

          if (_.isEmpty(res.data)) {
            throw new Error('data is empty');
          }

          if (!_.get(res.data, 'success', false)) {
            throw new Error(res.data.error.message);
          }

          console.log(JSON.stringify({
            runId: this.data.runId,
            requestId: _.get(this.data, ['request', 'requestId'], null),
            value: res.data,
            callType: 'TASK',
            call: 'eventEmitDeliveryConfirm',
          }));
        });
      }
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'eventEmitDeliveryConfirm',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'eventEmitDeliveryConfirm',
      }));
    }

    return true;
  }],
  ['requestStatusClosed', async function requestStatusClosed() {
    try {
      this.data.history.push('HrequestStatusClosed');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'requestStatusClosed',
      }));
      const res = await axios.post(
        `${this.config.contactService.url}${this.config.contactService.API.closeRequest}`,
        // 'jsonserver:9200',
        {
          meta: this.data.meta,
          data: {
            sessionId: this.data.sessionId,
            requestId: this.data.request.requestId,
            resolutionId: this.config.contactService.resolutionid,
          },
        },
      );

      if (_.isEmpty(res.data)) {
        throw new Error('data is empty');
      }

      if (!_.get(res.data, 'success', false)) {
        throw new Error(res.data.error.message);
      }

      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: res.data,
        callType: 'TASK',
        call: 'requestStatusClosed',
      }));

    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'requestStatusClosed',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'requestStatusClosed',
      }));
    }

    return true;
  }],
  ['success', async function success() {
    console.log(JSON.stringify({
      runId: this.data.runId,
      requestId: _.get(this.data, ['request', 'requestId'], null),
      value: 'CALL',
      callType: 'TASK',
      call: 'success',
    }));
    return true;
  }],
  ['testLock', async function testLock() {
    try {
      this.data.history.push('HtestLock');
      await this.storage.lock(42);
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'testLock',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'testLock',
      }));
    }

    return true;
  }],
  ['testCheck', async function testCheck() {
    try {
      this.data.history.push('HtestCheck');
      await this.storage.check(42);
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'testCheck',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'testCheck',
      }));
    }

    return true;
  }],
  ['logHistory', async function logHistory() {
    try {
      this.data.history.push('HlogHistory');
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'CALL',
        callType: 'TASK',
        call: 'logHistory',
        history: this.data.history,
      }));
    } catch (error) {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'ERROR',
        err: error,
        callType: 'TASK',
        call: 'logHistory',
      }));
      return false;
    } finally {
      console.log(JSON.stringify({
        runId: this.data.runId,
        requestId: _.get(this.data, ['request', 'requestId'], null),
        value: 'STEP OUT',
        callType: 'TASK',
        call: 'logHistory',
      }));
    }

    return true;
  }],
]);

export const TestFunctions = new Map([
  ['success', async function success() {
    console.log(JSON.stringify({
      runId: this.data.runId,
      requestId: _.get(this.data, ['request', 'requestId'], null),
      value: 'CALL',
      callType: 'TASK',
      call: 'success',
    }));
    return true;
  }],
  ['failure', async function failure() {
    console.log(JSON.stringify({
      runId: this.data.runId,
      requestId: _.get(this.data, ['request', 'requestId'], null),
      value: 'CALL',
      callType: 'TASK',
      call: 'failure',
    }));
    return false;
  }],
  ['side', async function side() {
    console.log(JSON.stringify({
      runId: this.data.runId,
      requestId: _.get(this.data, ['request', 'requestId'], null),
      value: 'CALL',
      callType: 'TASK',
      call: 'side',
    }));

    return true;
  }],
  ['test', async function test() {
    console.log(JSON.stringify({
      runId: this.data.runId,
      requestId: _.get(this.data, ['request', 'requestId'], null),
      value: 'CALL',
      callType: 'CONDITION',
      call: 'test',
    }));

    return true;
  }],
]);

export default Functions;
