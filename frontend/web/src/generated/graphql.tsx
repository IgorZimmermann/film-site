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
  person?: Maybe<Person>;
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
  description: Scalars['String'];
  id: Scalars['ID'];
  medias: Array<MediaCollection>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type CollectionInput = {
  available_from: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GetPersonByUrlInput = {
  url: Scalars['String'];
};

export type GetSourceByIdInput = {
  id: Scalars['ID'];
};

export type GetSourceByMediaInput = {
  mediaId: Scalars['ID'];
  type: SourceType;
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
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<Media>;
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

export type MediaSource = {
  __typename?: 'MediaSource';
  id: Scalars['ID'];
  mediaId: Scalars['String'];
  src: Scalars['String'];
  subtitles: Array<SubtitleSource>;
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  type: SourceType;
};

export type MediaSourceInput = {
  mediaId: Scalars['String'];
  src: Scalars['String'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  type: SourceType;
};

export type MediaStudio = {
  __typename?: 'MediaStudio';
  id: Scalars['ID'];
  media?: Maybe<Media>;
  studio?: Maybe<Studio>;
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
  createMediaSource: MediaSource;
  createMediaStudio?: Maybe<MediaStudio>;
  createPerson: Person;
  createStudio: Studio;
  createSubtitleSource: SubtitleSource;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register?: Maybe<User>;
  removePermission: Scalars['Boolean'];
  toggleWatchlist: Scalars['Boolean'];
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


export type MutationCreateMediaSourceArgs = {
  options: MediaSourceInput;
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


export type MutationCreateSubtitleSourceArgs = {
  optioins: SubtitleSourceInput;
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


export type MutationToggleWatchlistArgs = {
  options: WatchlistInput;
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
  getCollectionById?: Maybe<Collection>;
  getMediaById?: Maybe<Media>;
  getMediaByUrl?: Maybe<Media>;
  getPersonByUrl?: Maybe<Person>;
  getSourceById?: Maybe<MediaSource>;
  getSourceByMedia?: Maybe<Array<MediaSource>>;
  getStudioByUrl?: Maybe<Studio>;
  getUserByEmail?: Maybe<User>;
  getWatchlist: Array<Watchlist>;
  hello: Scalars['String'];
  homepage: Array<Homepage>;
  isWatchlist: Scalars['Boolean'];
  me?: Maybe<User>;
};


export type QueryGetCollectionByIdArgs = {
  options: GetCollectionByIdInput;
};


export type QueryGetMediaByIdArgs = {
  options: GetMediaByIdInput;
};


export type QueryGetMediaByUrlArgs = {
  options: GetMediaByUrlInput;
};


export type QueryGetPersonByUrlArgs = {
  options: GetPersonByUrlInput;
};


export type QueryGetSourceByIdArgs = {
  options: GetSourceByIdInput;
};


export type QueryGetSourceByMediaArgs = {
  options: GetSourceByMediaInput;
};


export type QueryGetStudioByUrlArgs = {
  options: GetStudioByUrlInput;
};


export type QueryGetUserByEmailArgs = {
  options: GetUserByEmailInput;
};


export type QueryIsWatchlistArgs = {
  options: WatchlistInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
};

export enum SourceType {
  Clip = 'CLIP',
  Episode = 'EPISODE',
  Movie = 'MOVIE',
  Trailer = 'TRAILER'
}

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

export type SubtitleSource = {
  __typename?: 'SubtitleSource';
  id: Scalars['ID'];
  lang: Scalars['String'];
  language: Scalars['String'];
  src: Scalars['String'];
};

export type SubtitleSourceInput = {
  lang: Scalars['String'];
  language: Scalars['String'];
  mediaId: Scalars['String'];
  src: Scalars['String'];
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

export type Watchlist = {
  __typename?: 'Watchlist';
  id: Scalars['ID'];
  media: Media;
  mediaId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type WatchlistInput = {
  mediaId: Scalars['ID'];
};

export type GetCollectionByIdInput = {
  id: Scalars['String'];
};

export type GetMediaByIdInput = {
  id: Scalars['String'];
};

export type GetMediaByUrlInput = {
  url: Scalars['String'];
};

export type GetUserByEmailInput = {
  email: Scalars['String'];
};

export type MediaFragment = { __typename?: 'Media', id: string, title: string, url: string, tagline: string, overview: string, release_date: string, available_from: string, isAvailable: boolean, original_language: string, country_of_origin: string, keywords: Array<string> };

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

export type ToggleWatchlistMutationVariables = Exact<{
  options: WatchlistInput;
}>;


export type ToggleWatchlistMutation = { __typename?: 'Mutation', toggleWatchlist: boolean };

export type HomepageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomepageQuery = { __typename?: 'Query', homepage: Array<{ __typename?: 'Homepage', type: string, data: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, first_name: string, last_name: string, email: string, roles: Array<string> } | null };

export type GetCollectionByIdQueryVariables = Exact<{
  options: GetCollectionByIdInput;
}>;


export type GetCollectionByIdQuery = { __typename?: 'Query', getCollectionById?: { __typename?: 'Collection', id: string, type: string, title: string, available_from: string, description: string, medias: Array<{ __typename?: 'MediaCollection', media?: { __typename?: 'Media', id: string, title: string, url: string } | null }> } | null };

export type GetIsWatchlistQueryVariables = Exact<{
  options: WatchlistInput;
}>;


export type GetIsWatchlistQuery = { __typename?: 'Query', isWatchlist: boolean };

export type GetMediaByIdQueryVariables = Exact<{
  options: GetMediaByIdInput;
}>;


export type GetMediaByIdQuery = { __typename?: 'Query', getMediaById?: { __typename?: 'Media', id: string, title: string, url: string, tagline: string, available_from: string, isAvailable: boolean } | null };

export type GetMediaByUrlQueryVariables = Exact<{
  options: GetMediaByUrlInput;
}>;


export type GetMediaByUrlQuery = { __typename?: 'Query', getMediaByUrl?: { __typename?: 'Media', id: string, title: string, url: string, tagline: string, overview: string, release_date: string, available_from: string, isAvailable: boolean, original_language: string, country_of_origin: string, keywords: Array<string>, casts: Array<{ __typename?: 'Cast', role: string, person?: { __typename?: 'Person', id: string, name: string, url: string } | null }>, studios: Array<{ __typename?: 'MediaStudio', studio?: { __typename?: 'Studio', short_name: string, name: string, url: string } | null }> } | null };

export type GetSourceByIdQueryVariables = Exact<{
  options: GetSourceByIdInput;
}>;


export type GetSourceByIdQuery = { __typename?: 'Query', getSourceById?: { __typename?: 'MediaSource', id: string, title: string, mediaId: string, type: SourceType, src: string, thumbnail: string, subtitles: Array<{ __typename?: 'SubtitleSource', id: string, src: string, lang: string, language: string }> } | null };

export type GetSourceByMediaQueryVariables = Exact<{
  options: GetSourceByMediaInput;
}>;


export type GetSourceByMediaQuery = { __typename?: 'Query', getSourceByMedia?: Array<{ __typename?: 'MediaSource', id: string, title: string, mediaId: string, type: SourceType, src: string, thumbnail: string }> | null };

export type GetWatchlistQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWatchlistQuery = { __typename?: 'Query', getWatchlist: Array<{ __typename?: 'Watchlist', id: string, media: { __typename?: 'Media', id: string, url: string } }> };

export const MediaFragmentDoc = gql`
    fragment Media on Media {
  id
  title
  url
  tagline
  overview
  release_date
  available_from
  isAvailable
  original_language
  country_of_origin
  keywords
}
    `;
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
export const ToggleWatchlistDocument = gql`
    mutation ToggleWatchlist($options: WatchlistInput!) {
  toggleWatchlist(options: $options)
}
    `;
export type ToggleWatchlistMutationFn = Apollo.MutationFunction<ToggleWatchlistMutation, ToggleWatchlistMutationVariables>;

/**
 * __useToggleWatchlistMutation__
 *
 * To run a mutation, you first call `useToggleWatchlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleWatchlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleWatchlistMutation, { data, loading, error }] = useToggleWatchlistMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useToggleWatchlistMutation(baseOptions?: Apollo.MutationHookOptions<ToggleWatchlistMutation, ToggleWatchlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleWatchlistMutation, ToggleWatchlistMutationVariables>(ToggleWatchlistDocument, options);
      }
export type ToggleWatchlistMutationHookResult = ReturnType<typeof useToggleWatchlistMutation>;
export type ToggleWatchlistMutationResult = Apollo.MutationResult<ToggleWatchlistMutation>;
export type ToggleWatchlistMutationOptions = Apollo.BaseMutationOptions<ToggleWatchlistMutation, ToggleWatchlistMutationVariables>;
export const HomepageDocument = gql`
    query Homepage {
  homepage {
    type
    data
  }
}
    `;

/**
 * __useHomepageQuery__
 *
 * To run a query within a React component, call `useHomepageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomepageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomepageQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomepageQuery(baseOptions?: Apollo.QueryHookOptions<HomepageQuery, HomepageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomepageQuery, HomepageQueryVariables>(HomepageDocument, options);
      }
export function useHomepageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomepageQuery, HomepageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomepageQuery, HomepageQueryVariables>(HomepageDocument, options);
        }
export type HomepageQueryHookResult = ReturnType<typeof useHomepageQuery>;
export type HomepageLazyQueryHookResult = ReturnType<typeof useHomepageLazyQuery>;
export type HomepageQueryResult = Apollo.QueryResult<HomepageQuery, HomepageQueryVariables>;
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
export const GetCollectionByIdDocument = gql`
    query GetCollectionById($options: getCollectionByIdInput!) {
  getCollectionById(options: $options) {
    id
    type
    title
    available_from
    description
    medias {
      media {
        id
        title
        url
      }
    }
  }
}
    `;

/**
 * __useGetCollectionByIdQuery__
 *
 * To run a query within a React component, call `useGetCollectionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetCollectionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCollectionByIdQuery, GetCollectionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionByIdQuery, GetCollectionByIdQueryVariables>(GetCollectionByIdDocument, options);
      }
export function useGetCollectionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionByIdQuery, GetCollectionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionByIdQuery, GetCollectionByIdQueryVariables>(GetCollectionByIdDocument, options);
        }
export type GetCollectionByIdQueryHookResult = ReturnType<typeof useGetCollectionByIdQuery>;
export type GetCollectionByIdLazyQueryHookResult = ReturnType<typeof useGetCollectionByIdLazyQuery>;
export type GetCollectionByIdQueryResult = Apollo.QueryResult<GetCollectionByIdQuery, GetCollectionByIdQueryVariables>;
export const GetIsWatchlistDocument = gql`
    query GetIsWatchlist($options: WatchlistInput!) {
  isWatchlist(options: $options)
}
    `;

/**
 * __useGetIsWatchlistQuery__
 *
 * To run a query within a React component, call `useGetIsWatchlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIsWatchlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIsWatchlistQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetIsWatchlistQuery(baseOptions: Apollo.QueryHookOptions<GetIsWatchlistQuery, GetIsWatchlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIsWatchlistQuery, GetIsWatchlistQueryVariables>(GetIsWatchlistDocument, options);
      }
export function useGetIsWatchlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIsWatchlistQuery, GetIsWatchlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIsWatchlistQuery, GetIsWatchlistQueryVariables>(GetIsWatchlistDocument, options);
        }
export type GetIsWatchlistQueryHookResult = ReturnType<typeof useGetIsWatchlistQuery>;
export type GetIsWatchlistLazyQueryHookResult = ReturnType<typeof useGetIsWatchlistLazyQuery>;
export type GetIsWatchlistQueryResult = Apollo.QueryResult<GetIsWatchlistQuery, GetIsWatchlistQueryVariables>;
export const GetMediaByIdDocument = gql`
    query GetMediaById($options: getMediaByIdInput!) {
  getMediaById(options: $options) {
    id
    title
    url
    tagline
    available_from
    isAvailable
  }
}
    `;

/**
 * __useGetMediaByIdQuery__
 *
 * To run a query within a React component, call `useGetMediaByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMediaByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMediaByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetMediaByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMediaByIdQuery, GetMediaByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMediaByIdQuery, GetMediaByIdQueryVariables>(GetMediaByIdDocument, options);
      }
export function useGetMediaByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMediaByIdQuery, GetMediaByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMediaByIdQuery, GetMediaByIdQueryVariables>(GetMediaByIdDocument, options);
        }
export type GetMediaByIdQueryHookResult = ReturnType<typeof useGetMediaByIdQuery>;
export type GetMediaByIdLazyQueryHookResult = ReturnType<typeof useGetMediaByIdLazyQuery>;
export type GetMediaByIdQueryResult = Apollo.QueryResult<GetMediaByIdQuery, GetMediaByIdQueryVariables>;
export const GetMediaByUrlDocument = gql`
    query GetMediaByUrl($options: getMediaByUrlInput!) {
  getMediaByUrl(options: $options) {
    id
    title
    url
    tagline
    overview
    release_date
    available_from
    isAvailable
    original_language
    country_of_origin
    keywords
    casts {
      person {
        id
        name
        url
      }
      role
    }
    studios {
      studio {
        short_name
        name
        url
      }
    }
  }
}
    `;

/**
 * __useGetMediaByUrlQuery__
 *
 * To run a query within a React component, call `useGetMediaByUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMediaByUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMediaByUrlQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetMediaByUrlQuery(baseOptions: Apollo.QueryHookOptions<GetMediaByUrlQuery, GetMediaByUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMediaByUrlQuery, GetMediaByUrlQueryVariables>(GetMediaByUrlDocument, options);
      }
export function useGetMediaByUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMediaByUrlQuery, GetMediaByUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMediaByUrlQuery, GetMediaByUrlQueryVariables>(GetMediaByUrlDocument, options);
        }
export type GetMediaByUrlQueryHookResult = ReturnType<typeof useGetMediaByUrlQuery>;
export type GetMediaByUrlLazyQueryHookResult = ReturnType<typeof useGetMediaByUrlLazyQuery>;
export type GetMediaByUrlQueryResult = Apollo.QueryResult<GetMediaByUrlQuery, GetMediaByUrlQueryVariables>;
export const GetSourceByIdDocument = gql`
    query GetSourceById($options: GetSourceByIdInput!) {
  getSourceById(options: $options) {
    id
    title
    mediaId
    type
    src
    thumbnail
    subtitles {
      id
      src
      lang
      language
    }
  }
}
    `;

/**
 * __useGetSourceByIdQuery__
 *
 * To run a query within a React component, call `useGetSourceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSourceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSourceByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetSourceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSourceByIdQuery, GetSourceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSourceByIdQuery, GetSourceByIdQueryVariables>(GetSourceByIdDocument, options);
      }
export function useGetSourceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSourceByIdQuery, GetSourceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSourceByIdQuery, GetSourceByIdQueryVariables>(GetSourceByIdDocument, options);
        }
export type GetSourceByIdQueryHookResult = ReturnType<typeof useGetSourceByIdQuery>;
export type GetSourceByIdLazyQueryHookResult = ReturnType<typeof useGetSourceByIdLazyQuery>;
export type GetSourceByIdQueryResult = Apollo.QueryResult<GetSourceByIdQuery, GetSourceByIdQueryVariables>;
export const GetSourceByMediaDocument = gql`
    query GetSourceByMedia($options: GetSourceByMediaInput!) {
  getSourceByMedia(options: $options) {
    id
    title
    mediaId
    type
    src
    thumbnail
  }
}
    `;

/**
 * __useGetSourceByMediaQuery__
 *
 * To run a query within a React component, call `useGetSourceByMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSourceByMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSourceByMediaQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetSourceByMediaQuery(baseOptions: Apollo.QueryHookOptions<GetSourceByMediaQuery, GetSourceByMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSourceByMediaQuery, GetSourceByMediaQueryVariables>(GetSourceByMediaDocument, options);
      }
export function useGetSourceByMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSourceByMediaQuery, GetSourceByMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSourceByMediaQuery, GetSourceByMediaQueryVariables>(GetSourceByMediaDocument, options);
        }
export type GetSourceByMediaQueryHookResult = ReturnType<typeof useGetSourceByMediaQuery>;
export type GetSourceByMediaLazyQueryHookResult = ReturnType<typeof useGetSourceByMediaLazyQuery>;
export type GetSourceByMediaQueryResult = Apollo.QueryResult<GetSourceByMediaQuery, GetSourceByMediaQueryVariables>;
export const GetWatchlistDocument = gql`
    query GetWatchlist {
  getWatchlist {
    id
    media {
      id
      url
    }
  }
}
    `;

/**
 * __useGetWatchlistQuery__
 *
 * To run a query within a React component, call `useGetWatchlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchlistQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWatchlistQuery(baseOptions?: Apollo.QueryHookOptions<GetWatchlistQuery, GetWatchlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWatchlistQuery, GetWatchlistQueryVariables>(GetWatchlistDocument, options);
      }
export function useGetWatchlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWatchlistQuery, GetWatchlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWatchlistQuery, GetWatchlistQueryVariables>(GetWatchlistDocument, options);
        }
export type GetWatchlistQueryHookResult = ReturnType<typeof useGetWatchlistQuery>;
export type GetWatchlistLazyQueryHookResult = ReturnType<typeof useGetWatchlistLazyQuery>;
export type GetWatchlistQueryResult = Apollo.QueryResult<GetWatchlistQuery, GetWatchlistQueryVariables>;