import { Response } from 'express';

const fetchUserDetails = async (
  options: { username: string; limit: number },
  res: Response,
  formatData: (data: any) => {},
  query: string
) => {
  try {
    console.log(options);
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: query,
        variables: {
          username: options.username, //username required
          limit: options.limit, //only for submission
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      return res.send(result);
    }

    console.log('HERE');
    console.log(result.data.matchedUser);
    return res.json(formatData(result.data));
  } catch (err) {
    console.error('Error: ', err);
    return res.send(err);
  }
};

export default fetchUserDetails;
