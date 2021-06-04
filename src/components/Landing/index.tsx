import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { RichTextEditor } from 'elements';

import './style.scss';
import { GET_ASSET } from '../Types/schema';
import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import SpotlightSection from './SpotlightSection';
import FeatureSection from './FeatureSection';

interface Props {
  match: any;
  history: any;
  asset: string;
  cookies: any;
}

const Landing = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: {
      assetId: props.asset,
    },
  });

  return (
    <>
      <HeroSection
        asset={data?.asset}
        cookies={props.cookies}
        history={props.history}
      />
      {data?.asset && (
        <div className="landing">
          {data.asset.section.map((section: any) => (
            <div key={section.id}>
              {section.type === 'SPOTLIGHT' && (
                <SpotlightSection
                  assetId={data.asset.assetId}
                  cookies={props.cookies}
                  history={props.history}
                  section={section}
                />
              )}
              {section.type === 'CATEGORY' && (
                <CategorySection
                  assetId={data.asset.assetId}
                  cookies={props.cookies}
                  history={props.history}
                  section={section}
                />
              )}
              {section.type === 'FEATURE' && (
                <FeatureSection
                  assetId={data.asset.assetId}
                  cookies={props.cookies}
                  history={props.history}
                  section={section}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Landing;
