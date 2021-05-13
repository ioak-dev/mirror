import React, { useEffect, useRef, useState } from 'react';
import OakEditorBlock from './OakEditorBlock';
import './style.scss';
import { newId } from '../../events/MessageService';

interface Props {
  value: any[];
  reset?: any;
  handleChange: any;
  setBlockType: any;
}

const OakBlock = (props: Props) => {
  const [data, _setData] = useState<any>();
  const [groupId, setGroupId] = useState<any>(newId());

  const dataRef = useRef(data);
  const setData = (val: any) => {
    dataRef.current = val;
    _setData(val);
  };

  useEffect(() => {
    if (props.value) {
      setData(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.value) {
      setData(props.value);
    }
  }, []);

  return (
    <div className="oak-block">
      {dataRef?.current && (
        <OakEditorBlock
          groupId={groupId}
          block={dataRef?.current}
          handleChange={props.handleChange}
          setBlockType={props.setBlockType}
          reset={props.reset}
        />
      )}
    </div>
  );
};

export default OakBlock;
