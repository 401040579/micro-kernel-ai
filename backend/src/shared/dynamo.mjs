/**
 * DynamoDB helpers using AWS SDK v3.
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Put an item into a DynamoDB table.
 */
export async function putItem(tableName, item) {
  await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
}

/**
 * Get a single item by primary key.
 */
export async function getItem(tableName, key) {
  const result = await docClient.send(
    new GetCommand({ TableName: tableName, Key: key })
  );
  return result.Item || null;
}

/**
 * Query items by partition key.
 */
export async function queryItems(tableName, pkName, pkValue) {
  const result = await docClient.send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: '#pk = :pk',
      ExpressionAttributeNames: { '#pk': pkName },
      ExpressionAttributeValues: { ':pk': pkValue },
    })
  );
  return result.Items || [];
}
