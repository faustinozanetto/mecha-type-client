import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export type AcceptFollowRequestResponse = {
  __typename?: 'AcceptFollowRequestResponse';
  accepted?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<ErrorResponse>>;
};

export type AccuracyCreateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

/** User auth provider service */
export enum AuthProvider {
  Default = 'DEFAULT',
  Discord = 'DISCORD',
  Github = 'GITHUB',
  Google = 'GOOGLE'
}

export type CharsPerMinuteCreateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type CopyPresetToUserInput = {
  presetId: Scalars['String'];
  user: UserWhereInput;
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
  creatorImage?: InputMaybe<Scalars['String']>;
  language: TestLanguage;
  punctuated: Scalars['Boolean'];
  time: Scalars['Int'];
  type: TestType;
  userId?: InputMaybe<Scalars['String']>;
  words: Scalars['Int'];
};

export type DenyFollowRequestResponse = {
  __typename?: 'DenyFollowRequestResponse';
  denied?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<ErrorResponse>>;
};

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FilterUsersInput = {
  filterBy: UserFilterBy;
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: InputMaybe<UserWhereInput>;
};

export type FilteredUser = {
  __typename?: 'FilteredUser';
  authProvider?: Maybe<AuthProvider>;
  avatar?: Maybe<Scalars['String']>;
  badge?: Maybe<UserBadge>;
  country?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  followedBy?: Maybe<Array<UserOnUser>>;
  following?: Maybe<Array<UserOnUser>>;
  id: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  testPresetHistory?: Maybe<Array<TestPresetHistory>>;
  testPresets?: Maybe<Array<TestPreset>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
  username?: Maybe<Scalars['String']>;
  value: Scalars['Float'];
};

export type FilteredUsersEdge = {
  __typename?: 'FilteredUsersEdge';
  cursor?: Maybe<Scalars['Date']>;
  node?: Maybe<FilteredUser>;
};

export type FilteredUsersPageInfo = {
  __typename?: 'FilteredUsersPageInfo';
  endCursor?: Maybe<Scalars['Date']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['Date']>;
};

export type FilteredUsersResponse = {
  __typename?: 'FilteredUsersResponse';
  count?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<FilteredUsersEdge>>;
  errors?: Maybe<Array<ErrorResponse>>;
  pageInfo?: Maybe<FilteredUsersPageInfo>;
};

