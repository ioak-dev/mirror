import React from 'react';
import { Asset } from '../../../types/graphql';
import OakViewer from '../../../oakui/OakViewer';

interface Props {
  history: any;
  asset: Asset;
}

const ViewItem = (props: Props) => {
  const editAsset = () => {
    props.history.push(`/${props.asset.assetId}/asset/edit`);
  };

  const deleteAssetPrompt = () => {
    console.log('To Be implemented');
  };
  const getHeadingLinks = () => {
    return [
      {
        label: 'Edit',
        icon: 'edit',
        action: () => editAsset(),
      },
      {
        label: 'Delete',
        icon: 'delete_outline',
        action: () => deleteAssetPrompt(),
      },
    ];
  };
  return (
    <>
      {props.asset && (
        <div className="view-asset-item">
          <div className="typography-8">{props.asset.name}</div>
        </div>
      )}
      {!props.asset && <div className="typography-6">Asset does not exist</div>}
    </>
  );
};

export default ViewItem;
