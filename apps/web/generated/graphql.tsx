import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Consultation = {
  __typename?: 'Consultation';
  id: Scalars['ID'];
  pacient: Pacient;
  medic: User;
  isClosed: Scalars['Boolean'];
  closedAt?: Maybe<Scalars['DateTime']>;
  rezumat?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Diagnostic = {
  __typename?: 'Diagnostic';
  id: Scalars['ID'];
  name: Scalars['String'];
  specialty?: Maybe<Specialty>;
  symptoms?: Maybe<Array<Symptom>>;
};

export type EditProfileInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};


export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type MedicStats = {
  __typename?: 'MedicStats';
  intrebariActive: Scalars['Float'];
  cazuriRezolvate: Scalars['Float'];
  consultatiiTotale: Scalars['Float'];
};

export type Medicament = {
  __typename?: 'Medicament';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPrescription: Prescription;
  addProgramMedic: Scalars['Boolean'];
  doProgramarePacient: Scalars['Boolean'];
  addSpecialty: Scalars['Boolean'];
  addMedicament: Medicament;
  addDiagnostic: Diagnostic;
  addSymptom: Symptom;
  addSymptomToDiagnostic: Scalars['Boolean'];
  addDiagnosticToSpecialty: Scalars['Boolean'];
  editProfile?: Maybe<User>;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  revocaRefreshTokenUser: Scalars['Boolean'];
  addSpecialtyToMedic: Scalars['Boolean'];
  register: RegisterResponse;
};


export type MutationCreatePrescriptionArgs = {
  items: Array<PrescriptionEntry>;
  programareId: Scalars['String'];
};


export type MutationAddProgramMedicArgs = {
  medicId: Scalars['Int'];
};


export type MutationDoProgramarePacientArgs = {
  startDate: Scalars['DateTime'];
  medicId: Scalars['Int'];
};


export type MutationAddSpecialtyArgs = {
  name: Scalars['String'];
};


export type MutationAddMedicamentArgs = {
  name: Scalars['String'];
};


