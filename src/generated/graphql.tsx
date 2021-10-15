import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type AccuracyCreateInput = {
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

/** User auth provider service */
export enum AuthProvider {
  Default = 'DEFAULT',
  Discord = 'DISCORD',
  Github = 'GITHUB',
  Google = 'GOOGLE'
}

export type CharsPerMinuteCreateInput = {
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CreateTestPresetHistoryInput = {
  accuracy: Scalars['Float'];
  correctChars: Scalars['Float'];
  cpm: Scalars['Float'];
  incorrectChars: Scalars['Float'];
  keystrokes: Scalars['Float'];
  testPresetId: Scalars['String'];
  userId: Scalars['String'];
  wpm: Scalars['Float'];
};

export type CreateTestPresetInput = {
  creatorImage?: Maybe<Scalars['String']>;
  language: TestLanguage;
  time: Scalars['Int'];
  type: TestType;
  userId?: Maybe<Scalars['String']>;
  words: Scalars['Int'];
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FilteredUser = {
  __typename?: 'FilteredUser';
  authProvider?: Maybe<AuthProvider>;
  avatar: Scalars['String'];
  country: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
  value: Scalars['Float'];
};

export type FilteredUsersResponse = {
  __typename?: 'FilteredUsersResponse';
  currentPage?: Maybe<Scalars['Int']>;
  errors?: Maybe<Array<ErrorResponse>>;
  hasMore?: Maybe<Scalars['Boolean']>;
  nodeCount?: Maybe<Scalars['Int']>;
  nodes?: Maybe<Array<FilteredUser>>;
  nodesPerPage?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
};

export type FollowUserResponse = {
  __typename?: 'FollowUserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  follow?: Maybe<Scalars['Boolean']>;
};

export type InputUpdateInput = {
  decrement?: Maybe<Scalars['Float']>;
  divide?: Maybe<Scalars['Float']>;
  increment?: Maybe<Scalars['Float']>;
  multiply?: Maybe<Scalars['Float']>;
  set?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTestPreset: TestPresetResponse;
  createTestPresetHistoryEntry: TestPresetHistoryResponse;
  createTestPresetUser: TestPresetResponse;
  followUser: FollowUserResponse;
  logout: Scalars['Boolean'];
  unfollowUser: UnfollowUserResponse;
  updateUser: UserResponse;
  userCreateTestPresetHistoryEntry: TestPresetHistoryResponse;
};


export type MutationCreateTestPresetArgs = {
  data: CreateTestPresetInput;
};


export type MutationCreateTestPresetHistoryEntryArgs = {
  input: CreateTestPresetHistoryInput;
};


export type MutationCreateTestPresetUserArgs = {
  data: CreateTestPresetInput;
};


export type MutationFollowUserArgs = {
  targetUserId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  targetUserId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereInput;
};


export type MutationUserCreateTestPresetHistoryEntryArgs = {
  input: CreateTestPresetHistoryInput;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  filterUsers: FilteredUsersResponse;
  followsUser: Scalars['Boolean'];
  me: UserResponse;
  testPreset: TestPresetResponse;
  testPresets: TestPresetsResponse;
  user: UserResponse;
  userFollowers: UserFollowersResponse;
  userTestPresets: TestPresetsResponse;
  users: UsersResponse;
};


export type QueryFilterUsersArgs = {
  filterBy: UserFilterBy;
  page: Scalars['Int'];
};


export type QueryFollowsUserArgs = {
  targetUserId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryTestPresetArgs = {
  id: Scalars['String'];
};


export type QueryTestPresetsArgs = {
  input?: Maybe<TestPresetsFindInput>;
};


export type QueryUserArgs = {
  where: UserWhereInput;
};


export type QueryUserFollowersArgs = {
  userId: Scalars['String'];
};


export type QueryUserTestPresetsArgs = {
  userId: Scalars['String'];
};


export type QueryUsersArgs = {
  take: Scalars['Int'];
};

/** Test Language */
export enum TestLanguage {
  English = 'ENGLISH',
  Spanish = 'SPANISH'
}

export type TestPreset = {
  __typename?: 'TestPreset';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  creator: User;
  creatorImage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<TestLanguage>;
  time?: Maybe<Scalars['Int']>;
  type?: Maybe<TestType>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  userId?: Maybe<Scalars['String']>;
  words?: Maybe<Scalars['Int']>;
};

export type TestPresetHistory = {
  __typename?: 'TestPresetHistory';
  accuracy: Scalars['Float'];
  correctChars: Scalars['Float'];
  cpm: Scalars['Float'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  incorrectChars: Scalars['Float'];
  keystrokes: Scalars['Float'];
  testPresetId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
  wpm: Scalars['Float'];
};

export type TestPresetHistoryResponse = {
  __typename?: 'TestPresetHistoryResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  testPresetHistory?: Maybe<TestPresetHistory>;
};

export type TestPresetResponse = {
  __typename?: 'TestPresetResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  testPreset?: Maybe<TestPreset>;
};

export type TestPresetWhereInput = {
  id?: Maybe<Scalars['String']>;
  language?: Maybe<TestLanguage>;
  time?: Maybe<Scalars['Int']>;
  type?: Maybe<TestType>;
  userId?: Maybe<Scalars['String']>;
  words?: Maybe<Scalars['Int']>;
};

export type TestPresetsFindInput = {
  cursor?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where?: Maybe<TestPresetWhereInput>;
};

export type TestPresetsResponse = {
  __typename?: 'TestPresetsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  testPresets?: Maybe<Array<TestPreset>>;
};

/** Test Type */
export enum TestType {
  Time = 'TIME',
  Words = 'WORDS'
}

export type UnfollowUserResponse = {
  __typename?: 'UnfollowUserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  unfollow?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  authProvider?: Maybe<AuthProvider>;
  avatar?: Maybe<Scalars['String']>;
  badge?: Maybe<UserBadge>;
  country?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  followedBy?: Maybe<Array<UserOnUser>>;
  following?: Maybe<Array<UserOnUser>>;
  id: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  testPresetHistory?: Maybe<Array<TestPresetHistory>>;
  testPresets?: Maybe<Array<TestPreset>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
};

/** User Badges */
export enum UserBadge {
  Default = 'DEFAULT',
  Pro = 'PRO',
  Tester = 'TESTER'
}

/** Fields to filter Users By */
export enum UserFilterBy {
  Accuracy = 'ACCURACY',
  Cpm = 'CPM',
  Keystrokes = 'KEYSTROKES',
  Testscompleted = 'TESTSCOMPLETED',
  Wpm = 'WPM'
}

export type UserFollower = {
  __typename?: 'UserFollower';
  authProvider?: Maybe<AuthProvider>;
  avatar: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
};

export type UserFollowersResponse = {
  __typename?: 'UserFollowersResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  users?: Maybe<Array<UserFollower>>;
};

export type UserOnUser = {
  __typename?: 'UserOnUser';
  child?: Maybe<User>;
  childId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  parent?: Maybe<User>;
  parentId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  user?: Maybe<User>;
};

export type UserUpdateInput = {
  accuracy?: Maybe<AccuracyCreateInput>;
  badge?: Maybe<UserBadge>;
  charsPerMinute?: Maybe<CharsPerMinuteCreateInput>;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  keystrokes?: Maybe<InputUpdateInput>;
  name?: Maybe<Scalars['String']>;
  testsCompleted?: Maybe<InputUpdateInput>;
  wordsPerMinute?: Maybe<WordsPerMinuteCreateInput>;
  wordsWritten?: Maybe<InputUpdateInput>;
};

export type UserWhereInput = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  users?: Maybe<Array<User>>;
};

export type WordsPerMinuteCreateInput = {
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type FilteredUserFragment = { __typename?: 'FilteredUser', id: string, username: string, avatar: string, country: string, authProvider?: AuthProvider | null | undefined, oauthId?: string | null | undefined, value: number };

export type TestPresetFragment = { __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any };

export type TestPresetHistoryFragment = { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any };

export type UserFragment = { __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined };

export type UserFollowerFragment = { __typename?: 'UserFollower', id: string, username: string, authProvider?: AuthProvider | null | undefined, oauthId?: string | null | undefined, avatar: string };

export type ErrorResponseFragment = { __typename?: 'ErrorResponse', field: string, message: string };

export type FilteredUsersResponseFragment = { __typename?: 'FilteredUsersResponse', nodeCount?: number | null | undefined, pageCount?: number | null | undefined, currentPage?: number | null | undefined, nodesPerPage?: number | null | undefined, hasMore?: boolean | null | undefined, nodes?: Array<{ __typename?: 'FilteredUser', id: string, username: string, avatar: string, country: string, authProvider?: AuthProvider | null | undefined, oauthId?: string | null | undefined, value: number }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type FollowUserResponseFragment = { __typename?: 'FollowUserResponse', follow?: boolean | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type TestPresetHistoryResponseFragment = { __typename?: 'TestPresetHistoryResponse', testPresetHistory?: { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type TestPresetResponseFragment = { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type TestPresetsResponseFragment = { __typename?: 'TestPresetsResponse', testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type UnfollowUserResponseFragment = { __typename?: 'UnfollowUserResponse', unfollow?: boolean | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type UserFollowersResponseFragment = { __typename?: 'UserFollowersResponse', users?: Array<{ __typename?: 'UserFollower', id: string, username: string, authProvider?: AuthProvider | null | undefined, oauthId?: string | null | undefined, avatar: string }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type UserResponseFragment = { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type UsersResponseFragment = { __typename?: 'UsersResponse', users?: Array<{ __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined };

export type CreateTestPresetHistoryEntryMutationVariables = Exact<{
  input: CreateTestPresetHistoryInput;
}>;


export type CreateTestPresetHistoryEntryMutation = { __typename?: 'Mutation', createTestPresetHistoryEntry: { __typename?: 'TestPresetHistoryResponse', testPresetHistory?: { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type UserCreateTestPresetHistoryEntryMutationVariables = Exact<{
  userId: Scalars['String'];
  input: CreateTestPresetHistoryInput;
}>;


export type UserCreateTestPresetHistoryEntryMutation = { __typename?: 'Mutation', userCreateTestPresetHistoryEntry: { __typename?: 'TestPresetHistoryResponse', testPresetHistory?: { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type CreateTestPresetMutationVariables = Exact<{
  data: CreateTestPresetInput;
}>;


export type CreateTestPresetMutation = { __typename?: 'Mutation', createTestPreset: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type CreateTestPresetUserMutationVariables = Exact<{
  data: CreateTestPresetInput;
}>;


export type CreateTestPresetUserMutation = { __typename?: 'Mutation', createTestPresetUser: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  targetUserId: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'FollowUserResponse', follow?: boolean | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  targetUserId: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'UnfollowUserResponse', unfollow?: boolean | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type UpdateUserMutationVariables = Exact<{
  where: UserWhereInput;
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type TestPresetQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TestPresetQuery = { __typename?: 'Query', testPreset: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type TestPresetsQueryVariables = Exact<{
  input: TestPresetsFindInput;
}>;


export type TestPresetsQuery = { __typename?: 'Query', testPresets: { __typename?: 'TestPresetsResponse', testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type UserTestPresetsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserTestPresetsQuery = { __typename?: 'Query', userTestPresets: { __typename?: 'TestPresetsResponse', testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type FilterUsersQueryVariables = Exact<{
  page: Scalars['Int'];
  filterBy: UserFilterBy;
}>;


export type FilterUsersQuery = { __typename?: 'Query', filterUsers: { __typename?: 'FilteredUsersResponse', nodeCount?: number | null | undefined, pageCount?: number | null | undefined, currentPage?: number | null | undefined, nodesPerPage?: number | null | undefined, hasMore?: boolean | null | undefined, nodes?: Array<{ __typename?: 'FilteredUser', id: string, username: string, avatar: string, country: string, authProvider?: AuthProvider | null | undefined, oauthId?: string | null | undefined, value: number }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type FollowsUserQueryVariables = Exact<{
  userId: Scalars['String'];
  targetUserId: Scalars['String'];
}>;


export type FollowsUserQuery = { __typename?: 'Query', followsUser: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type UserQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined } | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type UserFollowersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserFollowersQuery = { __typename?: 'Query', userFollowers: { __typename?: 'UserFollowersResponse', users?: Array<{ __typename?: 'UserFollower', id: string, username: string, authProvider?: AuthProvider | null | undefined, oauthId?: string | null | undefined, avatar: string }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export type UsersQueryVariables = Exact<{
  take: Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResponse', users?: Array<{ __typename?: 'User', id: string, oauthId?: string | null | undefined, username?: string | null | undefined, description?: string | null | undefined, avatar?: string | null | undefined, country?: string | null | undefined, badge?: UserBadge | null | undefined, authProvider?: AuthProvider | null | undefined, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt: any, updatedAt: any }> | null | undefined, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null | undefined, type?: TestType | null | undefined, time?: number | null | undefined, language?: TestLanguage | null | undefined, words?: number | null | undefined, creatorImage?: string | null | undefined, createdAt: any, updatedAt: any }> | null | undefined }> | null | undefined, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null | undefined } };

export const FilteredUserFragmentDoc = gql`
    fragment FilteredUser on FilteredUser {
  id
  username
  avatar
  country
  authProvider
  oauthId
  value
}
    `;
export const ErrorResponseFragmentDoc = gql`
    fragment ErrorResponse on ErrorResponse {
  field
  message
}
    `;
export const FilteredUsersResponseFragmentDoc = gql`
    fragment FilteredUsersResponse on FilteredUsersResponse {
  nodes {
    ...FilteredUser
  }
  errors {
    ...ErrorResponse
  }
  nodeCount
  pageCount
  currentPage
  nodesPerPage
  hasMore
}
    ${FilteredUserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const FollowUserResponseFragmentDoc = gql`
    fragment FollowUserResponse on FollowUserResponse {
  follow
  errors {
    ...ErrorResponse
  }
}
    ${ErrorResponseFragmentDoc}`;
export const TestPresetHistoryFragmentDoc = gql`
    fragment TestPresetHistory on TestPresetHistory {
  id
  userId
  testPresetId
  wpm
  cpm
  accuracy
  keystrokes
  correctChars
  incorrectChars
  createdAt
  updatedAt
}
    `;
export const TestPresetHistoryResponseFragmentDoc = gql`
    fragment TestPresetHistoryResponse on TestPresetHistoryResponse {
  testPresetHistory {
    ...TestPresetHistory
  }
  errors {
    ...ErrorResponse
  }
}
    ${TestPresetHistoryFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const TestPresetFragmentDoc = gql`
    fragment TestPreset on TestPreset {
  id
  userId
  type
  time
  language
  words
  creatorImage
  createdAt
  updatedAt
}
    `;
export const TestPresetResponseFragmentDoc = gql`
    fragment TestPresetResponse on TestPresetResponse {
  testPreset {
    ...TestPreset
  }
  errors {
    ...ErrorResponse
  }
}
    ${TestPresetFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const TestPresetsResponseFragmentDoc = gql`
    fragment TestPresetsResponse on TestPresetsResponse {
  testPresets {
    ...TestPreset
  }
  errors {
    ...ErrorResponse
  }
}
    ${TestPresetFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const UnfollowUserResponseFragmentDoc = gql`
    fragment UnfollowUserResponse on UnfollowUserResponse {
  unfollow
  errors {
    ...ErrorResponse
  }
}
    ${ErrorResponseFragmentDoc}`;
export const UserFollowerFragmentDoc = gql`
    fragment UserFollower on UserFollower {
  id
  username
  authProvider
  oauthId
  avatar
}
    `;
export const UserFollowersResponseFragmentDoc = gql`
    fragment UserFollowersResponse on UserFollowersResponse {
  users {
    ...UserFollower
  }
  errors {
    ...ErrorResponse
  }
}
    ${UserFollowerFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  oauthId
  username
  description
  avatar
  country
  badge
  authProvider
  testPresetHistory {
    ...TestPresetHistory
  }
  testPresets {
    ...TestPreset
  }
}
    ${TestPresetHistoryFragmentDoc}
${TestPresetFragmentDoc}`;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  user {
    ...User
  }
  errors {
    ...ErrorResponse
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const UsersResponseFragmentDoc = gql`
    fragment UsersResponse on UsersResponse {
  users {
    ...User
  }
  errors {
    ...ErrorResponse
  }
}
    ${UserFragmentDoc}
${ErrorResponseFragmentDoc}`;
export const CreateTestPresetHistoryEntryDocument = gql`
    mutation createTestPresetHistoryEntry($input: CreateTestPresetHistoryInput!) {
  createTestPresetHistoryEntry(input: $input) {
    ...TestPresetHistoryResponse
  }
}
    ${TestPresetHistoryResponseFragmentDoc}`;
export type CreateTestPresetHistoryEntryMutationFn = Apollo.MutationFunction<CreateTestPresetHistoryEntryMutation, CreateTestPresetHistoryEntryMutationVariables>;

/**
 * __useCreateTestPresetHistoryEntryMutation__
 *
 * To run a mutation, you first call `useCreateTestPresetHistoryEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestPresetHistoryEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestPresetHistoryEntryMutation, { data, loading, error }] = useCreateTestPresetHistoryEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestPresetHistoryEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestPresetHistoryEntryMutation, CreateTestPresetHistoryEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTestPresetHistoryEntryMutation, CreateTestPresetHistoryEntryMutationVariables>(CreateTestPresetHistoryEntryDocument, options);
      }
export type CreateTestPresetHistoryEntryMutationHookResult = ReturnType<typeof useCreateTestPresetHistoryEntryMutation>;
export type CreateTestPresetHistoryEntryMutationResult = Apollo.MutationResult<CreateTestPresetHistoryEntryMutation>;
export type CreateTestPresetHistoryEntryMutationOptions = Apollo.BaseMutationOptions<CreateTestPresetHistoryEntryMutation, CreateTestPresetHistoryEntryMutationVariables>;
export const UserCreateTestPresetHistoryEntryDocument = gql`
    mutation userCreateTestPresetHistoryEntry($userId: String!, $input: CreateTestPresetHistoryInput!) {
  userCreateTestPresetHistoryEntry(userId: $userId, input: $input) {
    ...TestPresetHistoryResponse
  }
}
    ${TestPresetHistoryResponseFragmentDoc}`;
export type UserCreateTestPresetHistoryEntryMutationFn = Apollo.MutationFunction<UserCreateTestPresetHistoryEntryMutation, UserCreateTestPresetHistoryEntryMutationVariables>;

/**
 * __useUserCreateTestPresetHistoryEntryMutation__
 *
 * To run a mutation, you first call `useUserCreateTestPresetHistoryEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateTestPresetHistoryEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateTestPresetHistoryEntryMutation, { data, loading, error }] = useUserCreateTestPresetHistoryEntryMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateTestPresetHistoryEntryMutation(baseOptions?: Apollo.MutationHookOptions<UserCreateTestPresetHistoryEntryMutation, UserCreateTestPresetHistoryEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCreateTestPresetHistoryEntryMutation, UserCreateTestPresetHistoryEntryMutationVariables>(UserCreateTestPresetHistoryEntryDocument, options);
      }
export type UserCreateTestPresetHistoryEntryMutationHookResult = ReturnType<typeof useUserCreateTestPresetHistoryEntryMutation>;
export type UserCreateTestPresetHistoryEntryMutationResult = Apollo.MutationResult<UserCreateTestPresetHistoryEntryMutation>;
export type UserCreateTestPresetHistoryEntryMutationOptions = Apollo.BaseMutationOptions<UserCreateTestPresetHistoryEntryMutation, UserCreateTestPresetHistoryEntryMutationVariables>;
export const CreateTestPresetDocument = gql`
    mutation createTestPreset($data: CreateTestPresetInput!) {
  createTestPreset(data: $data) {
    ...TestPresetResponse
  }
}
    ${TestPresetResponseFragmentDoc}`;
export type CreateTestPresetMutationFn = Apollo.MutationFunction<CreateTestPresetMutation, CreateTestPresetMutationVariables>;

/**
 * __useCreateTestPresetMutation__
 *
 * To run a mutation, you first call `useCreateTestPresetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestPresetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestPresetMutation, { data, loading, error }] = useCreateTestPresetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTestPresetMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestPresetMutation, CreateTestPresetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTestPresetMutation, CreateTestPresetMutationVariables>(CreateTestPresetDocument, options);
      }
export type CreateTestPresetMutationHookResult = ReturnType<typeof useCreateTestPresetMutation>;
export type CreateTestPresetMutationResult = Apollo.MutationResult<CreateTestPresetMutation>;
export type CreateTestPresetMutationOptions = Apollo.BaseMutationOptions<CreateTestPresetMutation, CreateTestPresetMutationVariables>;
export const CreateTestPresetUserDocument = gql`
    mutation createTestPresetUser($data: CreateTestPresetInput!) {
  createTestPresetUser(data: $data) {
    ...TestPresetResponse
  }
}
    ${TestPresetResponseFragmentDoc}`;
export type CreateTestPresetUserMutationFn = Apollo.MutationFunction<CreateTestPresetUserMutation, CreateTestPresetUserMutationVariables>;

/**
 * __useCreateTestPresetUserMutation__
 *
 * To run a mutation, you first call `useCreateTestPresetUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestPresetUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestPresetUserMutation, { data, loading, error }] = useCreateTestPresetUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTestPresetUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestPresetUserMutation, CreateTestPresetUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTestPresetUserMutation, CreateTestPresetUserMutationVariables>(CreateTestPresetUserDocument, options);
      }
export type CreateTestPresetUserMutationHookResult = ReturnType<typeof useCreateTestPresetUserMutation>;
export type CreateTestPresetUserMutationResult = Apollo.MutationResult<CreateTestPresetUserMutation>;
export type CreateTestPresetUserMutationOptions = Apollo.BaseMutationOptions<CreateTestPresetUserMutation, CreateTestPresetUserMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($userId: String!, $targetUserId: String!) {
  followUser(userId: $userId, targetUserId: $targetUserId) {
    ...FollowUserResponse
  }
}
    ${FollowUserResponseFragmentDoc}`;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($userId: String!, $targetUserId: String!) {
  unfollowUser(userId: $userId, targetUserId: $targetUserId) {
    ...UnfollowUserResponse
  }
}
    ${UnfollowUserResponseFragmentDoc}`;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($where: UserWhereInput!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const TestPresetDocument = gql`
    query testPreset($id: String!) {
  testPreset(id: $id) {
    ...TestPresetResponse
  }
}
    ${TestPresetResponseFragmentDoc}`;

/**
 * __useTestPresetQuery__
 *
 * To run a query within a React component, call `useTestPresetQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestPresetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestPresetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTestPresetQuery(baseOptions: Apollo.QueryHookOptions<TestPresetQuery, TestPresetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestPresetQuery, TestPresetQueryVariables>(TestPresetDocument, options);
      }
export function useTestPresetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestPresetQuery, TestPresetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestPresetQuery, TestPresetQueryVariables>(TestPresetDocument, options);
        }
export type TestPresetQueryHookResult = ReturnType<typeof useTestPresetQuery>;
export type TestPresetLazyQueryHookResult = ReturnType<typeof useTestPresetLazyQuery>;
export type TestPresetQueryResult = Apollo.QueryResult<TestPresetQuery, TestPresetQueryVariables>;
export const TestPresetsDocument = gql`
    query testPresets($input: TestPresetsFindInput!) {
  testPresets(input: $input) {
    ...TestPresetsResponse
  }
}
    ${TestPresetsResponseFragmentDoc}`;

/**
 * __useTestPresetsQuery__
 *
 * To run a query within a React component, call `useTestPresetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestPresetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestPresetsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestPresetsQuery(baseOptions: Apollo.QueryHookOptions<TestPresetsQuery, TestPresetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestPresetsQuery, TestPresetsQueryVariables>(TestPresetsDocument, options);
      }
export function useTestPresetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestPresetsQuery, TestPresetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestPresetsQuery, TestPresetsQueryVariables>(TestPresetsDocument, options);
        }
export type TestPresetsQueryHookResult = ReturnType<typeof useTestPresetsQuery>;
export type TestPresetsLazyQueryHookResult = ReturnType<typeof useTestPresetsLazyQuery>;
export type TestPresetsQueryResult = Apollo.QueryResult<TestPresetsQuery, TestPresetsQueryVariables>;
export const UserTestPresetsDocument = gql`
    query userTestPresets($userId: String!) {
  userTestPresets(userId: $userId) {
    ...TestPresetsResponse
  }
}
    ${TestPresetsResponseFragmentDoc}`;

/**
 * __useUserTestPresetsQuery__
 *
 * To run a query within a React component, call `useUserTestPresetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTestPresetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTestPresetsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserTestPresetsQuery(baseOptions: Apollo.QueryHookOptions<UserTestPresetsQuery, UserTestPresetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTestPresetsQuery, UserTestPresetsQueryVariables>(UserTestPresetsDocument, options);
      }
export function useUserTestPresetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTestPresetsQuery, UserTestPresetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTestPresetsQuery, UserTestPresetsQueryVariables>(UserTestPresetsDocument, options);
        }
export type UserTestPresetsQueryHookResult = ReturnType<typeof useUserTestPresetsQuery>;
export type UserTestPresetsLazyQueryHookResult = ReturnType<typeof useUserTestPresetsLazyQuery>;
export type UserTestPresetsQueryResult = Apollo.QueryResult<UserTestPresetsQuery, UserTestPresetsQueryVariables>;
export const FilterUsersDocument = gql`
    query filterUsers($page: Int!, $filterBy: UserFilterBy!) {
  filterUsers(page: $page, filterBy: $filterBy) {
    ...FilteredUsersResponse
  }
}
    ${FilteredUsersResponseFragmentDoc}`;

/**
 * __useFilterUsersQuery__
 *
 * To run a query within a React component, call `useFilterUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useFilterUsersQuery(baseOptions: Apollo.QueryHookOptions<FilterUsersQuery, FilterUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilterUsersQuery, FilterUsersQueryVariables>(FilterUsersDocument, options);
      }
export function useFilterUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilterUsersQuery, FilterUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilterUsersQuery, FilterUsersQueryVariables>(FilterUsersDocument, options);
        }
export type FilterUsersQueryHookResult = ReturnType<typeof useFilterUsersQuery>;
export type FilterUsersLazyQueryHookResult = ReturnType<typeof useFilterUsersLazyQuery>;
export type FilterUsersQueryResult = Apollo.QueryResult<FilterUsersQuery, FilterUsersQueryVariables>;
export const FollowsUserDocument = gql`
    query followsUser($userId: String!, $targetUserId: String!) {
  followsUser(userId: $userId, targetUserId: $targetUserId)
}
    `;

/**
 * __useFollowsUserQuery__
 *
 * To run a query within a React component, call `useFollowsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowsUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useFollowsUserQuery(baseOptions: Apollo.QueryHookOptions<FollowsUserQuery, FollowsUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowsUserQuery, FollowsUserQueryVariables>(FollowsUserDocument, options);
      }
export function useFollowsUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowsUserQuery, FollowsUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowsUserQuery, FollowsUserQueryVariables>(FollowsUserDocument, options);
        }
export type FollowsUserQueryHookResult = ReturnType<typeof useFollowsUserQuery>;
export type FollowsUserLazyQueryHookResult = ReturnType<typeof useFollowsUserLazyQuery>;
export type FollowsUserQueryResult = Apollo.QueryResult<FollowsUserQuery, FollowsUserQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query user($where: UserWhereInput!) {
  user(where: $where) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFollowersDocument = gql`
    query userFollowers($userId: String!) {
  userFollowers(userId: $userId) {
    ...UserFollowersResponse
  }
}
    ${UserFollowersResponseFragmentDoc}`;

/**
 * __useUserFollowersQuery__
 *
 * To run a query within a React component, call `useUserFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserFollowersQuery(baseOptions: Apollo.QueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, options);
      }
export function useUserFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, options);
        }
export type UserFollowersQueryHookResult = ReturnType<typeof useUserFollowersQuery>;
export type UserFollowersLazyQueryHookResult = ReturnType<typeof useUserFollowersLazyQuery>;
export type UserFollowersQueryResult = Apollo.QueryResult<UserFollowersQuery, UserFollowersQueryVariables>;
export const UsersDocument = gql`
    query users($take: Int!) {
  users(take: $take) {
    ...UsersResponse
  }
}
    ${UsersResponseFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      take: // value for 'take'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;