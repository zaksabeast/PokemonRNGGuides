import React from 'react';
import { graphql } from 'gatsby';
import { MainLayout } from '../layouts/main';
import { GuideList } from '../components/guide-list';

const CategoryTemplate = ({ data, pageContext }) => {
  const guides = data.allMdx.nodes;
  const { category } = pageContext;

  const organizedGuides = guides.reduce((result, guide) => {
    const subCategory = guide.frontmatter.subCategory || 'General';
    const subCategoryGuides = result[subCategory] || [];

    subCategoryGuides.push(guide);

    result[subCategory] = subCategoryGuides;

    return result;
  }, {});

  const content = Object.keys(organizedGuides)
    .sort()
    .map(subCategory => (
      <GuideList
        key={subCategory}
        subCategoryTitle={subCategory}
        guides={organizedGuides[subCategory]}
      />
    ));

  return <MainLayout title={category}>{content}</MainLayout>;
};

export default CategoryTemplate;

export const query = graphql`
  query ($categoryRegex: String!) {
    allMdx(filter: { fields: { pagePath: { regex: $categoryRegex } } }) {
      nodes {
        frontmatter {
          title
          description
          slug
          subCategory
        }
      }
    }
  }
`;
