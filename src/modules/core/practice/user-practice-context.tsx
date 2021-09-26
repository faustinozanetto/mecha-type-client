import React from 'react';
import { PracticeConfig } from './practice-config-manager';

/**
 * The UserPracticeContext contains all PracticeConfig properties
 *
 * XXX "Partial" copies all properties from PracticeConfig and make them all optional
 *
 */
export type UserPracticeContext = Partial<PracticeConfig>;

/**
 * Initial context, used by default until the Context Provider is initialised.
 *
 * @default Empty object, to allow for destructuring even when the context hasn't been initialised (on the server)
 */
const initialContext = {};

/**
 * Uses native React Context API, meant to be used from hooks only, not by functional components
 *
 * @example Usage
 *  import userPracticeContext from '@modules/core/typing-game/user-practice-context';
 *  const { userPracticeConfig }: UserPracticeContext = React.useContext(userPracticeContext);
 *
 */
export const userPracticeContext = React.createContext<UserPracticeContext>(initialContext);

export default userPracticeContext;