export type MutationAddDiagnosticArgs = {
  symptomsIds: Array<Scalars['Int']>;
  specialtyId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationAddSymptomArgs = {
  name: Scalars['String'];
};


export type MutationAddSymptomToDiagnosticArgs = {
  symptomId: Scalars['Int'];
  diagnosticId: Scalars['Int'];
};


export type MutationAddDiagnosticToSpecialtyArgs = {
  specialtyId: Scalars['Int'];
  diagnosticId: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  data: EditProfileInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevocaRefreshTokenUserArgs = {
  userId: Scalars['Int'];
};


export type MutationAddSpecialtyToMedicArgs = {
  specialtyId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type Pacient = {
  __typename?: 'Pacient';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  sex?: Maybe<Sex>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  age?: Maybe<Scalars['Int']>;
  avatarUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  medicPrincipal: User;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type Prescription = {
  __typename?: 'Prescription';
  id: Scalars['ID'];
  items: Array<PrescriptionItem>;
  pacient: Pacient;
  medic: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PrescriptionEntry = {
  medicamentId: Scalars['Int'];
  zile: Scalars['Int'];
  cantitate: Scalars['Int'];
  interval: Scalars['Int'];
};

export type PrescriptionItem = {
  __typename?: 'PrescriptionItem';
  id: Scalars['ID'];
  zile: Scalars['Float'];
  cantitate: Scalars['Float'];
  interval: Scalars['Float'];
  medicament: Medicament;
};

export type ProgramMedic = {
  __typename?: 'ProgramMedic';
  id: Scalars['ID'];
  luni: Scalars['JSON'];
  marti: Scalars['JSON'];
  miercuri: Scalars['JSON'];
  joi: Scalars['JSON'];
  vineri: Scalars['JSON'];
  isException: Scalars['Boolean'];
  exceptionStart?: Maybe<Scalars['DateTime']>;
  exceptionEnd?: Maybe<Scalars['DateTime']>;
  durataConsultatie: Scalars['Float'];
  medic: User;
};

export type Programare = {
  __typename?: 'Programare';
  id: Scalars['ID'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  pacient: Pacient;
  medic: User;
  consultation?: Maybe<Consultation>;
};

export type Query = {
  __typename?: 'Query';
  findMedicBySpecialty: Array<User>;
  getMedic: User;
  getPrescription: Prescription;
  oreDisponibile: Array<Scalars['JSON']>;
  programari: Array<Programare>;
  getProgramMedic: ProgramMedic;
  getProgramariMedicForToday: Array<Programare>;
  getProgramariMedic: Array<Programare>;
  getProgramariPacient: Array<Programare>;
  programe_medici: Array<ProgramMedic>;
  specialties: Array<Specialty>;
  medicamente: Array<Medicament>;
  diagnostice: Array<Diagnostic>;
  medics: Array<User>;
  symptoms: Array<Symptom>;
  findSpecializariFaraDiagnostice?: Maybe<Array<Specialty>>;
  me?: Maybe<User>;
  medicMainStats?: Maybe<MedicStats>;
};


export type QueryFindMedicBySpecialtyArgs = {
  specialtyId: Scalars['Int'];
};


export type QueryGetMedicArgs = {
  medicId: Scalars['Int'];
};


export type QueryGetPrescriptionArgs = {
  prescriptionId: Scalars['String'];
};


export type QueryOreDisponibileArgs = {
  data: Scalars['DateTime'];
  medicId: Scalars['Int'];
};

export type RegisterByInviteInput = {
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  specialties: Array<Scalars['Int']>;
  email: Scalars['String'];
  inviteCode: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  specialties: Array<Scalars['Int']>;
  email: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  accessToken: Scalars['String'];
  user: User;
};

/** sex types */
export enum Sex {
  Masculin = 'MASCULIN',
  Feminin = 'FEMININ'
}

export type Specialty = {
  __typename?: 'Specialty';
  id: Scalars['ID'];
  denumire: Scalars['String'];
  isRoot: Scalars['Boolean'];
};

export type Symptom = {
  __typename?: 'Symptom';
  id: Scalars['ID'];
  name: Scalars['String'];
  diagnostice?: Maybe<Array<Diagnostic>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  specialties?: Maybe<Array<Specialty>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type AddDiagnosticMutationVariables = Exact<{
  name: Scalars['String'];
  specialtyId: Scalars['Int'];
  symptomsIds: Array<Scalars['Int']>;
}>;


export type AddDiagnosticMutation = (
  { __typename?: 'Mutation' }
  & { addDiagnostic: (
    { __typename?: 'Diagnostic' }
    & Pick<Diagnostic, 'id' | 'name'>
  ) }
);

export type AddMedicamentMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddMedicamentMutation = (
  { __typename?: 'Mutation' }
  & { addMedicament: (
    { __typename?: 'Medicament' }
    & Pick<Medicament, 'id'>
  ) }
);

export type AddSpecialtyMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddSpecialtyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSpecialty'>
);

export type AddSymptomMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddSymptomMutation = (
  { __typename?: 'Mutation' }
  & { addSymptom: (
    { __typename?: 'Symptom' }
    & Pick<Symptom, 'id'>
  ) }
);

export type CreatePrescriptionMutationVariables = Exact<{
  programareId: Scalars['String'];
  items: Array<PrescriptionEntry>;
}>;


export type CreatePrescriptionMutation = (
  { __typename?: 'Mutation' }
  & { createPrescription: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id'>
  ) }
);

export type DiagnosticeQueryVariables = Exact<{ [key: string]: never; }>;


export type DiagnosticeQuery = (
  { __typename?: 'Query' }
  & { diagnostice: Array<(
    { __typename?: 'Diagnostic' }
    & Pick<Diagnostic, 'id' | 'name'>
    & { specialty?: Maybe<(
      { __typename?: 'Specialty' }
      & Pick<Specialty, 'id' | 'denumire'>
    )>, symptoms?: Maybe<Array<(
      { __typename?: 'Symptom' }
      & Pick<Symptom, 'id' | 'name'>
    )>> }
  )> }
);

export type GetPrescriptionQueryVariables = Exact<{
  prescriptionId: Scalars['String'];
}>;


export type GetPrescriptionQuery = (
  { __typename?: 'Query' }
  & { getPrescription: (
    { __typename?: 'Prescription' }
    & Pick<Prescription, 'id' | 'createdAt'>
    & { pacient: (
      { __typename?: 'Pacient' }
      & Pick<Pacient, 'id' | 'name' | 'age' | 'sex'>
    ), medic: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), items: Array<(
      { __typename?: 'PrescriptionItem' }
      & Pick<PrescriptionItem, 'id' | 'interval' | 'cantitate' | 'zile'>
      & { medicament: (
        { __typename?: 'Medicament' }
        & Pick<Medicament, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type GetProgramMedicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProgramMedicQuery = (
  { __typename?: 'Query' }
  & { getProgramMedic: (
    { __typename?: 'ProgramMedic' }
    & Pick<ProgramMedic, 'luni' | 'marti' | 'miercuri' | 'joi' | 'vineri'>
  ) }
);

export type GetProgramariMedicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProgramariMedicQuery = (
  { __typename?: 'Query' }
  & { getProgramariMedic: Array<(
    { __typename?: 'Programare' }
    & Pick<Programare, 'id' | 'startDate' | 'endDate'>
    & { pacient: (
      { __typename?: 'Pacient' }
      & Pick<Pacient, 'name' | 'avatarUrl'>
    ) }
  )> }
);

export type GetProgramariMedicForTodayQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProgramariMedicForTodayQuery = (
  { __typename?: 'Query' }
  & { getProgramariMedicForToday: Array<(
    { __typename?: 'Programare' }
    & Pick<Programare, 'id' | 'startDate' | 'endDate'>
    & { pacient: (
      { __typename?: 'Pacient' }
      & Pick<Pacient, 'name' | 'avatarUrl'>
    ) }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'avatarUrl' | 'profilePicture'>
    & { specialties?: Maybe<Array<(
      { __typename?: 'Specialty' }
      & Pick<Specialty, 'id' | 'denumire'>
    )>> }
  )> }
);

export type MedicMainStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicMainStatsQuery = (
  { __typename?: 'Query' }
  & { medicMainStats?: Maybe<(
    { __typename?: 'MedicStats' }
    & Pick<MedicStats, 'intrebariActive' | 'cazuriRezolvate' | 'consultatiiTotale'>
  )> }
);

export type MedicamenteQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicamenteQuery = (
  { __typename?: 'Query' }
  & { medicamente: Array<(
    { __typename?: 'Medicament' }
    & Pick<Medicament, 'id' | 'name'>
  )> }
);

export type MedicsQueryVariables = Exact<{ [key: string]: never; }>;


export type MedicsQuery = (
  { __typename?: 'Query' }
  & { medics: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'avatarUrl'>
    & { specialties?: Maybe<Array<(
      { __typename?: 'Specialty' }
      & Pick<Specialty, 'id' | 'denumire'>
    )>> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  specialties: Array<Scalars['Int']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type SpecialtiesQueryVariables = Exact<{ [key: string]: never; }>;


export type SpecialtiesQuery = (
  { __typename?: 'Query' }
  & { specialties: Array<(
    { __typename?: 'Specialty' }
    & Pick<Specialty, 'id' | 'denumire'>
  )> }
);

export type GetSymptomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSymptomsQuery = (
  { __typename?: 'Query' }
  & { symptoms: Array<(
    { __typename?: 'Symptom' }
    & Pick<Symptom, 'id' | 'name'>
    & { diagnostice?: Maybe<Array<(
      { __typename?: 'Diagnostic' }
      & Pick<Diagnostic, 'id' | 'name'>
    )>> }
  )> }
);


export const AddDiagnosticDocument = gql`
    mutation addDiagnostic($name: String!, $specialtyId: Int!, $symptomsIds: [Int!]!) {
  addDiagnostic(name: $name, specialtyId: $specialtyId, symptomsIds: $symptomsIds) {
    id
    name
  }
}
    `;
export type AddDiagnosticMutationFn = Apollo.MutationFunction<AddDiagnosticMutation, AddDiagnosticMutationVariables>;
export type AddDiagnosticComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddDiagnosticMutation, AddDiagnosticMutationVariables>, 'mutation'>;

    export const AddDiagnosticComponent = (props: AddDiagnosticComponentProps) => (
      <ApolloReactComponents.Mutation<AddDiagnosticMutation, AddDiagnosticMutationVariables> mutation={AddDiagnosticDocument} {...props} />
    );
    

/**
 * __useAddDiagnosticMutation__
 *
 * To run a mutation, you first call `useAddDiagnosticMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDiagnosticMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDiagnosticMutation, { data, loading, error }] = useAddDiagnosticMutation({
 *   variables: {
 *      name: // value for 'name'
 *      specialtyId: // value for 'specialtyId'
 *      symptomsIds: // value for 'symptomsIds'
 *   },
 * });
 */
export function useAddDiagnosticMutation(baseOptions?: Apollo.MutationHookOptions<AddDiagnosticMutation, AddDiagnosticMutationVariables>) {
        return Apollo.useMutation<AddDiagnosticMutation, AddDiagnosticMutationVariables>(AddDiagnosticDocument, baseOptions);
      }
export type AddDiagnosticMutationHookResult = ReturnType<typeof useAddDiagnosticMutation>;
export type AddDiagnosticMutationResult = Apollo.MutationResult<AddDiagnosticMutation>;
export type AddDiagnosticMutationOptions = Apollo.BaseMutationOptions<AddDiagnosticMutation, AddDiagnosticMutationVariables>;
export const AddMedicamentDocument = gql`
    mutation addMedicament($name: String!) {
  addMedicament(name: $name) {
    id
  }
}
    `;
export type AddMedicamentMutationFn = Apollo.MutationFunction<AddMedicamentMutation, AddMedicamentMutationVariables>;
export type AddMedicamentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMedicamentMutation, AddMedicamentMutationVariables>, 'mutation'>;

    export const AddMedicamentComponent = (props: AddMedicamentComponentProps) => (
      <ApolloReactComponents.Mutation<AddMedicamentMutation, AddMedicamentMutationVariables> mutation={AddMedicamentDocument} {...props} />
    );
    

/**
 * __useAddMedicamentMutation__
 *
 * To run a mutation, you first call `useAddMedicamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMedicamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMedicamentMutation, { data, loading, error }] = useAddMedicamentMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddMedicamentMutation(baseOptions?: Apollo.MutationHookOptions<AddMedicamentMutation, AddMedicamentMutationVariables>) {
        return Apollo.useMutation<AddMedicamentMutation, AddMedicamentMutationVariables>(AddMedicamentDocument, baseOptions);
      }
export type AddMedicamentMutationHookResult = ReturnType<typeof useAddMedicamentMutation>;
export type AddMedicamentMutationResult = Apollo.MutationResult<AddMedicamentMutation>;
export type AddMedicamentMutationOptions = Apollo.BaseMutationOptions<AddMedicamentMutation, AddMedicamentMutationVariables>;
export const AddSpecialtyDocument = gql`
    mutation addSpecialty($name: String!) {
  addSpecialty(name: $name)
}
    `;
export type AddSpecialtyMutationFn = Apollo.MutationFunction<AddSpecialtyMutation, AddSpecialtyMutationVariables>;
export type AddSpecialtyComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddSpecialtyMutation, AddSpecialtyMutationVariables>, 'mutation'>;

    export const AddSpecialtyComponent = (props: AddSpecialtyComponentProps) => (
      <ApolloReactComponents.Mutation<AddSpecialtyMutation, AddSpecialtyMutationVariables> mutation={AddSpecialtyDocument} {...props} />
    );
    

/**
 * __useAddSpecialtyMutation__
 *
 * To run a mutation, you first call `useAddSpecialtyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSpecialtyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSpecialtyMutation, { data, loading, error }] = useAddSpecialtyMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddSpecialtyMutation(baseOptions?: Apollo.MutationHookOptions<AddSpecialtyMutation, AddSpecialtyMutationVariables>) {
        return Apollo.useMutation<AddSpecialtyMutation, AddSpecialtyMutationVariables>(AddSpecialtyDocument, baseOptions);
      }
export type AddSpecialtyMutationHookResult = ReturnType<typeof useAddSpecialtyMutation>;
export type AddSpecialtyMutationResult = Apollo.MutationResult<AddSpecialtyMutation>;
export type AddSpecialtyMutationOptions = Apollo.BaseMutationOptions<AddSpecialtyMutation, AddSpecialtyMutationVariables>;
export const AddSymptomDocument = gql`
    mutation addSymptom($name: String!) {
  addSymptom(name: $name) {
    id
  }
}
    `;
export type AddSymptomMutationFn = Apollo.MutationFunction<AddSymptomMutation, AddSymptomMutationVariables>;
export type AddSymptomComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddSymptomMutation, AddSymptomMutationVariables>, 'mutation'>;

    export const AddSymptomComponent = (props: AddSymptomComponentProps) => (
      <ApolloReactComponents.Mutation<AddSymptomMutation, AddSymptomMutationVariables> mutation={AddSymptomDocument} {...props} />
    );
    

/**
 * __useAddSymptomMutation__
 *
 * To run a mutation, you first call `useAddSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSymptomMutation, { data, loading, error }] = useAddSymptomMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddSymptomMutation(baseOptions?: Apollo.MutationHookOptions<AddSymptomMutation, AddSymptomMutationVariables>) {
        return Apollo.useMutation<AddSymptomMutation, AddSymptomMutationVariables>(AddSymptomDocument, baseOptions);
      }
export type AddSymptomMutationHookResult = ReturnType<typeof useAddSymptomMutation>;
export type AddSymptomMutationResult = Apollo.MutationResult<AddSymptomMutation>;
export type AddSymptomMutationOptions = Apollo.BaseMutationOptions<AddSymptomMutation, AddSymptomMutationVariables>;
export const CreatePrescriptionDocument = gql`
    mutation createPrescription($programareId: String!, $items: [PrescriptionEntry!]!) {
  createPrescription(programareId: $programareId, items: $items) {
    id
  }
}
    `;
export type CreatePrescriptionMutationFn = Apollo.MutationFunction<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>;
export type CreatePrescriptionComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>, 'mutation'>;

    export const CreatePrescriptionComponent = (props: CreatePrescriptionComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePrescriptionMutation, CreatePrescriptionMutationVariables> mutation={CreatePrescriptionDocument} {...props} />
    );
    

/**
 * __useCreatePrescriptionMutation__
 *
 * To run a mutation, you first call `useCreatePrescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePrescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPrescriptionMutation, { data, loading, error }] = useCreatePrescriptionMutation({
 *   variables: {
 *      programareId: // value for 'programareId'
 *      items: // value for 'items'
 *   },
 * });
 */
export function useCreatePrescriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>) {
        return Apollo.useMutation<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>(CreatePrescriptionDocument, baseOptions);
      }
export type CreatePrescriptionMutationHookResult = ReturnType<typeof useCreatePrescriptionMutation>;
export type CreatePrescriptionMutationResult = Apollo.MutationResult<CreatePrescriptionMutation>;
export type CreatePrescriptionMutationOptions = Apollo.BaseMutationOptions<CreatePrescriptionMutation, CreatePrescriptionMutationVariables>;
export const DiagnosticeDocument = gql`
    query diagnostice {
  diagnostice {
    id
    name
    specialty {
      id
      denumire
    }
    symptoms {
      id
      name
    }
  }
}
    `;
export type DiagnosticeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<DiagnosticeQuery, DiagnosticeQueryVariables>, 'query'>;

    export const DiagnosticeComponent = (props: DiagnosticeComponentProps) => (
      <ApolloReactComponents.Query<DiagnosticeQuery, DiagnosticeQueryVariables> query={DiagnosticeDocument} {...props} />
    );
    

/**
 * __useDiagnosticeQuery__
 *
 * To run a query within a React component, call `useDiagnosticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiagnosticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiagnosticeQuery({
 *   variables: {
 *   },
 * });
 */
export function useDiagnosticeQuery(baseOptions?: Apollo.QueryHookOptions<DiagnosticeQuery, DiagnosticeQueryVariables>) {
        return Apollo.useQuery<DiagnosticeQuery, DiagnosticeQueryVariables>(DiagnosticeDocument, baseOptions);
      }
export function useDiagnosticeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiagnosticeQuery, DiagnosticeQueryVariables>) {
          return Apollo.useLazyQuery<DiagnosticeQuery, DiagnosticeQueryVariables>(DiagnosticeDocument, baseOptions);
        }
export type DiagnosticeQueryHookResult = ReturnType<typeof useDiagnosticeQuery>;
export type DiagnosticeLazyQueryHookResult = ReturnType<typeof useDiagnosticeLazyQuery>;
export type DiagnosticeQueryResult = Apollo.QueryResult<DiagnosticeQuery, DiagnosticeQueryVariables>;
export const GetPrescriptionDocument = gql`
    query getPrescription($prescriptionId: String!) {
  getPrescription(prescriptionId: $prescriptionId) {
    id
    createdAt
    pacient {
      id
      name
      age
      sex
    }
    medic {
      id
      name
    }
    items {
      id
      interval
      cantitate
      zile
      medicament {
        id
        name
      }
    }
  }
}
    `;
export type GetPrescriptionComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPrescriptionQuery, GetPrescriptionQueryVariables>, 'query'> & ({ variables: GetPrescriptionQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPrescriptionComponent = (props: GetPrescriptionComponentProps) => (
      <ApolloReactComponents.Query<GetPrescriptionQuery, GetPrescriptionQueryVariables> query={GetPrescriptionDocument} {...props} />
    );
    

/**
 * __useGetPrescriptionQuery__
 *
 * To run a query within a React component, call `useGetPrescriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrescriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrescriptionQuery({
 *   variables: {
 *      prescriptionId: // value for 'prescriptionId'
 *   },
 * });
 */
export function useGetPrescriptionQuery(baseOptions: Apollo.QueryHookOptions<GetPrescriptionQuery, GetPrescriptionQueryVariables>) {
        return Apollo.useQuery<GetPrescriptionQuery, GetPrescriptionQueryVariables>(GetPrescriptionDocument, baseOptions);
      }
export function useGetPrescriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrescriptionQuery, GetPrescriptionQueryVariables>) {
          return Apollo.useLazyQuery<GetPrescriptionQuery, GetPrescriptionQueryVariables>(GetPrescriptionDocument, baseOptions);
        }
export type GetPrescriptionQueryHookResult = ReturnType<typeof useGetPrescriptionQuery>;
export type GetPrescriptionLazyQueryHookResult = ReturnType<typeof useGetPrescriptionLazyQuery>;
export type GetPrescriptionQueryResult = Apollo.QueryResult<GetPrescriptionQuery, GetPrescriptionQueryVariables>;
export const GetProgramMedicDocument = gql`
    query getProgramMedic {
  getProgramMedic {
    luni
    marti
    miercuri
    joi
    vineri
  }
}
    `;
export type GetProgramMedicComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProgramMedicQuery, GetProgramMedicQueryVariables>, 'query'>;

    export const GetProgramMedicComponent = (props: GetProgramMedicComponentProps) => (
      <ApolloReactComponents.Query<GetProgramMedicQuery, GetProgramMedicQueryVariables> query={GetProgramMedicDocument} {...props} />
    );
    

/**
 * __useGetProgramMedicQuery__
 *
 * To run a query within a React component, call `useGetProgramMedicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgramMedicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgramMedicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProgramMedicQuery(baseOptions?: Apollo.QueryHookOptions<GetProgramMedicQuery, GetProgramMedicQueryVariables>) {
        return Apollo.useQuery<GetProgramMedicQuery, GetProgramMedicQueryVariables>(GetProgramMedicDocument, baseOptions);
      }
export function useGetProgramMedicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgramMedicQuery, GetProgramMedicQueryVariables>) {
          return Apollo.useLazyQuery<GetProgramMedicQuery, GetProgramMedicQueryVariables>(GetProgramMedicDocument, baseOptions);
        }
export type GetProgramMedicQueryHookResult = ReturnType<typeof useGetProgramMedicQuery>;
export type GetProgramMedicLazyQueryHookResult = ReturnType<typeof useGetProgramMedicLazyQuery>;
export type GetProgramMedicQueryResult = Apollo.QueryResult<GetProgramMedicQuery, GetProgramMedicQueryVariables>;
export const GetProgramariMedicDocument = gql`
    query getProgramariMedic {
  getProgramariMedic {
    id
    startDate
    endDate
    pacient {
      name
      avatarUrl
    }
  }
}
    `;
export type GetProgramariMedicComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProgramariMedicQuery, GetProgramariMedicQueryVariables>, 'query'>;

    export const GetProgramariMedicComponent = (props: GetProgramariMedicComponentProps) => (
      <ApolloReactComponents.Query<GetProgramariMedicQuery, GetProgramariMedicQueryVariables> query={GetProgramariMedicDocument} {...props} />
    );
    

/**
 * __useGetProgramariMedicQuery__
 *
 * To run a query within a React component, call `useGetProgramariMedicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgramariMedicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgramariMedicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProgramariMedicQuery(baseOptions?: Apollo.QueryHookOptions<GetProgramariMedicQuery, GetProgramariMedicQueryVariables>) {
        return Apollo.useQuery<GetProgramariMedicQuery, GetProgramariMedicQueryVariables>(GetProgramariMedicDocument, baseOptions);
      }
export function useGetProgramariMedicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgramariMedicQuery, GetProgramariMedicQueryVariables>) {
          return Apollo.useLazyQuery<GetProgramariMedicQuery, GetProgramariMedicQueryVariables>(GetProgramariMedicDocument, baseOptions);
        }
export type GetProgramariMedicQueryHookResult = ReturnType<typeof useGetProgramariMedicQuery>;
export type GetProgramariMedicLazyQueryHookResult = ReturnType<typeof useGetProgramariMedicLazyQuery>;
export type GetProgramariMedicQueryResult = Apollo.QueryResult<GetProgramariMedicQuery, GetProgramariMedicQueryVariables>;
export const GetProgramariMedicForTodayDocument = gql`
    query getProgramariMedicForToday {
  getProgramariMedicForToday {
    id
    startDate
    endDate
    pacient {
      name
      avatarUrl
    }
  }
}
    `;
export type GetProgramariMedicForTodayComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables>, 'query'>;

    export const GetProgramariMedicForTodayComponent = (props: GetProgramariMedicForTodayComponentProps) => (
      <ApolloReactComponents.Query<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables> query={GetProgramariMedicForTodayDocument} {...props} />
    );
    

/**
 * __useGetProgramariMedicForTodayQuery__
 *
 * To run a query within a React component, call `useGetProgramariMedicForTodayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgramariMedicForTodayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgramariMedicForTodayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProgramariMedicForTodayQuery(baseOptions?: Apollo.QueryHookOptions<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables>) {
        return Apollo.useQuery<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables>(GetProgramariMedicForTodayDocument, baseOptions);
      }
export function useGetProgramariMedicForTodayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables>) {
          return Apollo.useLazyQuery<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables>(GetProgramariMedicForTodayDocument, baseOptions);
        }
export type GetProgramariMedicForTodayQueryHookResult = ReturnType<typeof useGetProgramariMedicForTodayQuery>;
export type GetProgramariMedicForTodayLazyQueryHookResult = ReturnType<typeof useGetProgramariMedicForTodayLazyQuery>;
export type GetProgramariMedicForTodayQueryResult = Apollo.QueryResult<GetProgramariMedicForTodayQuery, GetProgramariMedicForTodayQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
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
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    

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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    name
    avatarUrl
    profilePicture
    specialties {
      id
      denumire
    }
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MedicMainStatsDocument = gql`
    query MedicMainStats {
  medicMainStats {
    intrebariActive
    cazuriRezolvate
    consultatiiTotale
  }
}
    `;
export type MedicMainStatsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MedicMainStatsQuery, MedicMainStatsQueryVariables>, 'query'>;

    export const MedicMainStatsComponent = (props: MedicMainStatsComponentProps) => (
      <ApolloReactComponents.Query<MedicMainStatsQuery, MedicMainStatsQueryVariables> query={MedicMainStatsDocument} {...props} />
    );
    

/**
 * __useMedicMainStatsQuery__
 *
 * To run a query within a React component, call `useMedicMainStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicMainStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicMainStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMedicMainStatsQuery(baseOptions?: Apollo.QueryHookOptions<MedicMainStatsQuery, MedicMainStatsQueryVariables>) {
        return Apollo.useQuery<MedicMainStatsQuery, MedicMainStatsQueryVariables>(MedicMainStatsDocument, baseOptions);
      }
export function useMedicMainStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicMainStatsQuery, MedicMainStatsQueryVariables>) {
          return Apollo.useLazyQuery<MedicMainStatsQuery, MedicMainStatsQueryVariables>(MedicMainStatsDocument, baseOptions);
        }
export type MedicMainStatsQueryHookResult = ReturnType<typeof useMedicMainStatsQuery>;
export type MedicMainStatsLazyQueryHookResult = ReturnType<typeof useMedicMainStatsLazyQuery>;
export type MedicMainStatsQueryResult = Apollo.QueryResult<MedicMainStatsQuery, MedicMainStatsQueryVariables>;
export const MedicamenteDocument = gql`
    query medicamente {
  medicamente {
    id
    name
  }
}
    `;
export type MedicamenteComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MedicamenteQuery, MedicamenteQueryVariables>, 'query'>;

    export const MedicamenteComponent = (props: MedicamenteComponentProps) => (
      <ApolloReactComponents.Query<MedicamenteQuery, MedicamenteQueryVariables> query={MedicamenteDocument} {...props} />
    );
    

/**
 * __useMedicamenteQuery__
 *
 * To run a query within a React component, call `useMedicamenteQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicamenteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicamenteQuery({
 *   variables: {
 *   },
 * });
 */
export function useMedicamenteQuery(baseOptions?: Apollo.QueryHookOptions<MedicamenteQuery, MedicamenteQueryVariables>) {
        return Apollo.useQuery<MedicamenteQuery, MedicamenteQueryVariables>(MedicamenteDocument, baseOptions);
      }
export function useMedicamenteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicamenteQuery, MedicamenteQueryVariables>) {
          return Apollo.useLazyQuery<MedicamenteQuery, MedicamenteQueryVariables>(MedicamenteDocument, baseOptions);
        }
export type MedicamenteQueryHookResult = ReturnType<typeof useMedicamenteQuery>;
export type MedicamenteLazyQueryHookResult = ReturnType<typeof useMedicamenteLazyQuery>;
export type MedicamenteQueryResult = Apollo.QueryResult<MedicamenteQuery, MedicamenteQueryVariables>;
export const MedicsDocument = gql`
    query medics {
  medics {
    id
    name
    email
    avatarUrl
    specialties {
      id
      denumire
    }
  }
}
    `;
export type MedicsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MedicsQuery, MedicsQueryVariables>, 'query'>;

    export const MedicsComponent = (props: MedicsComponentProps) => (
      <ApolloReactComponents.Query<MedicsQuery, MedicsQueryVariables> query={MedicsDocument} {...props} />
    );
    

/**
 * __useMedicsQuery__
 *
 * To run a query within a React component, call `useMedicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMedicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMedicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMedicsQuery(baseOptions?: Apollo.QueryHookOptions<MedicsQuery, MedicsQueryVariables>) {
        return Apollo.useQuery<MedicsQuery, MedicsQueryVariables>(MedicsDocument, baseOptions);
      }
export function useMedicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MedicsQuery, MedicsQueryVariables>) {
          return Apollo.useLazyQuery<MedicsQuery, MedicsQueryVariables>(MedicsDocument, baseOptions);
        }
export type MedicsQueryHookResult = ReturnType<typeof useMedicsQuery>;
export type MedicsLazyQueryHookResult = ReturnType<typeof useMedicsLazyQuery>;
export type MedicsQueryResult = Apollo.QueryResult<MedicsQuery, MedicsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $firstName: String!, $lastName: String!, $password: String!, $specialties: [Int!]!) {
  register(
    data: {email: $email, firstName: $firstName, lastName: $lastName, password: $password, specialties: $specialties}
  ) {
    accessToken
    user {
      id
      name
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    

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
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      specialties: // value for 'specialties'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SpecialtiesDocument = gql`
    query specialties {
  specialties {
    id
    denumire
  }
}
    `;
export type SpecialtiesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SpecialtiesQuery, SpecialtiesQueryVariables>, 'query'>;

    export const SpecialtiesComponent = (props: SpecialtiesComponentProps) => (
      <ApolloReactComponents.Query<SpecialtiesQuery, SpecialtiesQueryVariables> query={SpecialtiesDocument} {...props} />
    );
    

/**
 * __useSpecialtiesQuery__
 *
 * To run a query within a React component, call `useSpecialtiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialtiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialtiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSpecialtiesQuery(baseOptions?: Apollo.QueryHookOptions<SpecialtiesQuery, SpecialtiesQueryVariables>) {
        return Apollo.useQuery<SpecialtiesQuery, SpecialtiesQueryVariables>(SpecialtiesDocument, baseOptions);
      }
export function useSpecialtiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpecialtiesQuery, SpecialtiesQueryVariables>) {
          return Apollo.useLazyQuery<SpecialtiesQuery, SpecialtiesQueryVariables>(SpecialtiesDocument, baseOptions);
        }
export type SpecialtiesQueryHookResult = ReturnType<typeof useSpecialtiesQuery>;
export type SpecialtiesLazyQueryHookResult = ReturnType<typeof useSpecialtiesLazyQuery>;
export type SpecialtiesQueryResult = Apollo.QueryResult<SpecialtiesQuery, SpecialtiesQueryVariables>;
export const GetSymptomsDocument = gql`
    query getSymptoms {
  symptoms {
    id
    name
    diagnostice {
      id
      name
    }
  }
}
    `;
export type GetSymptomsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetSymptomsQuery, GetSymptomsQueryVariables>, 'query'>;

    export const GetSymptomsComponent = (props: GetSymptomsComponentProps) => (
      <ApolloReactComponents.Query<GetSymptomsQuery, GetSymptomsQueryVariables> query={GetSymptomsDocument} {...props} />
    );
    

/**
 * __useGetSymptomsQuery__
 *
 * To run a query within a React component, call `useGetSymptomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSymptomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSymptomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSymptomsQuery(baseOptions?: Apollo.QueryHookOptions<GetSymptomsQuery, GetSymptomsQueryVariables>) {
        return Apollo.useQuery<GetSymptomsQuery, GetSymptomsQueryVariables>(GetSymptomsDocument, baseOptions);
      }
export function useGetSymptomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSymptomsQuery, GetSymptomsQueryVariables>) {
          return Apollo.useLazyQuery<GetSymptomsQuery, GetSymptomsQueryVariables>(GetSymptomsDocument, baseOptions);
        }
export type GetSymptomsQueryHookResult = ReturnType<typeof useGetSymptomsQuery>;
export type GetSymptomsLazyQueryHookResult = ReturnType<typeof useGetSymptomsLazyQuery>;
export type GetSymptomsQueryResult = Apollo.QueryResult<GetSymptomsQuery, GetSymptomsQueryVariables>;