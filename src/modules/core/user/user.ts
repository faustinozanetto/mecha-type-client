import {
  AuthProvider,
  FilteredUserFragment,
  UserFilterBy,
  UserFollowerFragment,
  UserFragment,
} from 'generated/graphql';
import { roundTo2 } from '../math/math';

export type UserParsedStats = {
  averageWPM: number;
  averageCPM: number;
  averageAccuracy: number;
  testsCompleted: number;
  keystrokes: number;
};

/**
 * Parses the User Data from the Test Preset History array
 * into a object containing the organized data.
 * @param user User Fragment to retrieve data from.
 * @returns the parsed stats into a object.
 */
export const generateParsedStats = (user: UserFragment): UserParsedStats => {
  let parsedStats: UserParsedStats = {
    averageWPM: 0,
    averageCPM: 0,
    averageAccuracy: 0,
    testsCompleted: 0,
    keystrokes: 0,
  };
  if (user && user.testPresetHistory && user.testPresetHistory.length > 0) {
    const entries = user.testPresetHistory.length;
    for (let i = 0; i < entries; i++) {
      const entry = user.testPresetHistory[i];
      if (entry) {
        parsedStats.averageWPM += entry.wpm;
        parsedStats.averageCPM += entry.cpm;
        parsedStats.averageAccuracy += entry.accuracy;
        parsedStats.testsCompleted++;
        parsedStats.keystrokes += entry.keystrokes;
      }
    }
    // Dividing by amount of entries to get average.
    parsedStats.averageWPM /= entries;
    parsedStats.averageCPM /= entries;
    parsedStats.averageAccuracy /= entries;

    // Round stats to use only 2 decimal places.
    parsedStats.averageWPM = roundTo2(parsedStats.averageWPM);
    parsedStats.averageCPM = roundTo2(parsedStats.averageCPM);
    parsedStats.averageAccuracy = roundTo2(parsedStats.averageAccuracy);
  }
  return parsedStats;
};

// /**
//  *
//  * @param user the user to retrieve data from
//  * @returns the average wpm of the user
//  */
// export const calculateAverageWPM = (user: Pick<UserFragment, 'wordsPerMinute'> | UserFragment): number => {
//   const wordsPerMinute = user.wordsPerMinute;
//   if (wordsPerMinute && wordsPerMinute.length > 0) {
//     const sum = wordsPerMinute.reduce((tot, arr) => {
//       return tot + arr.amount;
//     }, 0);
//     return Number.parseFloat((sum / wordsPerMinute.length).toFixed(2));
//   }
//   return 0;
// };

// /**
//  *
//  * @param user the user to retrieve data from
//  * @returns the average cpm of the user
//  */
// export const calculateAverageCPM = (user: Pick<UserFragment, 'charsPerMinute'> | UserFragment): number => {
//   const charsPerMinute = user.charsPerMinute;
//   if (charsPerMinute && charsPerMinute.length > 0) {
//     const sum = charsPerMinute.reduce((tot, arr) => {
//       return tot + arr.amount;
//     }, 0);
//     return Number.parseFloat((sum / charsPerMinute.length).toFixed(2));
//   }
//   return 0;
// };

// /**
//  *
//  * @param user the user to retrieve data from
//  * @returns the average accuracy.
//  */
// export const calculateAverageAccuracy = (user: Pick<UserFragment, 'accuracy'> | UserFragment): number => {
//   const typingAccuracy = user.accuracy;
//   if (typingAccuracy && typingAccuracy.length > 0) {
//     const sum = typingAccuracy.reduce((tot, arr) => {
//       return tot + arr.amount;
//     }, 0);
//     return Number.parseFloat((sum / typingAccuracy.length).toFixed(2));
//   }
//   return 0;
// };

/**
 *
 * @param user the user to retrieve data from
 * @returns the average accuracy.
 */
export const calculateAverage = (data: number[]): number => {
  if (data && data.length > 0) {
    const sum = data.reduce((tot, arr) => {
      return tot + arr;
    }, 0);
    return Number.parseFloat((sum / data.length).toFixed(2));
  }
  return 0;
};

/**
 *
 * @param rawUsers raw users as an array of Filtered Users
 * @param filterBy type of stat to filter the users by.
 * @returns the filtered array of users.
 */
export const generateMappedFilteredUsers = (
  rawUsers: FilteredUserFragment[],
  filterBy: UserFilterBy
): FilteredUserFragment[] => {
  const filteredUsers: FilteredUserFragment[] = [];
  switch (filterBy) {
    case UserFilterBy.Accuracy: {
      // Mapping for each user
      rawUsers.map((user) => {
        // Calculate average accuracy for user.
        const averageField = calculateAverage(user.testPresetHistory.map((entry) => entry.accuracy));
        // Create entry with name and average.
        filteredUsers.push({
          ...user,
          value: averageField,
        });
      });
      // Sorting
      filteredUsers.sort((a, b) => b.value - a.value);
      break;
    }
    case UserFilterBy.Wpm: {
      // Mapping for each user
      rawUsers.map((user) => {
        // Calculate average accuracy for user.
        const averageField = calculateAverage(user.testPresetHistory.map((entry) => entry.wpm));
        // Create entry with name and average.
        filteredUsers.push({
          ...user,
          value: averageField,
        });
      });
      // Sorting
      filteredUsers.sort((a, b) => b.value - a.value);
      break;
    }
    case UserFilterBy.Cpm: {
      // Mapping for each user
      rawUsers.map((user) => {
        // Calculate average accuracy for user.
        const averageField = calculateAverage(user.testPresetHistory.map((entry) => entry.cpm));
        // Create entry with name and average.
        filteredUsers.push({
          ...user,
          value: averageField,
        });
      });
      // Sorting
      filteredUsers.sort((a, b) => b.value - a.value);
      break;
    }
    case UserFilterBy.Keystrokes: {
      // Mapping for each user
      rawUsers.map((user) => {
        // Calculate average accuracy for user.
        const averageField = calculateAverage(user.testPresetHistory.map((entry) => entry.keystrokes));
        // Create entry with name and average.
        filteredUsers.push({
          ...user,
          value: averageField,
        });
      });
      // Sorting
      filteredUsers.sort((a, b) => b.value - a.value);
      break;
    }
    case UserFilterBy.Testscompleted: {
      // Mapping for each user
      rawUsers.map((user) => {
        // Calculate average accuracy for user.
        const averageField = user.testPresetHistory.length;
        // Create entry with name and average.
        filteredUsers.push({
          ...user,
          value: averageField,
        });
      });
      // Sorting
      filteredUsers.sort((a, b) => b.value - a.value);
      break;
    }
  }
  return filteredUsers;
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
        avatarURL = 'https://via.placeholder.com/150';
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
