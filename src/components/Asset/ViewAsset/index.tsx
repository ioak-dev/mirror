import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BlockType } from 'elements';

import './style.scss';
import { GET_ASSET, UPDATE_ASSET } from '../../Types/schema';
import ViewItem from './ViewItem';
import AssetDetail from './AssetDetail';
import OakButton from '../../../oakui/wc/OakButton';
import { AssetPayload } from '../../../types/graphql';
import SiteBuilder from './SiteBuilder';
import { newId } from '../../../events/MessageService';

interface Props {
  location: any;
  history: any;
  asset: string;
  match: any;
  cookies: any;
}

const ViewAsset = (props: Props) => {
  const [updateAsset] = useMutation(UPDATE_ASSET);
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: {
      assetId: props.asset,
    },
  });

  const [state, setState] = useState<any>({
    name: '',
    section: [],
    hero: {
      title: '',
      subtitle: '',
      parallax: false,
      textAlign: 'center',
      fontSize: 'regular',
      overlay: 'Low',
      block: {
        id: newId(),
        type: null,
        supportedTypes: [BlockType.IMAGE, BlockType.UNSPLASH],
        label: 'BANNER',
        data: {
          position: 'center',
          raw: null,
        },
      },
      action: [],
    },
  });

  useEffect(() => {
    if (data?.asset) {
      setState({
        ...state,
        id: data.asset.id,
        name: data.asset.name,
        section: data.asset.section || [],
        featuredTitle: data.asset.featuredTitle,
        featuredSubtitle: data.asset.featuredSubtitle,
        hero: data.asset.hero || state.hero,
      });
    }
  }, [data]);

  const handleChange = (_assetData: any) => {
    console.log('index', _assetData);
    setState(_assetData);
  };

  const goBack = () => {
    if (props.history.length > 2) props.history.goBack();
  };

  const submit = async () => {
    const payload: AssetPayload = {
      id: state.id,
      name: state.name,
      section: state.section,
      featuredTitle: state.featuredTitle,
      featuredSubtitle: state.featuredSubtitle,
      hero: state.hero,
    };
    updateAsset({
      variables: {
        payload,
      },
    }).then((response) => {
      if (props.history.length > 2) props.history.goBack();
    });
  };

  return (
    <>
      {!loading && !error && (
        <div className="one-sided-page">
          <div>
            <AssetDetail assetData={state} handleChange={handleChange} />
            <SiteBuilder assetData={state} handleChange={handleChange} />
          </div>
        </div>
      )}
      <div className="view-article__footer oak-bg-global">
        <div className="view-article__footer__left">Asset detail</div>
        <div className="view-article__footer__right">
          <OakButton
            shape="sharp"
            theme="default"
            variant="outline"
            handleClick={goBack}
          >
            Cancel
          </OakButton>
          <OakButton shape="sharp" theme="default" handleClick={submit}>
            Save
          </OakButton>
        </div>
      </div>
    </>
  );
};

export default ViewAsset;
