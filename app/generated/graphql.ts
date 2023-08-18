import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DATETIME: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthSuccess = {
  __typename?: 'AuthSuccess';
  accessToken: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type CreateEventInput = {
  description: Scalars['String']['input'];
  eventDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateInvitationInput = {
  email: Scalars['String']['input'];
  eventId: Scalars['String']['input'];
};

export type EventData = {
  __typename?: 'EventData';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  eventDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type InvitationData = {
  __typename?: 'InvitationData';
  createdAt: Scalars['Date']['output'];
  eventId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  invitedBy: Scalars['String']['output'];
  invitedTo: Scalars['String']['output'];
  status: InvitationStatus;
};

export enum InvitationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<EventData>;
  createInvitation: InvitationData;
  userSignIn?: Maybe<AuthSuccess>;
  userSignUp?: Maybe<AuthSuccess>;
};


export type MutationCreateEventArgs = {
  data: CreateEventInput;
};


export type MutationCreateInvitationArgs = {
  data: CreateInvitationInput;
};


export type MutationUserSignInArgs = {
  data: UserSignInInput;
};


export type MutationUserSignUpArgs = {
  data: UserSignUpInput;
};

export type NotFound = {
  __typename?: 'NotFound';
  message?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getEvents: Array<Maybe<EventData>>;
  getUserDetail?: Maybe<UserData>;
};


export type QueryGetUserDetailArgs = {
  id: Scalars['String']['input'];
};

export type UserData = {
  __typename?: 'UserData';
  createdAt: Scalars['DATETIME']['output'];
  deletedAt?: Maybe<Scalars['DATETIME']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DATETIME']['output']>;
};

export type UserSignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSignUpInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthSuccess: ResolverTypeWrapper<AuthSuccess>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CommonResponse: ResolverTypeWrapper<CommonResponse>;
  CreateEventInput: CreateEventInput;
  CreateInvitationInput: CreateInvitationInput;
  DATETIME: ResolverTypeWrapper<Scalars['DATETIME']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EventData: ResolverTypeWrapper<EventData>;
  InvitationData: ResolverTypeWrapper<InvitationData>;
  InvitationStatus: InvitationStatus;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NotFound: ResolverTypeWrapper<NotFound>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserData: ResolverTypeWrapper<UserData>;
  UserSignInInput: UserSignInInput;
  UserSignUpInput: UserSignUpInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthSuccess: AuthSuccess;
  Boolean: Scalars['Boolean']['output'];
  CommonResponse: CommonResponse;
  CreateEventInput: CreateEventInput;
  CreateInvitationInput: CreateInvitationInput;
  DATETIME: Scalars['DATETIME']['output'];
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EventData: EventData;
  InvitationData: InvitationData;
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  NotFound: NotFound;
  Query: {};
  String: Scalars['String']['output'];
  UserData: UserData;
  UserSignInInput: UserSignInInput;
  UserSignUpInput: UserSignUpInput;
};

export type IsAuthenticatedDirectiveArgs = { };

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = IsAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthSuccess'] = ResolversParentTypes['AuthSuccess']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommonResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommonResponse'] = ResolversParentTypes['CommonResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DatetimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DATETIME'], any> {
  name: 'DATETIME';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventData'] = ResolversParentTypes['EventData']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationData'] = ResolversParentTypes['InvitationData']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  eventId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitedTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['InvitationStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEvent?: Resolver<Maybe<ResolversTypes['EventData']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'data'>>;
  createInvitation?: Resolver<ResolversTypes['InvitationData'], ParentType, ContextType, RequireFields<MutationCreateInvitationArgs, 'data'>>;
  userSignIn?: Resolver<Maybe<ResolversTypes['AuthSuccess']>, ParentType, ContextType, RequireFields<MutationUserSignInArgs, 'data'>>;
  userSignUp?: Resolver<Maybe<ResolversTypes['AuthSuccess']>, ParentType, ContextType, RequireFields<MutationUserSignUpArgs, 'data'>>;
};

export type NotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotFound'] = ResolversParentTypes['NotFound']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getEvents?: Resolver<Array<Maybe<ResolversTypes['EventData']>>, ParentType, ContextType>;
  getUserDetail?: Resolver<Maybe<ResolversTypes['UserData']>, ParentType, ContextType, RequireFields<QueryGetUserDetailArgs, 'id'>>;
};

export type UserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserData'] = ResolversParentTypes['UserData']> = {
  createdAt?: Resolver<ResolversTypes['DATETIME'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DATETIME']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DATETIME']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthSuccess?: AuthSuccessResolvers<ContextType>;
  CommonResponse?: CommonResponseResolvers<ContextType>;
  DATETIME?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EventData?: EventDataResolvers<ContextType>;
  InvitationData?: InvitationDataResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NotFound?: NotFoundResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserData?: UserDataResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>;
};
