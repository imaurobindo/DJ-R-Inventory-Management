import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-solid-svg-icons';

function CategoryExpandButton({ category, setSelectedCategoryId }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setSelectedCategoryId(category.id);
    setIsExpanded(!isExpanded);
  };

  return (
    <button className="add-btn" onClick={handleClick}>
      <FontAwesomeIcon icon={isExpanded ? faSquareCaretUp : faSquareCaretDown} />
    </button>
  );
}

export default CategoryExpandButton;