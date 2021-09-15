import { calculateAverageAccuracy, calculateAverageCPM, calculateAverageWPM } from '../userHelper';
import { User } from '@generated/graphql';

test('It should return the average WPM of a given User', () => {
  const user: Pick<User, 'wordsPerMinute'> = {
    wordsPerMinute: [
      {
        id: '1',
        userId: '54',
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: '54',
        amount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        userId: '54',
        amount: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const averageWPM = calculateAverageWPM(user);
  expect(averageWPM).toBe(30);
});

test('It should return the average CPM of a given User', () => {
  const user: Pick<User, 'charsPerMinute'> = {
    charsPerMinute: [
      {
        id: '1',
        userId: '54',
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: '54',
        amount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        userId: '54',
        amount: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const averageCPM = calculateAverageCPM(user);
  expect(averageCPM).toBe(30);
});

test('It should return the average Accuracy of a given User', () => {
  const user: Pick<User, 'accuracy'> = {
    accuracy: [
      {
        id: '1',
        userId: '54',
        amount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: '54',
        amount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        userId: '54',
        amount: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  const averageAccuracy = calculateAverageAccuracy(user);
  expect(averageAccuracy).toBe(30);
});
