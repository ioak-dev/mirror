import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSET } from '../../Types/schema';
import OakViewer from '../../../oakui/OakViewer';
import OakHeading from '../../../oakui/OakHeading';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';

interface Props {
  location: any;
  search: string;
}
const queryString = require('query-string');

const AssetCreateSuccess = (props: Props) => {
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: {
      assetId: queryString.parse(props.location.search).id,
    },
  });

  return (
    <OakPage>
      <OakSection>
        <div className="view-asset-item">
          <OakHeading title="Asset details" />
          {!loading && !error && (
            <>
              <div className="typography-5 align-horizontal">
                Asset Id:
                <OakViewer>{data.asset.assetId}</OakViewer>
              </div>

              <div className="typography-5 align-horizontal">
                Asset Name:
                <OakViewer>{data.asset.name}</OakViewer>
              </div>

              <div className="typography-5 ">
                Asset Description:
                <OakViewer>{data.asset.description}</OakViewer>
              </div>
              <div className="typography-5 align-horizontal">
                JWT Password:
                <OakViewer>{data.asset.jwtPassword}</OakViewer>
              </div>
            </>
          )}
        </div>
      </OakSection>
    </OakPage>
  );
};

export default AssetCreateSuccess;
