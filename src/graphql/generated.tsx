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
  geography: any;
  geometry: any;
  timestamptz: any;
  uuid: any;
};


export type CreateNoteOutput = {
  __typename?: 'CreateNoteOutput';
  id: Scalars['uuid'];
  /** An object relationship */
  note: Note;
};

export type GetNoteOutput = {
  __typename?: 'GetNoteOutput';
  content: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  username: Scalars['String'];
  view_count: Scalars['Int'];
};

export type GetNotesOutput = {
  __typename?: 'GetNotesOutput';
  content: Scalars['String'];
  id: Scalars['uuid'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};


export type Geography_Cast_Exp = {
  geometry?: Maybe<Geometry_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type Geography_Comparison_Exp = {
  _cast?: Maybe<Geography_Cast_Exp>;
  _eq?: Maybe<Scalars['geography']>;
  _gt?: Maybe<Scalars['geography']>;
  _gte?: Maybe<Scalars['geography']>;
  _in?: Maybe<Array<Scalars['geography']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geography']>;
  _lte?: Maybe<Scalars['geography']>;
  _neq?: Maybe<Scalars['geography']>;
  _nin?: Maybe<Array<Scalars['geography']>>;
  /** is the column within a given distance from the given geography value */
  _st_d_within?: Maybe<St_D_Within_Geography_Input>;
  /** does the column spatially intersect the given geography value */
  _st_intersects?: Maybe<Scalars['geography']>;
};


export type Geometry_Cast_Exp = {
  geography?: Maybe<Geography_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type Geometry_Comparison_Exp = {
  _cast?: Maybe<Geometry_Cast_Exp>;
  _eq?: Maybe<Scalars['geometry']>;
  _gt?: Maybe<Scalars['geometry']>;
  _gte?: Maybe<Scalars['geometry']>;
  _in?: Maybe<Array<Scalars['geometry']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geometry']>;
  _lte?: Maybe<Scalars['geometry']>;
  _neq?: Maybe<Scalars['geometry']>;
  _nin?: Maybe<Array<Scalars['geometry']>>;
  /** is the column within a given 3D distance from the given geometry value */
  _st_3d_d_within?: Maybe<St_D_Within_Input>;
  /** does the column spatially intersect the given geometry value in 3D */
  _st_3d_intersects?: Maybe<Scalars['geometry']>;
  /** does the column contain the given geometry value */
  _st_contains?: Maybe<Scalars['geometry']>;
  /** does the column cross the given geometry value */
  _st_crosses?: Maybe<Scalars['geometry']>;
  /** is the column within a given distance from the given geometry value */
  _st_d_within?: Maybe<St_D_Within_Input>;
  /** is the column equal to given geometry value (directionality is ignored) */
  _st_equals?: Maybe<Scalars['geometry']>;
  /** does the column spatially intersect the given geometry value */
  _st_intersects?: Maybe<Scalars['geometry']>;
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _st_overlaps?: Maybe<Scalars['geometry']>;
  /** does the column have atleast one point in common with the given geometry value */
  _st_touches?: Maybe<Scalars['geometry']>;
  /** is the column contained in the given geometry value */
  _st_within?: Maybe<Scalars['geometry']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  create_note: CreateNoteOutput;
  /** update data of the table: "note" */
  update_note?: Maybe<Note_Mutation_Response>;
  /** update single row of the table: "note" */
  update_note_by_pk?: Maybe<Note>;
};


/** mutation root */
export type Mutation_RootCreate_NoteArgs = {
  content: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


/** mutation root */
export type Mutation_RootUpdate_NoteArgs = {
  _set?: Maybe<Note_Set_Input>;
  where: Note_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Note_By_PkArgs = {
  _set?: Maybe<Note_Set_Input>;
  pk_columns: Note_Pk_Columns_Input;
};

/** columns and relationships of "note" */
export type Note = {
  __typename?: 'note';
  content: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  location: Scalars['geography'];
  map_image_url?: Maybe<Scalars['String']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['String'];
  /** An array relationship */
  views: Array<Note_View>;
  /** An aggregate relationship */
  views_aggregate: Note_View_Aggregate;
};


/** columns and relationships of "note" */
export type NoteViewsArgs = {
  distinct_on?: Maybe<Array<Note_View_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_View_Order_By>>;
  where?: Maybe<Note_View_Bool_Exp>;
};


/** columns and relationships of "note" */
export type NoteViews_AggregateArgs = {
  distinct_on?: Maybe<Array<Note_View_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_View_Order_By>>;
  where?: Maybe<Note_View_Bool_Exp>;
};

/** aggregated selection of "note" */
export type Note_Aggregate = {
  __typename?: 'note_aggregate';
  aggregate?: Maybe<Note_Aggregate_Fields>;
  nodes: Array<Note>;
};

/** aggregate fields of "note" */
export type Note_Aggregate_Fields = {
  __typename?: 'note_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Note_Max_Fields>;
  min?: Maybe<Note_Min_Fields>;
};


/** aggregate fields of "note" */
export type Note_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Note_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "note". All fields are combined with a logical 'AND'. */
export type Note_Bool_Exp = {
  _and?: Maybe<Array<Note_Bool_Exp>>;
  _not?: Maybe<Note_Bool_Exp>;
  _or?: Maybe<Array<Note_Bool_Exp>>;
  content?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  location?: Maybe<Geography_Comparison_Exp>;
  map_image_url?: Maybe<String_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  views?: Maybe<Note_View_Bool_Exp>;
};

/** aggregate max on columns */
export type Note_Max_Fields = {
  __typename?: 'note_max_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  map_image_url?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Note_Min_Fields = {
  __typename?: 'note_min_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  map_image_url?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "note" */
export type Note_Mutation_Response = {
  __typename?: 'note_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Note>;
};

/** Ordering options when selecting data from "note". */
export type Note_Order_By = {
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  map_image_url?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
  views_aggregate?: Maybe<Note_View_Aggregate_Order_By>;
};

/** primary key columns input for table: note */
export type Note_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "note" */
export enum Note_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  MapImageUrl = 'map_image_url',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "note" */
export type Note_Set_Input = {
  deleted_at?: Maybe<Scalars['timestamptz']>;
};

/** columns and relationships of "note_view" */
export type Note_View = {
  __typename?: 'note_view';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  note: Note;
  note_id: Scalars['uuid'];
};

/** aggregated selection of "note_view" */
export type Note_View_Aggregate = {
  __typename?: 'note_view_aggregate';
  aggregate?: Maybe<Note_View_Aggregate_Fields>;
  nodes: Array<Note_View>;
};

/** aggregate fields of "note_view" */
export type Note_View_Aggregate_Fields = {
  __typename?: 'note_view_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Note_View_Max_Fields>;
  min?: Maybe<Note_View_Min_Fields>;
};


/** aggregate fields of "note_view" */
export type Note_View_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Note_View_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "note_view" */
export type Note_View_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Note_View_Max_Order_By>;
  min?: Maybe<Note_View_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "note_view". All fields are combined with a logical 'AND'. */
export type Note_View_Bool_Exp = {
  _and?: Maybe<Array<Note_View_Bool_Exp>>;
  _not?: Maybe<Note_View_Bool_Exp>;
  _or?: Maybe<Array<Note_View_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  note?: Maybe<Note_Bool_Exp>;
  note_id?: Maybe<Uuid_Comparison_Exp>;
};

/** aggregate max on columns */
export type Note_View_Max_Fields = {
  __typename?: 'note_view_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  note_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "note_view" */
export type Note_View_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Note_View_Min_Fields = {
  __typename?: 'note_view_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  note_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "note_view" */
export type Note_View_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "note_view". */
export type Note_View_Order_By = {
  created_at?: Maybe<Order_By>;
  note?: Maybe<Note_Order_By>;
  note_id?: Maybe<Order_By>;
};

/** select columns of table "note_view" */
export enum Note_View_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  NoteId = 'note_id'
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  get_note: GetNoteOutput;
  get_notes: Array<GetNotesOutput>;
  /** fetch data from the table: "note" */
  note: Array<Note>;
  /** fetch aggregated fields from the table: "note" */
  note_aggregate: Note_Aggregate;
  /** fetch data from the table: "note" using primary key columns */
  note_by_pk?: Maybe<Note>;
  /** fetch data from the table: "note_view" */
  note_view: Array<Note_View>;
  /** fetch aggregated fields from the table: "note_view" */
  note_view_aggregate: Note_View_Aggregate;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Query_RootGet_NoteArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGet_NotesArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


export type Query_RootNoteArgs = {
  distinct_on?: Maybe<Array<Note_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_Order_By>>;
  where?: Maybe<Note_Bool_Exp>;
};


export type Query_RootNote_AggregateArgs = {
  distinct_on?: Maybe<Array<Note_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_Order_By>>;
  where?: Maybe<Note_Bool_Exp>;
};


export type Query_RootNote_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootNote_ViewArgs = {
  distinct_on?: Maybe<Array<Note_View_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_View_Order_By>>;
  where?: Maybe<Note_View_Bool_Exp>;
};


export type Query_RootNote_View_AggregateArgs = {
  distinct_on?: Maybe<Array<Note_View_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_View_Order_By>>;
  where?: Maybe<Note_View_Bool_Exp>;
};


export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['String'];
};

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float'];
  from: Scalars['geography'];
  use_spheroid?: Maybe<Scalars['Boolean']>;
};

export type St_D_Within_Input = {
  distance: Scalars['Float'];
  from: Scalars['geometry'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "note" */
  note: Array<Note>;
  /** fetch aggregated fields from the table: "note" */
  note_aggregate: Note_Aggregate;
  /** fetch data from the table: "note" using primary key columns */
  note_by_pk?: Maybe<Note>;
  /** fetch data from the table: "note_view" */
  note_view: Array<Note_View>;
  /** fetch aggregated fields from the table: "note_view" */
  note_view_aggregate: Note_View_Aggregate;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
};


export type Subscription_RootNoteArgs = {
  distinct_on?: Maybe<Array<Note_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_Order_By>>;
  where?: Maybe<Note_Bool_Exp>;
};


export type Subscription_RootNote_AggregateArgs = {
  distinct_on?: Maybe<Array<Note_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_Order_By>>;
  where?: Maybe<Note_Bool_Exp>;
};


export type Subscription_RootNote_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootNote_ViewArgs = {
  distinct_on?: Maybe<Array<Note_View_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_View_Order_By>>;
  where?: Maybe<Note_View_Bool_Exp>;
};


export type Subscription_RootNote_View_AggregateArgs = {
  distinct_on?: Maybe<Array<Note_View_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Note_View_Order_By>>;
  where?: Maybe<Note_View_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['String'];
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<User_Bool_Exp>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<User_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username'
}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type CreateNoteMutationVariables = Exact<{
  content: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type CreateNoteMutation = { __typename?: 'mutation_root', create_note: { __typename?: 'CreateNoteOutput', note: { __typename?: 'note', id: any, content: string, createdAt: any } } };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['uuid'];
}>;


export type DeleteNoteMutation = { __typename?: 'mutation_root', delete_note?: Maybe<{ __typename?: 'note', id: any }> };

export type NotesQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type NotesQuery = { __typename?: 'query_root', notes: Array<{ __typename?: 'GetNotesOutput', id: any, content: string, latitude: number, longitude: number }> };

export type NoteQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type NoteQuery = { __typename?: 'query_root', note: { __typename?: 'GetNoteOutput', id: any, content: string, username: string, createdAt: any, viewCount: number } };

export type MyNoteQueryVariables = Exact<{
  noteId: Scalars['uuid'];
}>;


export type MyNoteQuery = { __typename?: 'query_root', note?: Maybe<{ __typename?: 'note', id: any, location: any, content: string, createdAt: any, mapImageUrl?: Maybe<string>, views_aggregate: { __typename?: 'note_view_aggregate', aggregate?: Maybe<{ __typename?: 'note_view_aggregate_fields', count: number }> } }> };

export type MyNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotesQuery = { __typename?: 'query_root', notes: Array<{ __typename?: 'note', id: any, content: string, createdAt: any, views_aggregate: { __typename?: 'note_view_aggregate', aggregate?: Maybe<{ __typename?: 'note_view_aggregate_fields', count: number }> } }> };

export type StatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatisticsQuery = { __typename?: 'query_root', notes: { __typename?: 'note_aggregate', aggregate?: Maybe<{ __typename?: 'note_aggregate_fields', count: number }> }, views: { __typename?: 'note_view_aggregate', aggregate?: Maybe<{ __typename?: 'note_view_aggregate_fields', count: number }> }, most_viewed: Array<{ __typename?: 'note', id: any, content: string, createdAt: any, views_aggregate: { __typename?: 'note_view_aggregate', aggregate?: Maybe<{ __typename?: 'note_view_aggregate_fields', count: number }> } }> };

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'query_root', user?: Maybe<{ __typename?: 'user', username: string }> };


export const CreateNoteDocument = gql`
    mutation CreateNote($content: String!, $latitude: Float!, $longitude: Float!) {
  create_note(content: $content, latitude: $latitude, longitude: $longitude) {
    note {
      id
      content
      createdAt: created_at
    }
  }
}
    `;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      content: // value for 'content'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteId: uuid!) {
  delete_note: update_note_by_pk(
    pk_columns: {id: $noteId}
    _set: {deleted_at: now}
  ) {
    id
  }
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const NotesDocument = gql`
    query Notes($latitude: Float!, $longitude: Float!) {
  notes: get_notes(latitude: $latitude, longitude: $longitude) {
    id
    content
    latitude
    longitude
  }
}
    `;

/**
 * __useNotesQuery__
 *
 * To run a query within a React component, call `useNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesQuery({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useNotesQuery(baseOptions: Apollo.QueryHookOptions<NotesQuery, NotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotesQuery, NotesQueryVariables>(NotesDocument, options);
      }
export function useNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotesQuery, NotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotesQuery, NotesQueryVariables>(NotesDocument, options);
        }
export type NotesQueryHookResult = ReturnType<typeof useNotesQuery>;
export type NotesLazyQueryHookResult = ReturnType<typeof useNotesLazyQuery>;
export type NotesQueryResult = Apollo.QueryResult<NotesQuery, NotesQueryVariables>;
export const NoteDocument = gql`
    query Note($id: uuid!) {
  note: get_note(id: $id) {
    id
    content
    createdAt: created_at
    username
    viewCount: view_count
  }
}
    `;

/**
 * __useNoteQuery__
 *
 * To run a query within a React component, call `useNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNoteQuery(baseOptions: Apollo.QueryHookOptions<NoteQuery, NoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NoteQuery, NoteQueryVariables>(NoteDocument, options);
      }
export function useNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoteQuery, NoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NoteQuery, NoteQueryVariables>(NoteDocument, options);
        }
export type NoteQueryHookResult = ReturnType<typeof useNoteQuery>;
export type NoteLazyQueryHookResult = ReturnType<typeof useNoteLazyQuery>;
export type NoteQueryResult = Apollo.QueryResult<NoteQuery, NoteQueryVariables>;
export const MyNoteDocument = gql`
    query MyNote($noteId: uuid!) {
  note: note_by_pk(id: $noteId) {
    id
    location
    createdAt: created_at
    content
    views_aggregate {
      aggregate {
        count
      }
    }
    mapImageUrl: map_image_url
  }
}
    `;

/**
 * __useMyNoteQuery__
 *
 * To run a query within a React component, call `useMyNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNoteQuery({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useMyNoteQuery(baseOptions: Apollo.QueryHookOptions<MyNoteQuery, MyNoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNoteQuery, MyNoteQueryVariables>(MyNoteDocument, options);
      }
export function useMyNoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNoteQuery, MyNoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNoteQuery, MyNoteQueryVariables>(MyNoteDocument, options);
        }
export type MyNoteQueryHookResult = ReturnType<typeof useMyNoteQuery>;
export type MyNoteLazyQueryHookResult = ReturnType<typeof useMyNoteLazyQuery>;
export type MyNoteQueryResult = Apollo.QueryResult<MyNoteQuery, MyNoteQueryVariables>;
export const MyNotesDocument = gql`
    query MyNotes {
  notes: note(order_by: {created_at: desc}) {
    id
    createdAt: created_at
    content
    views_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

/**
 * __useMyNotesQuery__
 *
 * To run a query within a React component, call `useMyNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNotesQuery(baseOptions?: Apollo.QueryHookOptions<MyNotesQuery, MyNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNotesQuery, MyNotesQueryVariables>(MyNotesDocument, options);
      }
export function useMyNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNotesQuery, MyNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNotesQuery, MyNotesQueryVariables>(MyNotesDocument, options);
        }
export type MyNotesQueryHookResult = ReturnType<typeof useMyNotesQuery>;
export type MyNotesLazyQueryHookResult = ReturnType<typeof useMyNotesLazyQuery>;
export type MyNotesQueryResult = Apollo.QueryResult<MyNotesQuery, MyNotesQueryVariables>;
export const StatisticsDocument = gql`
    query Statistics {
  notes: note_aggregate {
    aggregate {
      count
    }
  }
  views: note_view_aggregate {
    aggregate {
      count
    }
  }
  most_viewed: note(order_by: {views_aggregate: {count: desc}}, limit: 3) {
    id
    content
    createdAt: created_at
    views_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

/**
 * __useStatisticsQuery__
 *
 * To run a query within a React component, call `useStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<StatisticsQuery, StatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
      }
export function useStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatisticsQuery, StatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
        }
export type StatisticsQueryHookResult = ReturnType<typeof useStatisticsQuery>;
export type StatisticsLazyQueryHookResult = ReturnType<typeof useStatisticsLazyQuery>;
export type StatisticsQueryResult = Apollo.QueryResult<StatisticsQuery, StatisticsQueryVariables>;
export const UserDocument = gql`
    query User($userId: String!) {
  user: user_by_pk(id: $userId) {
    username
  }
}
    `;

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
 *      userId: // value for 'userId'
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