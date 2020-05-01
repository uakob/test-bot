--liquibase formatted sql

--changeset  timofej.sidorov@goods.ru:201908211000-create-schema-bot endDelimiter:go
if schema_id('Bot') is null
  exec('create schema Bot');
go
