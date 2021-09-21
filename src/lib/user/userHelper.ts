import { AuthProvider, FilteredUserFragment, UserFollowerFragment, UserFragment } from 'generated/graphql';

/**
 *
 * @param user the user to retrieve data from
 * @returns the average wpm of the user
 */
export const calculateAverageWPM = (user: Pick<UserFragment, 'wordsPerMinute'> | UserFragment): number => {
  const wordsPerMinute = user.wordsPerMinute;
  if (wordsPerMinute && wordsPerMinute.length > 0) {
    const sum = wordsPerMinute.reduce((tot, arr) => {
      return tot + arr.amount;
    }, 0);
    return Number.parseFloat((sum / wordsPerMinute.length).toFixed(2));
  }
  return 0;
};

/**
 *
 * @param user the user to retrieve data from
 * @returns the average cpm of the user
 */
export const calculateAverageCPM = (user: Pick<UserFragment, 'charsPerMinute'> | UserFragment): number => {
  const charsPerMinute = user.charsPerMinute;
  if (charsPerMinute && charsPerMinute.length > 0) {
    const sum = charsPerMinute.reduce((tot, arr) => {
      return tot + arr.amount;
    }, 0);
    return Number.parseFloat((sum / charsPerMinute.length).toFixed(2));
  }
  return 0;
};

/**
 *
 * @param user the user to retrieve data from
 * @returns the average accuracy.
 */
export const calculateAverageAccuracy = (user: Pick<UserFragment, 'accuracy'> | UserFragment): number => {
  const typingAccuracy = user.accuracy;
  if (typingAccuracy && typingAccuracy.length > 0) {
    const sum = typingAccuracy.reduce((tot, arr) => {
      return tot + arr.amount;
    }, 0);
    return Number.parseFloat((sum / typingAccuracy.length).toFixed(2));
  }
  return 0;
};

/**
 *
 * @param user the user to retrieve data from
 * @returns the generated avatar url based off the auth
 * provider.
 */
export const generateAvatarURl = (user: UserFragment | FilteredUserFragment | UserFollowerFragment): string => {
  let avatarURL = '';
  if (user?.id) {
    switch (user.authProvider) {
      case AuthProvider.Default: {
        avatarURL = '';
        break;
      }
      case AuthProvider.Discord: {
        avatarURL = `https://cdn.discordapp.com/avatars/${user.oauthId}/${user.avatar}.png`;
        break;
      }
      case AuthProvider.Github: {
        avatarURL = user.avatar ?? '';
        break;
      }
      case AuthProvider.Google: {
        avatarURL = user.avatar ?? '';
        break;
      }
    }
  }
 
  return avatarURL;
};
