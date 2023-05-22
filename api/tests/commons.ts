import request from 'supertest';
import { UserEntity, collections } from '../src/data';
import { authService } from '../src/services';
import { plainToInstance } from '../src/helpers';

export function getTestServerParams() {
  return {
    dbUrl: process.env.DB_CONN_STRING ?? '',
    dbName: process.env.DB_NAME ?? '',
  };
}

interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
  token?: string;
}

interface GraphQLResponse {
  data: Record<string, any>;
  errors: Record<string, any>[];
  hasErrors: boolean;
}

export async function graphqlRequest(
  requestData: GraphQLRequest
): Promise<GraphQLResponse> {
  const preparedRequest = request('http://localhost:4000')
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  if (requestData.token) {
    preparedRequest.set('Authorization', `Bearer ${requestData.token}`);
  }

  const response = await preparedRequest.send(requestData);

  if (response.error) {
    console.error(response.error.text);
    throw response.error;
  }

  const data = response.body.data;
  const errors = response.body.errors ?? [];

  return {
    data,
    errors,
    hasErrors: errors.length !== 0,
  };
}

export async function saveUser(username = 'test', password = 'super-test') {
  const result = await authService.hashPassword(password);
  const user = await collections.user.insertOne(
    plainToInstance(UserEntity, {
      username,
      passwordHash: result.hash,
      salt: result.salt,
    })
  );

  return user.insertedId.toString();
}

export async function getValidToken(userId: string, username = 'test') {
  return authService.generateToken(userId, username);
}