/** Status of the follow request */
export enum FollowStatus {
  Accepted = 'ACCEPTED',
  Notsent = 'NOTSENT',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type FollowUserStatusResponse = {
  __typename?: 'FollowUserStatusResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  status?: Maybe<FollowStatus>;
};

export type InputUpdateInput = {
  decrement?: InputMaybe<Scalars['Float']>;
  divide?: InputMaybe<Scalars['Float']>;
  increment?: InputMaybe<Scalars['Float']>;
  multiply?: InputMaybe<Scalars['Float']>;
  set?: InputMaybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFollowRequest: AcceptFollowRequestResponse;
  copyPresetToUser: TestPresetResponse;
  createTestPreset: TestPresetResponse;
  createTestPresetHistoryEntry: TestPresetHistoryResponse;
  createTestPresetUser: TestPresetResponse;
  createUserSettings: UserSettingsResponse;
  denyFollowRequest: DenyFollowRequestResponse;
  logout: Scalars['Boolean'];
  requestFollowUser: RequestFollowUserResponse;
  unfollowUser: UnfollowUserResponse;
  updateUser: UserResponse;
  updateUserSettings: UserSettingsResponse;
  userCreateTestPresetHistoryEntry: TestPresetHistoryResponse;
};


export type MutationAcceptFollowRequestArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCopyPresetToUserArgs = {
  input: CopyPresetToUserInput;
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


export type MutationCreateUserSettingsArgs = {
  input: UserSettingsCreateInput;
};


export type MutationDenyFollowRequestArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRequestFollowUserArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereInput;
};


export type MutationUpdateUserSettingsArgs = {
  input: UserSettingsUpdateInput;
};


export type MutationUserCreateTestPresetHistoryEntryArgs = {
  input: CreateTestPresetHistoryInput;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  filterUsers: FilteredUsersResponse;
  followUserStatus: FollowUserStatusResponse;
  me: UserResponse;
  testPreset: TestPresetResponse;
  testPresets: TestPresetsResponse;
  user: UserResponse;
  userFollowers: UserFollowersResponse;
  userSettings: UserSettingsResponse;
  userTestPresets: TestPresetsResponse;
  users: UsersResponse;
};


export type QueryFilterUsersArgs = {
  input: FilterUsersInput;
};


export type QueryFollowUserStatusArgs = {
  followerId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryTestPresetArgs = {
  id: Scalars['String'];
};


export type QueryTestPresetsArgs = {
  input?: InputMaybe<TestPresetsFindInput>;
};


export type QueryUserArgs = {
  where: UserWhereInput;
};


export type QueryUserFollowersArgs = {
  input: UserFollowersFindInput;
};


export type QueryUserSettingsArgs = {
  input: UserSettingsWhereInput;
};


export type QueryUserTestPresetsArgs = {
  userId: Scalars['String'];
};


export type QueryUsersArgs = {
  take: Scalars['Int'];
};

export type RequestFollowUserResponse = {
  __typename?: 'RequestFollowUserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  requestSent?: Maybe<Scalars['Boolean']>;
};

/** Test Language */
export enum TestLanguage {
  English = 'ENGLISH',
  Spanish = 'SPANISH'
}

export type TestPreset = {
  __typename?: 'TestPreset';
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['Date']>;
  creator: User;
  creatorImage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<TestLanguage>;
  punctuated?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['Int']>;
  type?: Maybe<TestType>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
  words?: Maybe<Scalars['Int']>;
};

export type TestPresetHistory = {
  __typename?: 'TestPresetHistory';
  accuracy: Scalars['Float'];
  correctChars: Scalars['Float'];
  cpm: Scalars['Float'];
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  incorrectChars: Scalars['Float'];
  keystrokes: Scalars['Float'];
  testPresetId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
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
  id?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<TestLanguage>;
  punctuated?: InputMaybe<Scalars['Boolean']>;
  time?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<TestType>;
  words?: InputMaybe<Scalars['Int']>;
};

export type TestPresetsEdge = {
  __typename?: 'TestPresetsEdge';
  cursor?: Maybe<Scalars['Date']>;
  node?: Maybe<TestPreset>;
};

export type TestPresetsFindInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: InputMaybe<TestPresetWhereInput>;
};

export type TestPresetsPageInfo = {
  __typename?: 'TestPresetsPageInfo';
  endCursor?: Maybe<Scalars['Date']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['Date']>;
};

export type TestPresetsResponse = {
  __typename?: 'TestPresetsResponse';
  count?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<TestPresetsEdge>>;
  errors?: Maybe<Array<ErrorResponse>>;
  pageInfo?: Maybe<TestPresetsPageInfo>;
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
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  followedBy?: Maybe<Array<UserOnUser>>;
  following?: Maybe<Array<UserOnUser>>;
  id: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  testPresetHistory?: Maybe<Array<TestPresetHistory>>;
  testPresets?: Maybe<Array<TestPreset>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
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
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  oauthId?: Maybe<Scalars['String']>;
  status?: Maybe<FollowStatus>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type UserFollowerEdge = {
  __typename?: 'UserFollowerEdge';
  cursor?: Maybe<Scalars['Date']>;
  node?: Maybe<UserFollower>;
};

export type UserFollowersFindInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  where?: InputMaybe<UserWhereInput>;
};

export type UserFollowersPageInfo = {
  __typename?: 'UserFollowersPageInfo';
  endCursor?: Maybe<Scalars['Date']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['Date']>;
};

export type UserFollowersResponse = {
  __typename?: 'UserFollowersResponse';
  acceptedRequests?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<UserFollowerEdge>>;
  errors?: Maybe<Array<ErrorResponse>>;
  pageInfo?: Maybe<UserFollowersPageInfo>;
  pendingRequests?: Maybe<Scalars['Int']>;
};

export type UserOnUser = {
  __typename?: 'UserOnUser';
  child?: Maybe<User>;
  childId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  parent?: Maybe<User>;
  parentId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  user?: Maybe<User>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  blindMode?: Maybe<Scalars['Boolean']>;
  /** Identifies the date and time when the object was created. */
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  noBackspace?: Maybe<Scalars['Boolean']>;
  pauseOnError?: Maybe<Scalars['Boolean']>;
  typeSounds?: Maybe<Scalars['Boolean']>;
  typeSoundsVolume?: Maybe<Scalars['Float']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserSettingsCreateInput = {
  blindMode?: InputMaybe<Scalars['Boolean']>;
  noBackspace?: InputMaybe<Scalars['Boolean']>;
  pauseOnError?: InputMaybe<Scalars['Boolean']>;
  typeSounds?: InputMaybe<Scalars['Boolean']>;
  typeSoundsVolume?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UserSettingsResponse = {
  __typename?: 'UserSettingsResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  userSettings?: Maybe<UserSettings>;
};

export type UserSettingsUpdateInput = {
  blindMode?: InputMaybe<Scalars['Boolean']>;
  noBackspace?: InputMaybe<Scalars['Boolean']>;
  pauseOnError?: InputMaybe<Scalars['Boolean']>;
  typeSounds?: InputMaybe<Scalars['Boolean']>;
  typeSoundsVolume?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UserSettingsWhereInput = {
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UserUpdateInput = {
  accuracy?: InputMaybe<AccuracyCreateInput>;
  badge?: InputMaybe<UserBadge>;
  charsPerMinute?: InputMaybe<CharsPerMinuteCreateInput>;
  country?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  keystrokes?: InputMaybe<InputUpdateInput>;
  name?: InputMaybe<Scalars['String']>;
  testsCompleted?: InputMaybe<InputUpdateInput>;
  wordsPerMinute?: InputMaybe<WordsPerMinuteCreateInput>;
  wordsWritten?: InputMaybe<InputUpdateInput>;
};

export type UserWhereInput = {
  id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<ErrorResponse>>;
  users?: Maybe<Array<User>>;
};

export type WordsPerMinuteCreateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type FilteredUserFragment = { __typename?: 'FilteredUser', id: string, username?: string | null, avatar?: string | null, country?: string | null, authProvider?: AuthProvider | null, oauthId?: string | null, value: number, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null };

export type TestPresetFragment = { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null };

export type TestPresetHistoryFragment = { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null };

export type UserFragment = { __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null };

export type UserFollowerFragment = { __typename?: 'UserFollower', id: string, username: string, authProvider?: AuthProvider | null, oauthId?: string | null, avatar: string, status?: FollowStatus | null, createdAt?: any | null, updatedAt?: any | null };

export type UserSettingsFragment = { __typename?: 'UserSettings', id: string, userId?: string | null, blindMode?: boolean | null, noBackspace?: boolean | null, pauseOnError?: boolean | null, typeSounds?: boolean | null, typeSoundsVolume?: number | null, createdAt?: any | null, updatedAt?: any | null };

export type AcceptFollowRequestResponseFragment = { __typename?: 'AcceptFollowRequestResponse', accepted?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type DenyFollowRequestResponseFragment = { __typename?: 'DenyFollowRequestResponse', denied?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type ErrorResponseFragment = { __typename?: 'ErrorResponse', field: string, message: string };

export type FilteredUsersResponseFragment = { __typename?: 'FilteredUsersResponse', count?: number | null, pageInfo?: { __typename?: 'FilteredUsersPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'FilteredUsersEdge', cursor?: any | null, node?: { __typename?: 'FilteredUser', id: string, username?: string | null, avatar?: string | null, country?: string | null, authProvider?: AuthProvider | null, oauthId?: string | null, value: number, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null } | null }> | null };

export type RequestFollowUserResponseFragment = { __typename?: 'RequestFollowUserResponse', requestSent?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type FollowUserStatusResponseFragment = { __typename?: 'FollowUserStatusResponse', status?: FollowStatus | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type TestPresetHistoryResponseFragment = { __typename?: 'TestPresetHistoryResponse', testPresetHistory?: { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type TestPresetResponseFragment = { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type TestPresetsResponseFragment = { __typename?: 'TestPresetsResponse', count?: number | null, pageInfo?: { __typename?: 'TestPresetsPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'TestPresetsEdge', cursor?: any | null, node?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type UnfollowUserResponseFragment = { __typename?: 'UnfollowUserResponse', unfollow?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type UserFollowersResponseFragment = { __typename?: 'UserFollowersResponse', count?: number | null, acceptedRequests?: number | null, pendingRequests?: number | null, pageInfo?: { __typename?: 'UserFollowersPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'UserFollowerEdge', cursor?: any | null, node?: { __typename?: 'UserFollower', id: string, username: string, authProvider?: AuthProvider | null, oauthId?: string | null, avatar: string, status?: FollowStatus | null, createdAt?: any | null, updatedAt?: any | null } | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type UserResponseFragment = { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type UserSettingsResponseFragment = { __typename?: 'UserSettingsResponse', userSettings?: { __typename?: 'UserSettings', id: string, userId?: string | null, blindMode?: boolean | null, noBackspace?: boolean | null, pauseOnError?: boolean | null, typeSounds?: boolean | null, typeSoundsVolume?: number | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type UsersResponseFragment = { __typename?: 'UsersResponse', users?: Array<{ __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null };

export type CreateTestPresetHistoryEntryMutationVariables = Exact<{
  input: CreateTestPresetHistoryInput;
}>;


export type CreateTestPresetHistoryEntryMutation = { __typename?: 'Mutation', createTestPresetHistoryEntry: { __typename?: 'TestPresetHistoryResponse', testPresetHistory?: { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UserCreateTestPresetHistoryEntryMutationVariables = Exact<{
  userId: Scalars['String'];
  input: CreateTestPresetHistoryInput;
}>;


export type UserCreateTestPresetHistoryEntryMutation = { __typename?: 'Mutation', userCreateTestPresetHistoryEntry: { __typename?: 'TestPresetHistoryResponse', testPresetHistory?: { __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type CopyPresetToUserMutationVariables = Exact<{
  input: CopyPresetToUserInput;
}>;


export type CopyPresetToUserMutation = { __typename?: 'Mutation', copyPresetToUser: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type CreateTestPresetMutationVariables = Exact<{
  data: CreateTestPresetInput;
}>;


export type CreateTestPresetMutation = { __typename?: 'Mutation', createTestPreset: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type CreateTestPresetUserMutationVariables = Exact<{
  data: CreateTestPresetInput;
}>;


export type CreateTestPresetUserMutation = { __typename?: 'Mutation', createTestPresetUser: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type CreateUserSettingsMutationVariables = Exact<{
  input: UserSettingsCreateInput;
}>;


export type CreateUserSettingsMutation = { __typename?: 'Mutation', createUserSettings: { __typename?: 'UserSettingsResponse', userSettings?: { __typename?: 'UserSettings', id: string, userId?: string | null, blindMode?: boolean | null, noBackspace?: boolean | null, pauseOnError?: boolean | null, typeSounds?: boolean | null, typeSoundsVolume?: number | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UpdateUserSettingsMutationVariables = Exact<{
  input: UserSettingsUpdateInput;
}>;


export type UpdateUserSettingsMutation = { __typename?: 'Mutation', updateUserSettings: { __typename?: 'UserSettingsResponse', userSettings?: { __typename?: 'UserSettings', id: string, userId?: string | null, blindMode?: boolean | null, noBackspace?: boolean | null, pauseOnError?: boolean | null, typeSounds?: boolean | null, typeSoundsVolume?: number | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type AcceptFollowRequestMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type AcceptFollowRequestMutation = { __typename?: 'Mutation', acceptFollowRequest: { __typename?: 'AcceptFollowRequestResponse', accepted?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type DenyFollowRequestMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type DenyFollowRequestMutation = { __typename?: 'Mutation', denyFollowRequest: { __typename?: 'DenyFollowRequestResponse', denied?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RequestFollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type RequestFollowUserMutation = { __typename?: 'Mutation', requestFollowUser: { __typename?: 'RequestFollowUserResponse', requestSent?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'UnfollowUserResponse', unfollow?: boolean | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UpdateUserMutationVariables = Exact<{
  where: UserWhereInput;
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type TestPresetQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TestPresetQuery = { __typename?: 'Query', testPreset: { __typename?: 'TestPresetResponse', testPreset?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type TestPresetsQueryVariables = Exact<{
  input: TestPresetsFindInput;
}>;


export type TestPresetsQuery = { __typename?: 'Query', testPresets: { __typename?: 'TestPresetsResponse', count?: number | null, pageInfo?: { __typename?: 'TestPresetsPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'TestPresetsEdge', cursor?: any | null, node?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UserTestPresetsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserTestPresetsQuery = { __typename?: 'Query', userTestPresets: { __typename?: 'TestPresetsResponse', count?: number | null, pageInfo?: { __typename?: 'TestPresetsPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'TestPresetsEdge', cursor?: any | null, node?: { __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null } | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UserSettingsQueryVariables = Exact<{
  input: UserSettingsWhereInput;
}>;


export type UserSettingsQuery = { __typename?: 'Query', userSettings: { __typename?: 'UserSettingsResponse', userSettings?: { __typename?: 'UserSettings', id: string, userId?: string | null, blindMode?: boolean | null, noBackspace?: boolean | null, pauseOnError?: boolean | null, typeSounds?: boolean | null, typeSoundsVolume?: number | null, createdAt?: any | null, updatedAt?: any | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type FilterUsersQueryVariables = Exact<{
  input: FilterUsersInput;
}>;


export type FilterUsersQuery = { __typename?: 'Query', filterUsers: { __typename?: 'FilteredUsersResponse', count?: number | null, pageInfo?: { __typename?: 'FilteredUsersPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'FilteredUsersEdge', cursor?: any | null, node?: { __typename?: 'FilteredUser', id: string, username?: string | null, avatar?: string | null, country?: string | null, authProvider?: AuthProvider | null, oauthId?: string | null, value: number, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null } | null }> | null } };

export type FollowUserStatusQueryVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type FollowUserStatusQuery = { __typename?: 'Query', followUserStatus: { __typename?: 'FollowUserStatusResponse', status?: FollowStatus | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UserQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null } | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UserFollowersQueryVariables = Exact<{
  input: UserFollowersFindInput;
}>;


export type UserFollowersQuery = { __typename?: 'Query', userFollowers: { __typename?: 'UserFollowersResponse', count?: number | null, acceptedRequests?: number | null, pendingRequests?: number | null, pageInfo?: { __typename?: 'UserFollowersPageInfo', startCursor?: any | null, endCursor?: any | null, hasMore?: boolean | null } | null, edges?: Array<{ __typename?: 'UserFollowerEdge', cursor?: any | null, node?: { __typename?: 'UserFollower', id: string, username: string, authProvider?: AuthProvider | null, oauthId?: string | null, avatar: string, status?: FollowStatus | null, createdAt?: any | null, updatedAt?: any | null } | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export type UsersQueryVariables = Exact<{
  take: Scalars['Int'];
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResponse', users?: Array<{ __typename?: 'User', id: string, oauthId?: string | null, username?: string | null, description?: string | null, avatar?: string | null, country?: string | null, badge?: UserBadge | null, authProvider?: AuthProvider | null, testPresetHistory?: Array<{ __typename?: 'TestPresetHistory', id: string, userId: string, testPresetId: string, wpm: number, cpm: number, accuracy: number, keystrokes: number, correctChars: number, incorrectChars: number, createdAt?: any | null, updatedAt?: any | null }> | null, testPresets?: Array<{ __typename?: 'TestPreset', id: string, userId?: string | null, type?: TestType | null, time?: number | null, language?: TestLanguage | null, words?: number | null, punctuated?: boolean | null, creatorImage?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null }> | null, errors?: Array<{ __typename?: 'ErrorResponse', field: string, message: string }> | null } };

export const ErrorResponseFragmentDoc = gql`
    fragment ErrorResponse on ErrorResponse {
  field
  message
}
    `;
export const AcceptFollowRequestResponseFragmentDoc = gql`
    fragment AcceptFollowRequestResponse on AcceptFollowRequestResponse {
  accepted
  errors {
    ...ErrorResponse
  }
}
    ${ErrorResponseFragmentDoc}`;
export const DenyFollowRequestResponseFragmentDoc = gql`
    fragment DenyFollowRequestResponse on DenyFollowRequestResponse {
  denied
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
export const FilteredUserFragmentDoc = gql`
    fragment FilteredUser on FilteredUser {
  id
  username
  avatar
  country
  authProvider
  oauthId
  testPresetHistory {
    ...TestPresetHistory
  }
  value
}
    ${TestPresetHistoryFragmentDoc}`;
export const FilteredUsersResponseFragmentDoc = gql`
    fragment FilteredUsersResponse on FilteredUsersResponse {
  count
  pageInfo {
    startCursor
    endCursor
    hasMore
  }
  edges {
    cursor
    node {
      ...FilteredUser
    }
  }
}
    ${FilteredUserFragmentDoc}`;
export const RequestFollowUserResponseFragmentDoc = gql`
    fragment RequestFollowUserResponse on RequestFollowUserResponse {
  requestSent
  errors {
    ...ErrorResponse
  }
}
    ${ErrorResponseFragmentDoc}`;
export const FollowUserStatusResponseFragmentDoc = gql`
    fragment FollowUserStatusResponse on FollowUserStatusResponse {
  status
  errors {
    ...ErrorResponse
  }
}
    ${ErrorResponseFragmentDoc}`;
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
  punctuated
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
  count
  pageInfo {
    startCursor
    endCursor
    hasMore
  }
  edges {
    cursor
    node {
      ...TestPreset
    }
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
  status
  createdAt
  updatedAt
}
    `;
export const UserFollowersResponseFragmentDoc = gql`
    fragment UserFollowersResponse on UserFollowersResponse {
  count
  acceptedRequests
  pendingRequests
  pageInfo {
    startCursor
    endCursor
    hasMore
  }
  edges {
    cursor
    node {
      ...UserFollower
    }
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
export const UserSettingsFragmentDoc = gql`
    fragment UserSettings on UserSettings {
  id
  userId
  blindMode
  noBackspace
  pauseOnError
  typeSounds
  typeSoundsVolume
  createdAt
  updatedAt
}
    `;
export const UserSettingsResponseFragmentDoc = gql`
    fragment UserSettingsResponse on UserSettingsResponse {
  userSettings {
    ...UserSettings
  }
  errors {
    ...ErrorResponse
  }
}
    ${UserSettingsFragmentDoc}
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
export const CopyPresetToUserDocument = gql`
    mutation copyPresetToUser($input: CopyPresetToUserInput!) {
  copyPresetToUser(input: $input) {
    ...TestPresetResponse
  }
}
    ${TestPresetResponseFragmentDoc}`;
export type CopyPresetToUserMutationFn = Apollo.MutationFunction<CopyPresetToUserMutation, CopyPresetToUserMutationVariables>;

/**
 * __useCopyPresetToUserMutation__
 *
 * To run a mutation, you first call `useCopyPresetToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyPresetToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyPresetToUserMutation, { data, loading, error }] = useCopyPresetToUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCopyPresetToUserMutation(baseOptions?: Apollo.MutationHookOptions<CopyPresetToUserMutation, CopyPresetToUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyPresetToUserMutation, CopyPresetToUserMutationVariables>(CopyPresetToUserDocument, options);
      }
export type CopyPresetToUserMutationHookResult = ReturnType<typeof useCopyPresetToUserMutation>;
export type CopyPresetToUserMutationResult = Apollo.MutationResult<CopyPresetToUserMutation>;
export type CopyPresetToUserMutationOptions = Apollo.BaseMutationOptions<CopyPresetToUserMutation, CopyPresetToUserMutationVariables>;
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
export const CreateUserSettingsDocument = gql`
    mutation createUserSettings($input: UserSettingsCreateInput!) {
  createUserSettings(input: $input) {
    ...UserSettingsResponse
  }
}
    ${UserSettingsResponseFragmentDoc}`;
export type CreateUserSettingsMutationFn = Apollo.MutationFunction<CreateUserSettingsMutation, CreateUserSettingsMutationVariables>;

/**
 * __useCreateUserSettingsMutation__
 *
 * To run a mutation, you first call `useCreateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserSettingsMutation, { data, loading, error }] = useCreateUserSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserSettingsMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserSettingsMutation, CreateUserSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserSettingsMutation, CreateUserSettingsMutationVariables>(CreateUserSettingsDocument, options);
      }
export type CreateUserSettingsMutationHookResult = ReturnType<typeof useCreateUserSettingsMutation>;
export type CreateUserSettingsMutationResult = Apollo.MutationResult<CreateUserSettingsMutation>;
export type CreateUserSettingsMutationOptions = Apollo.BaseMutationOptions<CreateUserSettingsMutation, CreateUserSettingsMutationVariables>;
export const UpdateUserSettingsDocument = gql`
    mutation updateUserSettings($input: UserSettingsUpdateInput!) {
  updateUserSettings(input: $input) {
    ...UserSettingsResponse
  }
}
    ${UserSettingsResponseFragmentDoc}`;
export type UpdateUserSettingsMutationFn = Apollo.MutationFunction<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;

/**
 * __useUpdateUserSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsMutation, { data, loading, error }] = useUpdateUserSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(UpdateUserSettingsDocument, options);
      }
export type UpdateUserSettingsMutationHookResult = ReturnType<typeof useUpdateUserSettingsMutation>;
export type UpdateUserSettingsMutationResult = Apollo.MutationResult<UpdateUserSettingsMutation>;
export type UpdateUserSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>;
export const AcceptFollowRequestDocument = gql`
    mutation acceptFollowRequest($userId: String!, $followerId: String!) {
  acceptFollowRequest(userId: $userId, followerId: $followerId) {
    ...AcceptFollowRequestResponse
  }
}
    ${AcceptFollowRequestResponseFragmentDoc}`;
export type AcceptFollowRequestMutationFn = Apollo.MutationFunction<AcceptFollowRequestMutation, AcceptFollowRequestMutationVariables>;

/**
 * __useAcceptFollowRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFollowRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFollowRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFollowRequestMutation, { data, loading, error }] = useAcceptFollowRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useAcceptFollowRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFollowRequestMutation, AcceptFollowRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFollowRequestMutation, AcceptFollowRequestMutationVariables>(AcceptFollowRequestDocument, options);
      }
export type AcceptFollowRequestMutationHookResult = ReturnType<typeof useAcceptFollowRequestMutation>;
export type AcceptFollowRequestMutationResult = Apollo.MutationResult<AcceptFollowRequestMutation>;
export type AcceptFollowRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFollowRequestMutation, AcceptFollowRequestMutationVariables>;
export const DenyFollowRequestDocument = gql`
    mutation denyFollowRequest($userId: String!, $followerId: String!) {
  denyFollowRequest(userId: $userId, followerId: $followerId) {
    ...DenyFollowRequestResponse
  }
}
    ${DenyFollowRequestResponseFragmentDoc}`;
export type DenyFollowRequestMutationFn = Apollo.MutationFunction<DenyFollowRequestMutation, DenyFollowRequestMutationVariables>;

/**
 * __useDenyFollowRequestMutation__
 *
 * To run a mutation, you first call `useDenyFollowRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyFollowRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyFollowRequestMutation, { data, loading, error }] = useDenyFollowRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useDenyFollowRequestMutation(baseOptions?: Apollo.MutationHookOptions<DenyFollowRequestMutation, DenyFollowRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DenyFollowRequestMutation, DenyFollowRequestMutationVariables>(DenyFollowRequestDocument, options);
      }
export type DenyFollowRequestMutationHookResult = ReturnType<typeof useDenyFollowRequestMutation>;
export type DenyFollowRequestMutationResult = Apollo.MutationResult<DenyFollowRequestMutation>;
export type DenyFollowRequestMutationOptions = Apollo.BaseMutationOptions<DenyFollowRequestMutation, DenyFollowRequestMutationVariables>;
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
export const RequestFollowUserDocument = gql`
    mutation requestFollowUser($userId: String!, $followerId: String!) {
  requestFollowUser(userId: $userId, followerId: $followerId) {
    ...RequestFollowUserResponse
  }
}
    ${RequestFollowUserResponseFragmentDoc}`;
export type RequestFollowUserMutationFn = Apollo.MutationFunction<RequestFollowUserMutation, RequestFollowUserMutationVariables>;

/**
 * __useRequestFollowUserMutation__
 *
 * To run a mutation, you first call `useRequestFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestFollowUserMutation, { data, loading, error }] = useRequestFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useRequestFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<RequestFollowUserMutation, RequestFollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestFollowUserMutation, RequestFollowUserMutationVariables>(RequestFollowUserDocument, options);
      }
export type RequestFollowUserMutationHookResult = ReturnType<typeof useRequestFollowUserMutation>;
export type RequestFollowUserMutationResult = Apollo.MutationResult<RequestFollowUserMutation>;
export type RequestFollowUserMutationOptions = Apollo.BaseMutationOptions<RequestFollowUserMutation, RequestFollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($userId: String!, $followerId: String!) {
  unfollowUser(userId: $userId, followerId: $followerId) {
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
 *      followerId: // value for 'followerId'
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
export const UserSettingsDocument = gql`
    query userSettings($input: UserSettingsWhereInput!) {
  userSettings(input: $input) {
    ...UserSettingsResponse
  }
}
    ${UserSettingsResponseFragmentDoc}`;

/**
 * __useUserSettingsQuery__
 *
 * To run a query within a React component, call `useUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserSettingsQuery(baseOptions: Apollo.QueryHookOptions<UserSettingsQuery, UserSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSettingsQuery, UserSettingsQueryVariables>(UserSettingsDocument, options);
      }
export function useUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSettingsQuery, UserSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSettingsQuery, UserSettingsQueryVariables>(UserSettingsDocument, options);
        }
export type UserSettingsQueryHookResult = ReturnType<typeof useUserSettingsQuery>;
export type UserSettingsLazyQueryHookResult = ReturnType<typeof useUserSettingsLazyQuery>;
export type UserSettingsQueryResult = Apollo.QueryResult<UserSettingsQuery, UserSettingsQueryVariables>;
export const FilterUsersDocument = gql`
    query filterUsers($input: FilterUsersInput!) {
  filterUsers(input: $input) {
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
 *      input: // value for 'input'
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
export const FollowUserStatusDocument = gql`
    query followUserStatus($userId: String!, $followerId: String!) {
  followUserStatus(userId: $userId, followerId: $followerId) {
    ...FollowUserStatusResponse
  }
}
    ${FollowUserStatusResponseFragmentDoc}`;

/**
 * __useFollowUserStatusQuery__
 *
 * To run a query within a React component, call `useFollowUserStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowUserStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowUserStatusQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useFollowUserStatusQuery(baseOptions: Apollo.QueryHookOptions<FollowUserStatusQuery, FollowUserStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowUserStatusQuery, FollowUserStatusQueryVariables>(FollowUserStatusDocument, options);
      }
export function useFollowUserStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowUserStatusQuery, FollowUserStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowUserStatusQuery, FollowUserStatusQueryVariables>(FollowUserStatusDocument, options);
        }
export type FollowUserStatusQueryHookResult = ReturnType<typeof useFollowUserStatusQuery>;
export type FollowUserStatusLazyQueryHookResult = ReturnType<typeof useFollowUserStatusLazyQuery>;
export type FollowUserStatusQueryResult = Apollo.QueryResult<FollowUserStatusQuery, FollowUserStatusQueryVariables>;
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
    query userFollowers($input: UserFollowersFindInput!) {
  userFollowers(input: $input) {
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
 *      input: // value for 'input'
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