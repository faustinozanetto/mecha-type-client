import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';
import { TestPresetAllQuery, TestPresetAllQueryVariables, TestPresetAllDocument } from '@generated/graphql';
import { __URI__ } from '@utils/constants';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo();
  // TODO: Make take amount not required.
  const { data: presetsData } = await client.query<TestPresetAllQuery, TestPresetAllQueryVariables>({
    query: TestPresetAllDocument,
  });

  const fields: ISitemapField[] = presetsData.testPresetAll.map((preset) => ({
    loc: `${__URI__}/practice/play/${preset?.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
