export type RequestBase = {
  requestId: number,
  requestTypeId: number,
  requestTypeCode: string,
  requestTypeName: string,
  requestPriority: number,
};

export type RequestDateMixin = {
  requestStartDate: null | string,
  requestEndDate: null | string,
};

export type RequestStatusMixin = {
  isTerminal: number | boolean,
  isInitial: number | boolean,
};

export type WorkflowMixin = {
  workflowId: number,
  workflowCode: string,
  workflowName: string,
};

export type StageMixin = {
  stageId: number,
  stageCode: string,
  stageName: string,
};

export type StageDateMixin = {
  stageStartDate: string,
  stageEndDate: null,
};

export type ResolutionMixin = {
  resolutionId: null,
  resolutionText: null,
};

export type AssigneeMixin = {
  assignedUserId: number,
  assignedUserLogin: string,
  assignedUserFirstName: string,
  assignedUserLastName: string,
  assignedUserMiddleName: string,
  countInWork: number,
};

export type RequestDeliveries = {
  data: Delivery[],
};

export type Delivery = {
  customerOrderId: string,
  deliveryId: string,
  targetData: [
    {
      targetId: number,
      targetName: string,
    }
  ],
};

export type Request =
  RequestBase &
  RequestDateMixin &
  RequestStatusMixin &
  RequestDeliveries &
  WorkflowMixin &
  StageMixin &
  StageDateMixin &
  ResolutionMixin &
  AssigneeMixin;
