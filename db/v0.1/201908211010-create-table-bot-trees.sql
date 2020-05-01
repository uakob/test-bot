--liquibase formatted sql

--changeset timofej.sidorov@goods.ru:201908211010-create-table-bot-trees endDelimiter:go
if not exists (select *
                 from sys.schemas as s
                      join sys.tables as t on t.[schema_id] = s.[schema_id]
                where s.[name] = 'Bot'
                  and t.[name] = 'trees'
              )

begin
  create table Bot.trees (
      tree_id    int           identity (1, 1)
    , tree_name  nvarchar(10)  not null
    , tree_value nvarchar(max) not null
    , constraint pk_Bot_trees_tree_id primary key clustered (tree_id)
    , index ix_tree_name unique (tree_name)
    ,
  );

  exec('insert into bot.trees (
                        tree_name
                      , tree_value
                      )
values (
	     ''default''
	   , ''{
           	"nodes": [{
           		"type": "SELECTOR",
           		"nodes": [{
           			"type": "SEQUENCE",
           			"nodes": [{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "botActive",
           					"target": true,
           					"operator": "EQ"
           				}
           			},
           			{
           				"type": "TASK",
           				"action": {
           					"fn": "setMeta"
           				}
           			},
           			{
           				"type": "TASK",
           				"action": {
           					"fn": "setSessionId"
           				}
           			},
           			{
           				"type": "TASK",
             				"action": {
           					"fn": "getRequest"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestStageCode",
           					"target": "IN PROGRESS",
           					"operator": "NE"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestStageId",
           					"target": 2,
           					"operator": "NE"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestType",
           					"target": "CCS",
           					"operator": "EQ"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "resolutionType",
           					"target": 31,
           					"operator": "NE"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestActual",
           					"target": true,
           					"operator": "EQ"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestTargetsCount",
           					"target": 1,
           					"operator": "EQ"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestTarget",
           					"target": 1,
           					"operator": "EQ"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "scenarioActive",
           					"target": true,
           					"operator": "EQ"
           				}
           			},
           			{
           				"type": "DECORATOR",
           				"condition": {
           					"source": "requestTime",
           					"target": 60,
           					"operator": "GT"
           				}
           			},
           			{
           				"type": "SELECTOR",
           				"nodes": [{
           					"type": "SEQUENCE",
           					"nodes": [{
           						"type": "TASK",
           						"action": {
           							"fn": "requestStatusProcess"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "getRequestOrderList"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "getOrder"
           						}
           					},
           					{
           						"type": "DECORATOR",
           						"condition": {
           							"source": "ordersSum",
           							"target": 2000,
           							"operator": "LT"
           						}
           					},
           					{
           						"type": "DECORATOR",
           						"condition": {
           							"source": "orderActiveItemsCount",
           							"target": 0,
           							"operator": "GT"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "deliveryStatusConfirm"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "commentAdd"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "eventEmit"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "requestStatusClosed"
           						}
           					}]
           				},
           				{
           					"type": "SEQUENCE",
           					"nodes": [{
           						"type": "TASK",
           						"action": {
           							"fn": "requestLock"
           						}
           					},
           					{
           						"type": "TASK",
           						"action": {
           							"fn": "requestStatusHold"
           						}
           					}]
           				}]
           			}]
           		},
           		{
           			"type": "TASK",
           			"action": {
           				"fn": "requestLock"
           			}
           		}]
           	}]
           }'')');

end
go
