import React, { useEffect, useState } from 'react';
import './style.scss';
import { newId } from '../../../../events/MessageService';
import OakForm from '../../../../oakui/wc/OakForm';
import OakInput from '../../../../oakui/wc/OakInput';

interface Props {
  handleSubmit: any;
}

const SearchSection = (props: Props) => {
  const formId = newId();
  const [searchText, setSearchText] = useState('');

  const handleChange = (detail: any) => {
    setSearchText(detail.value);
  };

  const handleSubmit = () => {
    props.handleSubmit(searchText);
  };

  return (
    <div className="search-section">
      <OakForm handleSubmit={handleSubmit} formGroupName={formId}>
        <OakInput
          shape="sharp"
          formGroupName={formId}
          value={searchText}
          name="searchText"
          handleInput={handleChange}
          placeholder="Search"
        />
      </OakForm>
    </div>
  );
};

export default SearchSection;
