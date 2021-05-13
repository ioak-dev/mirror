import React, { useEffect, useState } from 'react';

import MakeNavBarTransparentCommand from '../../../events/MakeNavBarTransparentCommand';
import HideNavBarCommand from '../../../events/HideNavBarCommand';
import FullImageContentCentered from './FullImageContentCentered';

interface Props {
  history: any;
  asset: any;
  cookies: any;
}

const HeroSection = (props: Props) => {
  useEffect(() => {
    return () => {
      HideNavBarCommand.next(false);
      MakeNavBarTransparentCommand.next(false);
    };
  }, []);

  return (
    <>
      {props.asset?.hero && (
        <FullImageContentCentered
          section={props.asset.hero}
          assetId={props.asset.assetId}
          cookies={props.cookies}
          history={props.history}
        />
      )}
    </>
  );
};

export default HeroSection;
