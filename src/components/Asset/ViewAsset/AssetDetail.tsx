import React from 'react';
import './AssetDetail.scss';
import OakInput from '../../../oakui/wc/OakInput';

interface Props {
  assetData: any;
  handleChange: any;
}

const AssetDetail = (props: Props) => {
  const handleChange = (detail: any) => {
    const _assetData = { ...props.assetData, [detail.name]: detail.value };
    props.handleChange(_assetData);
  };
  return (
    <div className="asset-detail">
      <OakInput
        label="Name"
        value={props.assetData.name}
        name="name"
        shape="sharp"
        handleChange={handleChange}
        gutterBottom
      />
      <OakInput
        label="featuredTitle"
        value={props.assetData.featuredTitle}
        name="featuredTitle"
        shape="sharp"
        handleChange={handleChange}
        gutterBottom
      />
      <OakInput
        label="featuredSubtitle"
        value={props.assetData.featuredSubtitle}
        name="featuredSubtitle"
        shape="sharp"
        type="textarea"
        handleChange={handleChange}
        gutterBottom
      />
    </div>
  );
};

export default AssetDetail;
