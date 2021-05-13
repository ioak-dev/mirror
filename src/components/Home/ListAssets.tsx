import React from 'react';
import { useQuery } from '@apollo/client';
import './style.scss';
import { LIST_ASSETS } from '../Types/schema';
import AssetItem from './AssetItem';

interface Props {
  history: any;
}

const ListAssets = (props: Props) => {
  const { loading, error, data } = useQuery(LIST_ASSETS);
  return (
    <div className="list-assets">
      Choose an asset to proceed
      {/* {loading && <OakSpinner />} */}
      {!loading && !error && (
        <div className="list-assets--content">
          {data?.assets?.map((asset: any) => (
            <AssetItem asset={asset} history={props.history} key={asset.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListAssets;
