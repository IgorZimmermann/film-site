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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Cast = {
  __typename?: 'Cast';
  id: Scalars['ID'];
  media?: Maybe<Media>;
  mediaId: Scalars['ID'];
  person?: Maybe<Person>;
  personId: Scalars['ID'];
  role: Scalars['String'];
};

export type CastInput = {
  mediaId: Scalars['ID'];
  personId: Scalars['ID'];
  role: Scalars['String'];
};

export type Collection = {
  __typename?: 'Collection';
  available_from: Scalars['String'];
  id: Scalars['ID'];
  medias: Array<MediaCollection>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type CollectionInput = {
  available_from: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GetPersonByUrlInput = {
  url: Scalars['String'];
};

export type GetStudioByUrlInput = {
  url: Scalars['String'];
};

export type Homepage = {
  __typename?: 'Homepage';
  data: Scalars['ID'];
  type: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  available_from: Scalars['String'];
  casts: Array<Cast>;
  country_of_origin: Scalars['String'];
  id: Scalars['ID'];
  isAvailable: Scalars['Boolean'];
  keywords: Array<Scalars['String']>;
  original_language: Scalars['String'];
  overview: Scalars['String'];
  release_date: Scalars['String'];
  studios: Array<MediaStudio>;
  tagline: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type MediaCollection = {
  __typename?: 'MediaCollection';
  collection?: Maybe<Collection>;
  collectionId: Scalars['ID'];
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<Media>;
  mediaId: Scalars['ID'];
};

export type MediaCollectionInput = {
  collectionId: Scalars['ID'];
  comment?: InputMaybe<Scalars['String']>;
  mediaId: Scalars['ID'];
};

export type MediaInput = {
  available_from: Scalars['DateTime'];
  country_of_origin: Scalars['String'];
  keywords: Array<Scalars['String']>;
  original_language: Scalars['String'];
  overview: Scalars['String'];
  release_date: Scalars['DateTime'];
  tagline: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type MediaStudio = {
  __typename?: 'MediaStudio';
  id: Scalars['ID'];
  media?: Maybe<Media>;
  mediaId: Scalars['ID'];
  studio?: Maybe<Studio>;
  studioId: Scalars['ID'];
};

export type MediaStudioInput = {
  mediaId: Scalars['ID'];
  studioId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPermission: Scalars['Boolean'];
  createCast?: Maybe<Cast>;
  createCollection?: Maybe<Collection>;
  createMedia: Media;
  createMediaCollection?: Maybe<MediaCollection>;
  createMediaStudio?: Maybe<MediaStudio>;
  createPerson: Person;
  createStudio: Studio;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register?: Maybe<User>;
  removePermission: Scalars['Boolean'];
};


export type MutationAddPermissionArgs = {
  options: PermissionInput;
};


export type MutationCreateCastArgs = {
  options: CastInput;
};


export type MutationCreateCollectionArgs = {
  options: CollectionInput;
};


export type MutationCreateMediaArgs = {
  options: MediaInput;
};


export type MutationCreateMediaCollectionArgs = {
  options: MediaCollectionInput;
};


export type MutationCreateMediaStudioArgs = {
  options: MediaStudioInput;
};


export type MutationCreatePersonArgs = {
  options: PersonInput;
};


export type MutationCreateStudioArgs = {
  options: StudioInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationRemovePermissionArgs = {
  options: PermissionInput;
};

export type PermissionInput = {
  id: Scalars['ID'];
  permission: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  born: Scalars['String'];
  casts: Array<Cast>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type PersonInput = {
  born: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllCast: Array<Cast>;
  getAllCollection: Array<Collection>;
  getAllMedia: Array<Media>;
  getAllMediaCollection: Array<MediaCollection>;
  getAllMediaStudio: Array<MediaStudio>;
  getAllPerson: Array<Person>;
  getAllStudio: Array<Studio>;
  getMediaByUrl?: Maybe<Media>;
  getPersonByUrl?: Maybe<Person>;
  getStudioByUrl?: Maybe<Studio>;
  getUserByEmail?: Maybe<User>;
  hello: Scalars['String'];
  homepage: Array<Homepage>;
  me?: Maybe<User>;
};


export type QueryGetMediaByUrlArgs = {
  options: GetMediaByUrlInput;
};


export type QueryGetPersonByUrlArgs = {
  options: GetPersonByUrlInput;
};


export type QueryGetStudioByUrlArgs = {
  options: GetStudioByUrlInput;
};


export type QueryGetUserByEmailArgs = {
  options: GetUserByEmailInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
};

export type Studio = {
  __typename?: 'Studio';
  country_of_origin: Scalars['String'];
  description: Scalars['String'];
  founded: Scalars['String'];
  id: Scalars['ID'];
  medias: Array<MediaStudio>;
  name: Scalars['String'];
  short_name: Scalars['String'];
  url: Scalars['String'];
};

export type StudioInput = {
  country_of_origin: Scalars['String'];
  description: Scalars['String'];
  founded: Scalars['DateTime'];
  name: Scalars['String'];
  short_name: Scalars['String'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type GetMediaByUrlInput = {
  url: Scalars['String'];
};

export type GetUserByEmailInput = {
  email: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, first_name: string, last_name: string, email: string, roles: Array<string> } | null };


export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    id
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
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
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    first_name
    last_name
    email
    roles
  }
}
    `;

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