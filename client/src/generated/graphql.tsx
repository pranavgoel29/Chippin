import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Budget = {
  __typename?: 'Budget';
  created_at: Scalars['String'];
  creator_id: Scalars['Float'];
  id: Scalars['Float'];
  price: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['String'];
};

export type BudgetInput = {
  price: Scalars['String'];
  title: Scalars['String'];
};

export type Expense = {
  __typename?: 'Expense';
  created_at: Scalars['String'];
  creator_id: Scalars['Float'];
  id: Scalars['Float'];
  price: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['String'];
};

export type ExpenseInput = {
  price: Scalars['String'];
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createBudget: Budget;
  createExpense: Expense;
  deleteBudget: Scalars['Boolean'];
  deleteExpense: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateBudget?: Maybe<Budget>;
  updateExpense?: Maybe<Expense>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateBudgetArgs = {
  input: BudgetInput;
};


export type MutationCreateExpenseArgs = {
  input: ExpenseInput;
};


export type MutationDeleteBudgetArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateBudgetArgs = {
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateExpenseArgs = {
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  budget?: Maybe<Budget>;
  budgets: Array<Budget>;
  expense?: Maybe<Expense>;
  expenses: Array<Expense>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryBudgetArgs = {
  id: Scalars['Float'];
};


export type QueryExpenseArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updated_at: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string, created_at: string, updated_at: string };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, created_at: string, updated_at: string } | null } };

export type CreateBudgetMutationVariables = Exact<{
  input: BudgetInput;
}>;


export type CreateBudgetMutation = { __typename?: 'Mutation', createBudget: { __typename?: 'Budget', id: number, title: string, price: string, creator_id: number, created_at: string, updated_at: string } };

export type CreateExpenseMutationVariables = Exact<{
  input: ExpenseInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: { __typename?: 'Expense', id: number, title: string, price: string, creator_id: number, created_at: string, updated_at: string } };

export type DeleteBudgetMutationVariables = Exact<{
  deleteBudgetId: Scalars['Int'];
}>;


export type DeleteBudgetMutation = { __typename?: 'Mutation', deleteBudget: boolean };

export type DeleteExpenseMutationVariables = Exact<{
  deleteExpenseId: Scalars['Int'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, created_at: string, updated_at: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, created_at: string, updated_at: string } | null } };

export type BudgetsQueryVariables = Exact<{ [key: string]: never; }>;


export type BudgetsQuery = { __typename?: 'Query', budgets: Array<{ __typename?: 'Budget', id: number, creator_id: number, title: string, price: string, created_at: string, updated_at: string }> };

export type ExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', id: number, creator_id: number, title: string, price: string, created_at: string, updated_at: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, created_at: string, updated_at: string } | null };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  created_at
  updated_at
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateBudgetDocument = gql`
    mutation CreateBudget($input: BudgetInput!) {
  createBudget(input: $input) {
    id
    title
    price
    creator_id
    created_at
    updated_at
  }
}
    `;

export function useCreateBudgetMutation() {
  return Urql.useMutation<CreateBudgetMutation, CreateBudgetMutationVariables>(CreateBudgetDocument);
};
export const CreateExpenseDocument = gql`
    mutation CreateExpense($input: ExpenseInput!) {
  createExpense(input: $input) {
    id
    title
    price
    creator_id
    created_at
    updated_at
  }
}
    `;

export function useCreateExpenseMutation() {
  return Urql.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument);
};
export const DeleteBudgetDocument = gql`
    mutation DeleteBudget($deleteBudgetId: Int!) {
  deleteBudget(id: $deleteBudgetId)
}
    `;

export function useDeleteBudgetMutation() {
  return Urql.useMutation<DeleteBudgetMutation, DeleteBudgetMutationVariables>(DeleteBudgetDocument);
};
export const DeleteExpenseDocument = gql`
    mutation DeleteExpense($deleteExpenseId: Int!) {
  deleteExpense(id: $deleteExpenseId)
}
    `;

export function useDeleteExpenseMutation() {
  return Urql.useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(DeleteExpenseDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const BudgetsDocument = gql`
    query Budgets {
  budgets {
    id
    creator_id
    title
    price
    created_at
    updated_at
  }
}
    `;

export function useBudgetsQuery(options?: Omit<Urql.UseQueryArgs<BudgetsQueryVariables>, 'query'>) {
  return Urql.useQuery<BudgetsQuery, BudgetsQueryVariables>({ query: BudgetsDocument, ...options });
};
export const ExpensesDocument = gql`
    query Expenses {
  expenses {
    id
    creator_id
    title
    price
    created_at
    updated_at
  }
}
    `;

export function useExpensesQuery(options?: Omit<Urql.UseQueryArgs<ExpensesQueryVariables>, 'query'>) {
  return Urql.useQuery<ExpensesQuery, ExpensesQueryVariables>({ query: ExpensesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    created_at
    updated_at
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};