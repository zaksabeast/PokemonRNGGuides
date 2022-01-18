import React from 'react';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../layouts/main';
import { GuideList } from '../components/guide-list';
import { RoughDraftAlert } from '../components/rough-draft-alert';
import { sortCategories } from '../utils/sort-categories';

const useStyles = makeStyles(theme => ({
  roughDraftAlert: {
    marginTop: theme.spacing(6),
  },
}));

const RoughDraftsPage = ({ data }) => {
  const classes = useStyles();
  const guides = data.allMdx.nodes;

  const organizedGuides = guides.reduce((result, guide) => {
    console.log('guide', guide);
    const subCategory =
      guide.fields.pagePath.split('/')[1] || 'Work in Progress';
    const subCategoryGuides = result[subCategory] || [];

    subCategoryGuides.push(guide);
    result[subCategory] = subCategoryGuides;

    return result;
  }, {});

  const content = Object.keys(organizedGuides)
    .sort(sortCategories)
    .map(subCategory => (
      <GuideList
        key={subCategory}
        subCategoryTitle={subCategory}
        guides={organizedGuides[subCategory]}
      />
    ));

  return (
    <MainLayout title="Rough Drafts">
      <div className={classes.roughDraftAlert}>
        <RoughDraftAlert />
      </div>
      {content}
    </MainLayout>
  );
};

export default RoughDraftsPage;

export const query = graphql`
  query {
    allMdx(filter: { frontmatter: { isRoughDraft: { eq: true } } }) {
      nodes {
        frontmatter {
          title
          description
          slug
          subCategory
        }
        fields {
          pagePath
        }
      }
    }
  }
`;
