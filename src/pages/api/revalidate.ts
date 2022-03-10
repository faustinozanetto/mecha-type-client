import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }
  const presetID = req.query.preset as string;
  try {
    const path = `/practice`;
    console.log(path);
    await res.unstable_revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
