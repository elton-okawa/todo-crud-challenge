import request from 'supertest';

const DB_CONN_STRING = 'mongodb://admin:admin@localhost:27018';
const DB_NAME = 'test';

export const testServerParams = { dbUrl: DB_CONN_STRING, dbName: DB_NAME };

interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

interface GraphQLResponse {
  data: Record<string, any>;
  errors: Record<string, any>[];
  hasErrors: boolean;
}

export async function graphqlRequest(
  requestData: GraphQLRequest
): Promise<GraphQLResponse> {
  const response = await request('http://localhost:4000')
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(requestData);

  if (response.error) {
    console.error(response.error.text);
    throw response.error;
  }

  const data = response.body.data;
  const errors = response.body.data?.errors ?? [];

  return {
    data,
    errors,
    hasErrors: errors.length !== 0,
  };
}
