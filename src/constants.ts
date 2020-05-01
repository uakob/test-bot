export enum resultCodes {
  SUCCESS = 'SUCCESS',
}

/**
  Наименование                                                    Код
  Подтверждение доставки. Этап подтверждения                      0
  Согласование состава доставки. Этап подтверждения               1
  Информирование об отмене доставки. Этап подтверждения           2
  Согласование даты доставки. Этап подтверждения                  3
  Согласование состава и даты доставки. Этап подтверждения        4
  Согласование состава и даты доставки                            5
  Согласование нового способа доставки.                           6
  Согласование новой даты доставки                                7
**/
export enum orderStatus {
  DELIVERY_APPROVE,
}

export enum requestStatus {
  CREATED = 1,
  IN_PROGRESS = 2,
  CLOSE = 5,
  HOLD = 6,
  RECALL = 7,
  CANCELED = 8,
}

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
